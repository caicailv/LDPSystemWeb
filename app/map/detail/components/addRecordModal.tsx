// 'use client'
import {
  closeLoading,
  isLogined,
  openLoading,
  queryURLParams,
  tempToNumber,
} from '@/utils'
import { Button, Input, Form, Toast, Modal, Popup } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import { PickerView } from 'antd-mobile'
import { useState, useEffect } from 'react'
import '../page.scss'
import UploadImgs from '@/components/uploadImgs'
import { addMapRecord } from '@/app/api/api'
const getColumnsTime = () => {
  const hs = new Array(60).fill({}).map((item, index) => ({
    label: index >= 10 ? index + '' : '0' + index,
    value: index >= 10 ? index + '' : '0' + index,
  }))

  const timeArr = [hs, hs, hs]
  return timeArr
}
const AddRecordModal = ({ update }: { update: () => void }) => {
  const router = useRouter()
  const { id } = queryURLParams()
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const addRecord = () => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      Toast.show('请先登录')
      setTimeout(() => {
        router.push('/')
      }, 500)
      return
    }
    setVisible(true)
    update()
  }
  return (
    <div>
      <p className='text-center mb-[10px]'>排行按照运动总时间倒序排列</p>
      {/* {isLogined() && ( */}
      <Button block color="primary" size="large" onClick={addRecord}>
        添加记录
      </Button>
      {/* )} */}
      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        closeOnAction={true}
        content={<Content onClose={() => setVisible(false)} />}
      ></Modal>
    </div>
  )
}
const Content = ({ onClose }: { onClose: () => void }) => {
  const { id } = queryURLParams()
  const [PickerViewPopupOpen, setPickerViewPopupOpen] = useState(false)
  const [duration, setDuration] = useState('')
  const [recordImg, setRecordImg] = useState('')
  const durationChange = (value: any) => {
    setPickerViewPopupOpen(false)
    setDuration(value)
  }
  const handleSubmit = async () => {
    if (duration === '') return Toast.show('请填写时长')
    if (recordImg === '') return Toast.show('请上传截图')
    // 使用dayjs将duration转化为毫秒数
    const durationInMs = tempToNumber(duration)
    openLoading()
    const res = await addMapRecord({
      mapId: id,
      duration: durationInMs,
      record_img_url: recordImg,
    })
    closeLoading()

    if (res.status === 200) {
      Toast.show('添加成功')
      onClose()
    }
  }
  useEffect(() => {
    setDuration('')
    setRecordImg('')
  }, [])
  return (
    <div className="add-record-modal">
      <Form
        layout="horizontal"
        onFinish={handleSubmit}
        footer={
          <>
            <Button block type="submit" color="primary" size="large">
              提交
            </Button>
            <Button
              style={{ marginTop: '10px' }}
              block
              color="warning"
              onClick={onClose}
              size="large"
            >
              关闭(不会保存)
            </Button>
          </>
        }
      >
        <Form.Item label="时长" required>
          <div
            style={{
              height: '30px',
              width: '100%',
              backgroundColor: '#f0f0f0',
              padding: '0 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => {
              setPickerViewPopupOpen(true)
            }}
          >
            {duration}
          </div>
        </Form.Item>
        <Form.Item label="图片" required>
          <UploadImgs
            count={1}
            path="mapRecord"
            onUploadSuccess={(url) => setRecordImg(url)}
          />
        </Form.Item>
      </Form>
      <PickerViewPopup
        open={PickerViewPopupOpen}
        onClose={() => setPickerViewPopupOpen(false)}
        onChange={durationChange}
      />
    </div>
  )
}

export const PickerViewPopup = ({
  open,
  onClose,
  onChange,
}: {
  open: boolean
  onClose: () => void
  onChange: (value: any) => void
}) => {
  const [duration, setDuration] = useState('')
  return (
    <Popup visible={open} onClose={onClose}>
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="text-[15px] p-[5px]" onClick={onClose}>
            取消
          </div>
          <div
            className="text-[15px] p-[5px]"
            onClick={() => {
              onChange(duration)
            }}
          >
            确定
          </div>
        </div>
        <PickerView
          columns={getColumnsTime()}
          mouseWheel={true}
          onChange={(value) => {
            setDuration(`${value[0]}:${value[1]}:${value[2]}`)
          }}
        />
      </div>
    </Popup>
  )
}

export default AddRecordModal
