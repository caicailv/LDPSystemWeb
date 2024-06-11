import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { pool } from '@/lib/db'
import { getAccount } from '@/utils'

export async function POST(req: NextRequest) {
  // const userId = getAccount(req)
  const { userId } = await req.json()
  const [info] = await pool.query('SELECT * FROM users WHERE id = ?', [userId])
  // 验证密码是否正确
  // @ts-ignore
  const result: any = info[0]
  delete result.password
  // 查用户 查地图
  return NextResponse.json({ msg: '查询成功', status: 200, data: result })
}
