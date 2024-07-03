'use client'
import { Collapse, ImageViewer, Modal } from 'antd-mobile'

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
  const openImageViewer = (item: any) => {
    if (item.gear_setup_img) {
      setImgurl(item.gear_setup_img)
      setImgVisible(true)
      return
    }
    if (item.gear_setup) {
      Modal.show({
        title: '装备信息',
        content: <div>{item.gear_setup}</div>,
      })
    }

    return Toast.show('暂无装备信息')

    // gear_setup_img
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
              {item.gear_setup_img || item.gear_setup ? (
                <div onClick={() => openImageViewer(item)}>查看装备</div>
              ) : null}
            </div>
            <div className="region ml-[20px] w-[20%] text-center">
              {item.region}
            </div>
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
