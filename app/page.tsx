'use client'
import { Button, Input, Form, Toast, Modal, ImageUploader } from 'antd-mobile'
import Image from 'next/image'
import './page.scss'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import UploadImgs from '@/components/uploadImgs'
export default function Home() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const logout = () => {
    localStorage.removeItem('nickname')
    localStorage.removeItem('userId')
    setNickname('')
    Toast.show({
      content: '退出成功',
    })
  }
  const logoutOpen = () => {
    Modal.confirm({
      content: '确定退出吗',
      onConfirm: logout,
    })
  }

  useEffect(() => {
    const nickname = localStorage.getItem('nickname')
    if (nickname) {
      setNickname(nickname)
    }
  }, [])

  return (
    <div className="app_container">
      <div className="app_row p-[20px]">
        {nickname && (
          <div className="h-[30px] text-[#000] text-[18px] mb-[20px]">
            欢迎你:{' '}
            <span
              onClick={() => router.push('/me')}
              className="text-[#1677ff] underline cursor-pointer"
            >
              {nickname}
            </span>
          </div>
        )}

        {/* <Button
          block
          color="primary"
          size="large"
          onClick={() => router.push('/scoresRank')}
        >
          里程排行
        </Button> */}
        <div className="mt-[12px]">
          <Button
            block
            color="primary"
            size="large"
            onClick={() => router.push('/map')}
          >
            地图排行
          </Button>
        </div>
        <div className="mt-[12px]">
          <Button
            block
            color="primary"
            size="large"
            onClick={() => router.push('/users')}
          >
            滑手列表
          </Button>
        </div>
        {!nickname && (
          <>
            <div className="mt-[12px]">
              <Button
                block
                color="primary"
                size="large"
                onClick={() => router.push('/login')}
              >
                登录
              </Button>
            </div>
            <div className="mt-[12px]">
              <Button
                block
                color="primary"
                size="large"
                onClick={() => router.push('/register')}
              >
                注册
              </Button>
            </div>
          </>
        )}
        {nickname && (
          <div className="mt-[12px] text-center" onClick={logoutOpen}>
            退出账号
          </div>
        )}
      </div>
    </div>
  )
}
