'use client'
import {
  closeLoading,
  formatDate,
  numberToTemp,
  openLoading,
  queryURLParams,
} from '@/utils'
import { Collapse,ImageViewer } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import './page.scss'
import AddRecordModal from './components/addRecordModal'
import { useEffect, useState } from 'react'
import { useAsyncEffect } from 'ahooks'
import { getMapRecordList } from '@/app/api/api'
// import dayjs from 'dayjs'
const MapDetailPage = () => {
  const router = useRouter()
  const [list, setList] = useState<any[]>([])
  const [imgVisible, setImgVisible] = useState(false)
  const [imgurl, setImgurl] = useState('')
  const openImageViewer = (url: string) => {
    setImgurl(url)
    setImgVisible(true)
  }
  const getData = async () => {
    const { id } = queryURLParams()
    openLoading()
    const res = await getMapRecordList({ mapId: id })
    const data2 = (res.data || []).map((item: any) => {
      return {
        ...item,
        duration: numberToTemp(item.duration),
        created_at: formatDate(item.created_at)
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
      {list.length > 0 && (
        <Collapse defaultActiveKey={['1']}>
          {list.map((item, index) => (
            <Collapse.Panel
              key={index + ''}
              title={<RankTitle detail={item} index={index} />||null}
            >
              <div>
                昵称:{' '}
                <span className="text-[#1677ff] underline" onClick={() => router.push(`/me?userId=${item.user_id}`)}>
                  {item.nickname}
                </span>
              </div>
              <div>速度: {item.speed}km/h</div>
              <div>用时: {item.duration}</div>
              <div>提交时间: {item.created_at}</div>
              <span className="text-[#1677ff] underline" onClick={() => openImageViewer(item.record_img_url)}>
                 查看截图
                </span>
              {/* ImageViewer */}
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
      {list.length === 0 && (
        <div className="text-center mt-[20px] mb-[40px]">暂无数据</div>
      )}
      <div>
        <div className="mt-[20px]"></div>
        <AddRecordModal update={getData} />
      </div>
      <ImageViewer visible={ imgVisible }  image={imgurl} onClose={() => setImgVisible(false)} />
    </div>
  )
}

 const RankTitle = ({ detail, index }: { detail: any; index: number }) => {
  return (
    <div className="flex justify-between p-[5px]">
      <div className="w-[5px]">{index + 1}</div>
      <div className="nickname ellipsis w-[20%]">{detail.nickname}</div>
      <div className="nickname ellipsis w-[30%]">{detail.duration}</div>
      <div className="nickname ellipsis w-[30%]">{detail.speed}km/h</div>
    </div>
  )
}
export default MapDetailPage
