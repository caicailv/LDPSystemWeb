import React, { useEffect, useState } from 'react'
import { closeLoading, openLoading, queryURLParams } from '@/utils'
import { Button, Input, Form, Toast, TextArea, Image } from 'antd-mobile'
import { Collapse, ImageViewer } from 'antd-mobile'
import axios from 'axios'
import service from '@/app/api/fetch'
import { addMapApi, findInfo, updateInfo } from '@/app/api/api'
import { useAsyncEffect } from 'ahooks'
import { SmileFill } from 'antd-mobile-icons'
import UploadImgs from '@/components/uploadImgs'
import '../page.scss'
interface Props {
  info: any
}
const recordNumLabels = [
  { num: 20, label: '买了块板', color: 'gray' },
  { num: 100, label: '刷街新星', color: 'blue' },
  { num: 500, label: '炮灰', color: 'green' },
  { num: 1000, label: '卷王', color: 'gold' },
]

const LabelTitle = ({ info }: Props) => {
  const [bio, setBoi] = useState('')
  const [labelInfo, setLabelInfo] = useState<any>(null)
  // const [recordNum, setRecordNum] = useState(0)
  useEffect(() => {
    console.log('info.mapScores', info.mapScores)
    if (info.mapScores) {
      const recordNum = info.mapScores.reduce((acc: any, cur: any) => {
        return acc + cur.list.length * cur.routeLength
      }, 0)
      console.log('recordNum', recordNum)
      // setRecordNum(recordNum)
      const labelInfo =
        recordNumLabels.find((label) => recordNum >= label.num) || {}
      if (labelInfo) {
        setLabelInfo(labelInfo)
      }
    }
  }, [info])

  return (
    <div className="label-title-container ml-[10px]">
      {/* 公里数标签 */}
      <div>
        {labelInfo && (
          <div
            className={`label-title text-[#fff] `}
            style={{ backgroundColor: labelInfo.color,padding: '0.1rem 0.2rem', borderRadius: '0.2rem', fontSize: '12px',display:'flex',
            justifyContent: 'center',alignItems: 'center' }}
          >
            {labelInfo.label}
          </div>
        )}
      </div>
    </div>
  )
}
export default LabelTitle
