import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import dayjs from 'dayjs'
import upyun from 'upyun'
const serviceName = process.env.NEXT_PUBLIC_UPYUN_SERVICE_NAME as string
const operatorName = process.env.NEXT_PUBLIC_UPYUN_OPERATOR_NAME as string
const operatorPassword = process.env
  .NEXT_PUBLIC_UPYUN_OPERATOR_PASSWORD as string
const domainName = process.env.NEXT_PUBLIC_UPYUN_DOMAIN_NAME as string

const service = new upyun.Service(serviceName, operatorName, operatorPassword)
const client = new upyun.Client(service)

const generateSixDigitRandomNumber = () => {
  return Math.random().toString().substr(3, 6) + ''
}

// 生成唯一文件名
const generateUniqueFileName = (originalName: string) => {
  const timestamp = dayjs().format('YYYYMMDDHHmmss')
  const randomString = generateSixDigitRandomNumber()
  const extension = path.extname(originalName)
  return `ccl-${timestamp}-${randomString}${extension}`
}

// 上传图片到又拍云
const uploadImage = async (
  localFilePath: string,
  imgPath: string
): Promise<any> => {
  const key = imgPath
    ? `${imgPath}/${path.basename(localFilePath)}`
    : path.basename(localFilePath)
  try {
    const file = await fs.readFile(localFilePath)
    const result = await client.putFile(key, file)
    if (result) {
      return { key: `${domainName}/${key}` }
    } else {
      throw new Error('Upload to UPYUN failed')
    }
  } catch (error) {
    throw error
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File
  const imgPath = formData.get('path') as string
  const fileName = formData.get('name') as string
  if (!file) {
    return NextResponse.json({ status: 500, msg: 'No file uploaded' })
  }

  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'upload-'))
  const uniqueFileName = generateUniqueFileName(fileName)
  const tempFilePath = path.join(tempDir, uniqueFileName)
  const arrayBuffer = await file.arrayBuffer()
  await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer))

  try {
    const result = await uploadImage(tempFilePath, imgPath)
    return NextResponse.json({
      msg: 'ok',
      status: 200,
      data: { url: result.key },
    })
  } catch (error) {
    console.error('error', error)
    return NextResponse.json({ msg: 'error', status: 500, data: error })
  }
}
