import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import qiniu from 'qiniu'
// const qiniu = require('qiniu');
// const express = require('express');
// const app = express();

const accessKey = process.env.NEXT_PUBLIC_QINIU_ACCESS_KEY as string
const secretKey = process.env.NEXT_PUBLIC_QINIU_SECRET_KEY as string
const bucket = process.env.NEXT_PUBLIC_QINIU_BUCKET as string

qiniu.conf.ACCESS_KEY = accessKey
qiniu.conf.SECRET_KEY = secretKey

const getUploadToken = () => {
  const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
  return putPolicy.uploadToken()
}
export async function GET(req: NextRequest) {
  return NextResponse.json({ msg: 'ok', status: 200, data: getUploadToken() })
}
