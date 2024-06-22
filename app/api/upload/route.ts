import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import qiniu from 'qiniu'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import dayjs from 'dayjs'

const accessKey = process.env.NEXT_PUBLIC_QINIU_ACCESS_KEY as string
const secretKey = process.env.NEXT_PUBLIC_QINIU_SECRET_KEY as string
const bucket = process.env.NEXT_PUBLIC_QINIU_BUCKET as string
const imgPath = process.env.NEXT_PUBLIC_QINIU_IMGPATH as string
const generateSixDigitRandomNumber = () => {
  return Math.random().toString().substr(3, 6)+'';
}
// 生成唯一文件名
const generateUniqueFileName = (originalName: string) => {
  const timestamp = dayjs.unix(Date.now() / 1000).format('YYYYMMDDHHmmss');

  const randomString = generateSixDigitRandomNumber().toString();
  const extension = path.extname(originalName);
  return `ccl-${timestamp}-${randomString}${extension}`;
};
qiniu.conf.ACCESS_KEY = accessKey
qiniu.conf.SECRET_KEY = secretKey
// const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config()
const getUploadToken = () => {
  const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
  return putPolicy.uploadToken()
}

// 上传图片到七牛云
const uploadImage = (localFilePath: string,imgPath:string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadToken = getUploadToken()
    let key = path.basename(localFilePath)
    if(imgPath){
      key = imgPath + '/' + key
    }
    const putExtra = new qiniu.form_up.PutExtra()
    const formUploader = new qiniu.form_up.FormUploader(config)

    formUploader.putFile(
      uploadToken,
      key,
      localFilePath,
      putExtra,
      (err, body, info) => {
        if (err) {
          reject(err)
        } else {
          if (info.statusCode === 200) {
            resolve(body)
          } else {
            reject(info)
          }
        }
      }
    )
  })
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
  const uniqueFileName = generateUniqueFileName(fileName);
  const tempFilePath = path.join(tempDir, uniqueFileName);
  // const tempFilePath = path.join(tempDir, file.name)
  const arrayBuffer = await file.arrayBuffer()
  await fs.writeFile(tempFilePath, Buffer.from(arrayBuffer))

  try {
    const result = await uploadImage(tempFilePath,imgPath)
    // return NextResponse.json({ success: true, data: result });
    return NextResponse.json({
      msg: 'ok',
      status: 200,
      data: { url: result.key },
    })
  } catch (error) {
    console.log('error',error);
    // await fs.unlink(tempFilePath) // 删除临时文件
    return NextResponse.json({ msg: 'error', status: 500, data: error })
    // return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 加目录结构
