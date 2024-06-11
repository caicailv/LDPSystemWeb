'use client'
import React, { useState } from 'react'
// import { useRouter } from 'next/router';
import { Button, Input, Form, Toast } from 'antd-mobile'
import { login, register } from '../api/api'
const LoginPage = () => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  // const [avatarUrl, setAvatarUrl] = useState('');
  // const [bio, setBio] = useState('');
  // const router = useRouter();

  const handleSubmit = async () => {

    const res = await login({
      password,
      account,
      // avatar_url: avatarUrl,
      // bio,
    })

    if (res.status === 200) {
      Toast.show({ icon: 'success', content: '登录成功！' })
      console.log('res',res)
      localStorage.setItem('userId', res.data.id)
      localStorage.setItem('nickname', res.data.nickname)
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
            登录
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
        <Form.Item label="密码">
          <Input
            type="text"
            value={password}
            onChange={(value) => setPassword(value)}
            maxLength={20}
          />
        </Form.Item>
      
      </Form>
    </div>
  )
}

export default LoginPage
