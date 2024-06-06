import { queryURLParams } from '@/utils'
import { Button, Input, Form, Toast, Modal } from 'antd-mobile'
import { useRouter } from 'next/navigation'
import { Calendar } from 'antd-mobile'
import { useState, useEffect } from 'react'
import '../page.scss'
const AddRecordModal = () => {
  const router = useRouter()
  const { id } = queryURLParams()
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const addRecord = () => {
    const account = localStorage.getItem('account')
    if (!account) {
      Toast.show('请先登录')
      setTimeout(() => {
        router.push('/')
      }, 500)
      return
    }
    setVisible(true)
  }

  return (
    <div>
      <Button block color="primary" size="large" onClick={addRecord}>
        添加记录
      </Button>

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
  const [speed, setSpeed] = useState('')
  // const [distance, setDistance] = useState('')
  // const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState('')
  const durationChange = (value: any) => {
    // 必须符合 hh:mm:ss 格式
    // const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    // if (regex.test(value)) {
    //   setDuration(value)
    // }else{
    // }
  }
  const handleSubmit = (values: any) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!regex.test(values.duration)) {
      Toast.show('时长格式错误')
      return
    }

    console.log(values)
  }
  useEffect(() => {
    setSpeed('')
    setDuration('')
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
        <Form.Item label="匀速(km/h)" required>
          <Input
            value={speed}
            onChange={(value) => setSpeed(value)}
            maxLength={20}
          />
        </Form.Item>

        <Form.Item label="时长(hh:mm:ss)" required>
          <Input
            type="text"
            value={duration}
            onChange={(value) => setDuration(value)}
            placeholder="hh:mm:ss"
            maxLength={20}
          />
        </Form.Item>
        {/* <Calendar
          prevMonthButton={<span>上一月</span>}
          nextMonthButton={<span>下一月</span>}
          prevYearButton={<span>上一年</span>}
          nextYearButton={<span>下一年</span>}
        /> */}
      </Form>
    </div>
  )
}

export default AddRecordModal
