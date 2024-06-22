import { Toast } from 'antd-mobile'
import * as qiniu from 'qiniu-js'
import axios from 'axios'
const service = axios.create({
  baseURL: '/api',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
service.interceptors.request.use((config) => {
  let userId = localStorage.getItem('userId')
  if (userId) {
    config.headers.Authorization = userId
  }
  return config
})
service.interceptors.response.use((response) => {
  if (response.status === 200) {
    if (response.data.status !== 200) {
      Toast.show({ content: response.data.msg })
      return Promise.reject(response.data)
    }
    return response.data
  } else {
    console.error(response)
    Toast.show({ content: 'system error' })
    return Promise.reject(response.data)
  }
})

export const uploadFile = async (file: any,path?:string) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('name', file.name)
  if(path){
    formData.append('path', path)
  }

  const response = await service.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('userId') || '',
    },
  })
  return response
}


export default service
