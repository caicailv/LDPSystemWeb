'use client'
import React, { useEffect, useState } from 'react'
import {
  closeLoading,
  numberToTemp,
  openLoading,
  queryURLParams,
} from '@/utils'
import { Button, Input, Form, Toast, TextArea } from 'antd-mobile'
import axios from 'axios'
import service from '@/app/api/fetch'
import { addMapApi, findInfo } from '../api/api'
import { useAsyncEffect } from 'ahooks'
const MePage = () => {
  let { userId } = queryURLParams()

  // useEffect(()=>{},)
  useAsyncEffect(async () => {
    if (!userId) {
      userId = localStorage.getItem('userId')
    }
    const res = await findInfo({ userId })
    console.log('res', res)
  }, [])
  return <div>me</div>
}

export default MePage
