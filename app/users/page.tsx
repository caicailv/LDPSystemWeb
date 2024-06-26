'use client'
import { Collapse, ImageViewer } from 'antd-mobile'

import { useRouter } from 'next/navigation'
import { Button, Input, Form, Toast } from 'antd-mobile'
import { use, useEffect, useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import service from '../api/fetch'
import './page.scss'
import { getUsers } from '../api/api'
import { closeLoading, isLogined, openLoading } from '@/utils'
const UsersPage = () => {
  const router = useRouter()
  const [imgVisible, setImgVisible] = useState(false)
  const [imgurl, setImgurl] = useState('')
  const [list, setList] = useState<any[]>([])
  const getData = async () => {
    openLoading()
    const res = await getUsers()
    console.log('res.data', res.data)
    setList(res.data)
    closeLoading()
  }
  useEffect(() => {
    getData()
  }, [])
  const openImageViewer = (url: string) => {
    setImgurl(url)
    setImgVisible(true)
  }
  return (
    <div>
      <div className="user_container">
        {list.map((item, index) => (
          <div className="user_item">
            <div
              className="text-[#1677ff] ellipsis w-[30%]  nickname"
              onClick={() => router.push(`/me?userId=${item.id}`)}
            >
              {item.nickname}
            </div>
            <div className="img text-[#1677ff] ellipsis text-center  w-[20%]">
              {item.gear_setup_img && (
                <div onClick={() => openImageViewer(item.gear_setup_img)}>
                  查看装备
                </div>
              )}
            </div>
            <div className="region ml-[20px] w-[20%] text-center">{item.region}</div>
          </div>
        ))}
      </div>
      <ImageViewer
        visible={imgVisible}
        image={imgurl}
        onClose={() => setImgVisible(false)}
      />
    </div>
  )
}

export default UsersPage
