'use client'
import { queryURLParams } from '@/utils'
import { Button, Input, Form, Toast } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import './page.scss'
import AddRecordModal from './components/addRecordModal'
const MapDetailPage = () => {
  const router = useRouter()
  const { id } = queryURLParams()
  const addRecord = ()=>{
    const account = localStorage.getItem('account')
    if(!account){
      Toast.show('请先登录')
      router.push('/')
      return
    }



  }
  
  return (
    <div className="map_detail_page">
      <div className="list">list</div>
      <div>
        <AddRecordModal />
      </div>
    </div>
  )
}

export default MapDetailPage
