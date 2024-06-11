'use client'
import {
  closeLoading,
  numberToTemp,
  openLoading,
  queryURLParams,
} from '@/utils'
import { Button, Input, Form, Toast, Collapse } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import './page.scss'
import AddRecordModal from './components/addRecordModal'
import { useEffect, useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import { getMapRecordList } from '@/app/api/api'
import dayjs from 'dayjs'
const MapDetailPage = () => {
  const router = useRouter()
  const [list, setList] = useState<any[]>([])
  const getData = async () => {
    const { id } = queryURLParams()
    openLoading()
    const res = await getMapRecordList({ mapId: id })
    const data2 = (res.data || []).map((item: any) => {
      return {
        ...item,
        duration: numberToTemp(item.duration),
        created_at: dayjs(item.created_at).format('YYYY-MM-DD HH:mm'),
      }
    })
    setList(data2)
    closeLoading()
  }

  useEffect(() => {
    const { id } = queryURLParams()
    getData()
  }, [])
  return (
    <div className="map_detail_page">
      {/* <HeadTitle /> */}
      {list.length > 0 && (
        <Collapse defaultActiveKey={['1']}>
          {list.map((item, index) => (
            <Collapse.Panel
              key={index + ''}
              title={<Title detail={item} index={index} />}
            >
              <div>
                昵称:{' '}
                <span className="text-[#1677ff] underline">
                  {item.nickname}
                </span>
              </div>
              <div>速度: {item.speed}km/h</div>
              <div>用时: {item.duration}</div>
              <div>提交时间: {item.created_at}</div>
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
      {list.length === 0 && (
        <div className="text-center mt-[20px] mb-[40px]">暂无数据</div>
      )}
      <div>
        <div className="mt-[20px]"></div>
        <AddRecordModal />
      </div>
    </div>
  )
}

export const Title = ({ detail, index }: { detail: any; index: number }) => {
  return (
    <div className="flex justify-between p-[5px]">
      <div className="w-[20px]">{index + 1}</div>
      <div className="nickname ellipsis w-[35%]">{detail.nickname}</div>
      <div className="nickname ellipsis w-[20%]">{detail.speed}km/h</div>
      <div className="nickname ellipsis w-[30%]">{detail.duration}</div>
    </div>
  )
}
export const HeadTitle = () => {
  return (
    // <div className="flex">
    //   <div className="nickname ">名次</div>
    //   <div className="nickname ellipsis w-[30%]">昵称</div>
    //   <div className="nickname">速度(km/h)</div>
    //   <div className="nickname">时间</div>
    // </div>

    <div className="flex justify-between p-[5px]">
      <div className="w-[20px]">名次</div>
      <div className="nickname ellipsis w-[35%]">昵称</div>
      <div className="nickname ellipsis w-[20%]">速度(km/h)</div>
      <div className="nickname ellipsis w-[30%]">时间</div>
    </div>
  )
}

export default MapDetailPage
