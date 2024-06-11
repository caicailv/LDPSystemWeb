import { Toast } from 'antd-mobile'
import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
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

export default service
