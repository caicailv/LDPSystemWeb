'use client'
import React, { useEffect, useState } from 'react'
import {
  closeLoading,
  numberToTemp,
  openLoading,
  queryURLParams,
} from '@/utils'
import { Button, Input, Form, Toast, TextArea } from 'antd-mobile'
import axios from 'axios'
import service from '@/app/api/fetch'
import { addMapApi, findInfo, updateInfo } from '../api/api'
import { useAsyncEffect } from 'ahooks'
import { SmileFill } from 'antd-mobile-icons'
import UploadImgs from '@/components/uploadImgs'
import './page.scss'
import Record from './components/record'

const MePage = () => {
  // let { userId } = queryURLParams()
  const [userId, setUserId] = useState('')
  const [info, setInfo] = useState<any>({})
  const [bio, setBio] = useState('')
  const [gearSetup, setGearSetup] = useState('')

  const [isMe, setIsMe] = useState(false)
  const getInfo = async (userId: string) => {
    openLoading()
    const { data } = await findInfo({ userId })
    setInfo(data)
    closeLoading()
  }
  // useEffect(()=>{},)
  useAsyncEffect(async () => {
    let { userId } = queryURLParams()
    if (!userId) {
      setIsMe(true)
      userId = localStorage.getItem('userId')
    }
    setUserId(userId)
    getInfo(userId)
  }, [])
  const updateHeadPic = async (url: any) => {
    openLoading()

    const res = await updateInfo({ avatar_url: url, userId })
    console.log('res', res)
    closeLoading()
  }

  const submitBio = async () => {
    if (!bio) {
      Toast.show('请输入')
      return
    }
    openLoading()
    await updateInfo({ bio, userId })
    closeLoading()
    getInfo(userId)
    setBio('')
  }

  const submitGearSetup = async () => {
    if (!gearSetup) {
      Toast.show('请输入')
      return
    }
    openLoading()
    await updateInfo({ gear_setup: gearSetup, userId })
    closeLoading()
    getInfo(userId)
    setGearSetup('')
  }

  return (
    <div className="row p-[10px]">
      <div className="head flex  items-center">
        {isMe && (
          <div className="headpic">
            <UploadImgs
              count={1}
              path="avatar"
              onUploadSuccess={updateHeadPic}
              defaultChildren={
                info.avatar_url ? (
                  <img
                    className="w-[60px] h-[60px] overflow-hidden rounded-full"
                    src={info.avatar_url}
                    alt=""
                  />
                ) : (
                  <SmileFill className="w-[60px] h-[60px]  overflow-hidden rounded-full" />
                )
              }
            />
          </div>
        )}
        {!isMe && (
          <div>
            {info.avatar_url ? (
              <img
                className="w-[60px] h-[60px]  overflow-hidden rounded-full"
                src={info.avatar_url}
                alt=""
              />
            ) : (
              <SmileFill className="w-[60px] h-[60px]  overflow-hidden rounded-full" />
            )}
          </div>
        )}

        <div className="nickname ml-[20px] text-[20px]">{info.nickname}</div>
      </div>

      <div className="bio">
        <div className="title text-[20px] mt-[20px]">个人简介</div>
        <div
          className="content text-[16px] mt-[5px] mb-[5px] text-wrap"
          style={{ wordBreak: 'break-word' }}
        >
          {info.bio || '暂无简介'}
        </div>
      </div>

      {isMe && (
        <div className="border-[1px] border-solid border-gray-200 p-[10px]">
          <TextArea
            rows={4}
            placeholder="请输入个人简介"
            value={bio}
            onChange={(e) => setBio(e)}
          />
          <Button onClick={submitBio}>修改简介</Button>
        </div>
      )}

      <div className="bio">
        <div className="title text-[20px] mt-[20px]">个人装备</div>
        <div
          className="content text-[16px] mt-[5px] mb-[5px] text-wrap"
          style={{ wordBreak: 'break-word' }}
        >
          {info.gear_setup || '暂未添加装备'}
        </div>
      </div>

      {isMe && (
        <div className="border-[1px] border-solid border-gray-200 p-[10px]">
          <TextArea
            rows={4}
            placeholder="请输入个人板子配置"
            value={gearSetup}
            onChange={(e) => setGearSetup(e)}
          />
          <Button onClick={submitGearSetup}>修改简介</Button>
        </div>
      )}

      {info.mapScores && <div>
        <div className="title text-[20px] mt-[20px]">个人成绩</div>
        <Record recordList={info.mapScores} />

      </div>   }
    </div>
  )
}

export default MePage
