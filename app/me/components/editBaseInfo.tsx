import dayjs from 'dayjs'
import '../page.scss'
import { Button, Input, Form, Toast, TextArea, Cascader } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import ChoiceCountry from '@/components/choiceCountry'
import { updateInfo } from '@/app/api/api'
import { queryURLParams } from '@/utils'
const EditBaseInfo = ({
  detail,
  userId,
  onUpdate,
}: {
  detail: any
  userId: string
  onUpdate: () => void
}) => {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [age, setAge] = useState('')
  const [region, setRegion] = useState('')
  const handleSubmit = async () => {
    if (!height && !weight && !age && !region) return
    setVisible(false)
    await updateInfo({ height, weight, age, region, userId })
    Toast.show('更新成功')
    setVisible(false)
    onUpdate()
  }
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setHeight(detail.height || '')
    setWeight(detail.weight || '')
    setAge(detail.age || '')
    setRegion(detail.region || '')
  }, [])
  return (
    <div className="edit_base_info">
      {!visible && (
        <Button color="primary" onClick={() => setVisible(true)}>
          更新基础信息
        </Button>
      )}
      {visible && (
        <div className="base_info">
          <div className="li">
            <Input
              placeholder="身高"
              type="number"
              value={height}
              onChange={(e) => setHeight(e)}
            />
          </div>
          <div className="li">
            <Input
              placeholder="体重"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e)}
            />
          </div>
          <div className="li">
            <Input
              placeholder="年龄"
              type="number"
              value={age}
              onChange={(e) => setAge(e)}
            />
          </div>
          <div className="li">
            <ChoiceCountry value={region} onChange={(e) => setRegion(e)} />
          </div>
        </div>
      )}

      {visible && (
        <Button
          color="primary"
          className="!mt-[10px]"
          onClick={() => handleSubmit()}
        >
          保存基础信息
        </Button>
      )}
    </div>
  )
}
export default EditBaseInfo
