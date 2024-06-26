// import { uploadFileApi } from '@/app/api/fetch'
import { ImageUploader } from 'antd-mobile'
import { useState } from 'react'

import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { uploadFile } from '@/app/api/fetch'

import '@/app/api/fetch'
import { compressImage } from '@/utils/imageCompressor'
const imgPath = process.env.NEXT_PUBLIC_QINIU_IMGPATH as string

interface UploadImgsProps {
  path?: string
  count?: number
  // 默认元素
  defaultChildren?: JSX.Element
  // 上传成功后的回调函数
  onUploadSuccess?: (url: string) => void
}

const UploadImgs = ({
  path,
  count,
  defaultChildren,
  onUploadSuccess,
}: UploadImgsProps) => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const handleUpload = async (file: File) => {
    const file2 = await compressImage(file, 1000000)
    console.log('file2',file2)
    const response = await uploadFile(file2, path)
    const url = `${response.data.url}`
    onUploadSuccess?.(url)
    return { url }
  }

  return (
    <ImageUploader
      multiple={count !== undefined && count > 1}
      maxCount={count}
      value={fileList}
      onChange={setFileList}
      upload={handleUpload}
    >
      {defaultChildren}
    </ImageUploader>
  )
}

export default UploadImgs
