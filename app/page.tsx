'use client'
import { Button, Input, Form, Toast } from 'antd-mobile'
import Image from 'next/image'
import './page.scss'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
export default function Home() {
  const router = useRouter()

  const [nickname, setNickname] = useState('')
  useEffect(() => {
    const nickname = localStorage.getItem('nickname')
    if (nickname) {
      setNickname(nickname)
    }
  }, [])
  return (
    <div className="app_container">
      <div className="app_row p-[20px]">
        <div className="h-[30px] text-[#000] text-[18px] mb-[20px]">
          欢迎你: {nickname}
        </div>
        <Button
          block
          color="primary"
          size="large"
          onClick={() => router.push('/scoresRank')}
        >
          里程排行
        </Button>
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
        {!nickname && (
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
        )}
      </div>
    </div>
  )
}
