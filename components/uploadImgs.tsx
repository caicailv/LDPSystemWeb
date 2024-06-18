// import { uploadFileApi } from '@/app/api/fetch'
import { ImageUploader } from 'antd-mobile'
import { useState } from 'react'

import { ImageUploadItem } from 'antd-mobile/es/components/image-uploader'
import { useAsyncEffect } from 'ahooks'
import { uploadFile } from '@/app/api/fetch'

import '@/app/api/fetch'
import { compressImage } from '@/utils/imageCompressor'
const imgPath = process.env.NEXT_PUBLIC_QINIU_IMGPATH as string

interface UploadImgsProps {
  path?: string
  count?: number
}

const UploadImgs = ({ path, count }: UploadImgsProps) => {
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  const handleUpload = async (file: File) => {
    const file2 = await compressImage(file, 1000000)
    const response = await uploadFile(file2, path)
    return {
      url: `${imgPath}/${response.data.url}`,
    }
  }

  return (
    <ImageUploader
      multiple={count !== undefined && count > 1}
      maxCount={count}
      value={fileList}
      onChange={setFileList}
      upload={handleUpload}
    />
  )
}

export default UploadImgs
