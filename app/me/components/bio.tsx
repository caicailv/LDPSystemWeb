import React, { useEffect, useState } from 'react'
import { closeLoading, openLoading, queryURLParams } from '@/utils'
import { Button, Input, Form, Toast, TextArea, Image } from 'antd-mobile'
import { Collapse, ImageViewer } from 'antd-mobile'
import axios from 'axios'
import service from '@/app/api/fetch'
import { addMapApi, findInfo, updateInfo } from '@/app/api/api'
import { useAsyncEffect } from 'ahooks'
import { SmileFill } from 'antd-mobile-icons'
import UploadImgs from '@/components/uploadImgs'
import '../page.scss'
interface Props {
  info: any
  isMe: boolean
  userId: string | number
  update: () => void
}

const Bio = ({ info, isMe, userId, update }: Props) => {
  const [bio, setBoi] = useState('')
  // const [gearSetupImg, setGearSetupImg] = useState('')
  // const [imgVisible, setImgVisible] = useState(false)
  const submitGearSetup = async () => {
    if (!bio) {
      Toast.show('请输入')
      return
    }
    openLoading()
    await updateInfo({ bio: bio, userId })
    closeLoading()
    setBoi('')
    update()
  }
  useEffect(() => {
    console.log('info.bio',info.bio)
    if (info.bio) {
      setBoi(info.bio)
    }
  }, [info])

  return (
    <>
      <div className="bio">
        <div className="title text-[20px] mt-[20px]">个人简介</div>
        <div
          className="  ml-[10px] content text-[16px] mt-[5px] mb-[5px] text-wrap"
          style={{ wordBreak: 'break-word', whiteSpace: `break-spaces` }}
        >
          {info.bio || '暂未添加简介'}
        </div>
        {/* {info.gear_setup_img && (
          <Image
            src={info.gear_setup_img}
            width={100}
            height={100}
            fit="scale-down"
            onClick={() => setImgVisible(true)}
            alt=""
            className="mb-[10px]"
          />
        )} */}
      </div>
      {/* <ImageViewer
        visible={imgVisible}
        image={info.gear_setup_img}
        onClose={() => setImgVisible(false)}
      /> */}

      {isMe && (
        <div className="border-[1px] border-solid border-gray-200 p-[10px]  ml-[10px]">
          <TextArea
            rows={4}
            placeholder="请输入个人简介"
            value={bio}
            onChange={(e) => setBoi(e)}
          />
          {/* <div className="mb-[10px]">
            <UploadImgs
              count={1}
              path="gearSetupImg"
              onUploadSuccess={(url) => {
                setGearSetupImg(url)
              }}
            />
          </div> */}
          <Button color="primary" onClick={submitGearSetup}>
            更新简介
          </Button>
        </div>
      )}
    </>
  )
}
export default Bio
