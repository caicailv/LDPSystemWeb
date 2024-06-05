'use client'
// pages/register.tsx
import React, { useState } from 'react'
import { Button, Input, Form, Toast, TextArea } from 'antd-mobile'
import axios from 'axios'
import service from '@/app/api/fetch'
const AddMap = () => {
  const [mapName, setMapName] = useState('')
  const [routeLength, setRouteLength] = useState('')
  const [description, setDescription] = useState('')
  const handleSubmit = async () => {
    if (!mapName || !routeLength ) {
      Toast.show({ icon: 'fail', content: '请填写完整信息！' })
    }
    const response = await service.post('/addMap', {
      mapName,
      routeLength,
      description,
    })

    if (response.status === 200) {
      Toast.show({ icon: 'success', content: '添加成功' })
      history.go(-1)
    }
  }

  return (
    <div style={{ padding: '16px' }}>
      <Form
        layout="horizontal"
        onFinish={handleSubmit}
        footer={
          <Button block type="submit" color="primary" size="large">
            添加
          </Button>
        }
      >
        <Form.Item label="地图名称">
          <Input
            value={mapName}
            onChange={(value) => setMapName(value)}
            maxLength={20}
          />
        </Form.Item>
        <Form.Item label="最小长度(km)">
          <Input
            value={routeLength}
            type='number'
            onChange={(value) => setRouteLength(value)}
            maxLength={20}
          />
        </Form.Item>

        <Form.Item label="描述">
          <TextArea
            value={ description}
            onChange={(value) =>  setDescription(value)}
            maxLength={20}
          />
        </Form.Item>
        {/* <Form.Item label='头像 URL'>
          <Input value={avatarUrl} onChange={(value) => setAvatarUrl(value)} />
        </Form.Item> */}
        {/* <Form.Item label='简介'>
          <Input value={bio} onChange={(value) => setBio(value)} />
        </Form.Item> */}
      </Form>
    </div>
  )
}

export default AddMap
