import { NextRequest, NextResponse } from 'next/server'

export const queryURLParams = () => {
  if (typeof window === 'undefined') return {}
  const urlParams = new URLSearchParams(window.location.search)
  const params: any = {}
  urlParams.forEach((value, key) => {
    params[key] = value
  })
  return params
}

export const getAccount = (req: NextRequest) => {
  return req.headers.get('authorization') || ''
}

export const tempToNumber = (temp: string) => {
  const [hours, minutes, seconds] = temp.split(':').map(Number)
  return (hours * 3600 + minutes * 60 + seconds) * 1000
}

export const numberToTemp = (number: number) => {
  const sec = number / 1000
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = Math.floor(sec % 60)

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export { openLoading, closeLoading } from './loading'

export const isLogined = () => {
  return typeof window!== 'undefined' && window.localStorage.getItem('userId')
}