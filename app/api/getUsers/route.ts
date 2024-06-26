import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  const [list] = await pool.query('SELECT * FROM users')
  // 格式化结果
  return NextResponse.json({
    msg: '查询成功',
    status: 200,
    data: list,
  })
}
