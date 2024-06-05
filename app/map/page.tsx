'use client'

import { useRouter } from 'next/navigation'
import { Button, Input, Form, Toast } from 'antd-mobile'
import { useEffect, useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import service from '../api/fetch'
import './page.scss'
const MapPage = () => {
  const router = useRouter()
  const [list, setList] = useState<any[]>([])

  useAsyncEffect(async () => {
    const res = await service.get('/getMapList')
    console.log('res', res)
    setList(res.data)
  }, [])

  return (
    <>
<div className="map_container">
<div className="row">
        {list.map((item, index) => (
          <div className='list' key={index}>{item.name}<span>({item.route_length}km)</span></div>
        ))}
      </div>

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
</div>
    </>
  )
}

export default MapPage
