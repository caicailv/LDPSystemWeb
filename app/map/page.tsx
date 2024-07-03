'use client'
import dynamic from 'next/dynamic';



import { useRouter } from 'next/navigation'
import { Button, Input, Form, Toast } from 'antd-mobile'
import { use, useEffect, useState } from 'react'
import { Collapse } from 'antd-mobile'
import { useAsyncEffect } from 'ahooks'
import service from '../api/fetch'
import './page.scss'
import { getMapList } from '../api/api'
import { closeLoading, isLogined, openLoading } from '@/utils'
const MapPage = () => {
  const router = useRouter()
  const [list, setList] = useState<any[]>([])
  // useAsyncEffect(async () => {
  // }, [])
  const getData = async () => {
    openLoading()
    const res = await getMapList()
    
    console.log('res.data', res.data)
    setList(res.data)
    closeLoading()
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <div className="map_container">
        <div className="row">
          {list.length === 0 && <div className="loading"></div>}

          {list.map((item, index) => (
            <div
              className="list"
              onClick={() => router.push('/map/detail?id=' + item.id)}
              key={index}
            >
              {item.name}
              <span>({item.route_length}km)</span>
            </div>
          ))}
        </div>
        {isLogined() && (
          <div>
            <Button
              block
              color="primary"
              size="large"
              onClick={() => router.push('/addMap')}
            >
              添加地图
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default  dynamic(() => Promise.resolve(MapPage), { ssr: false });

