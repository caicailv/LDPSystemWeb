'use client'
// pages/register.tsx
import React, { useState } from 'react'
// import { useRouter } from 'next/router';
import { Button, Input, Form, Toast } from 'antd-mobile'
import axios from 'axios'
import service from '@/app/api/fetch'
const Register = () => {
  const [nickname, setNickname] = useState('')
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  // const [avatarUrl, setAvatarUrl] = useState('');
  // const [bio, setBio] = useState('');
  // const router = useRouter();

  const handleSubmit = async () => {

    if (!nickname || !account || !password) {
      Toast.show({ icon: 'fail', content: '请填写完整信息！' })
    }
    const response = await service.post('/register', {
      nickname,
      password,
      account,
      // avatar_url: avatarUrl,
      // bio,
    })

    if (response.status === 200) {
      Toast.show({ icon: 'success', content: '注册成功！' })
      // router.push('/login');
    }
  }

  return (
    <div style={{ padding: '16px' }}>
      <Form
        layout="horizontal"
        onFinish={handleSubmit}
        footer={
          <Button block type="submit" color="primary" size="large">
            注册
          </Button>
        }
      >
        <Form.Item label="账号/邮箱">
          <Input
            value={account}
            onChange={(value) => setAccount(value)}
            maxLength={20}
          />
        </Form.Item>
        <Form.Item label="昵称">
          <Input
            value={nickname}
            onChange={(value) => setNickname(value)}
            maxLength={20}
          />
        </Form.Item>

        <Form.Item label="密码">
          <Input
            type="text"
            value={password}
            onChange={(value) => setPassword(value)}
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

export default Register
