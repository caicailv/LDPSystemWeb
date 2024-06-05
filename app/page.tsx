'use client'
import { Button, Input, Form, Toast } from 'antd-mobile'
import Image from 'next/image'
import './page.scss'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  return (
    <div className="app_container">
      <div className="app_row p-[20px]">
        <Button block color="primary" size="large" onClick={() => router.push('/scoresRank')}>里程排行</Button>
        <div className='mt-[12px]'><Button block color="primary"  size="large"  onClick={() => router.push('/map')}>地图排行</Button></div>
      </div>
    </div>
  )
}
