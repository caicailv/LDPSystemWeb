// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { nickname, password, account } = await req.json()
  const hashedPassword = await bcrypt.hash(password, 10)
  // 检查账号是否已存在
  const [existingAccount] = await pool.query(
    'SELECT * FROM users WHERE account = ?',
    [account]
  )
  console.log('existingAccount', existingAccount)
  if (existingAccount.length > 0) {
    return NextResponse.json({ msg: '账号已存在', status: 500  })
  }

  // 检查昵称是否已存在
  const [existingNickname] = await pool.query(
    'SELECT * FROM users WHERE nickname = ?',
    [nickname]
  )
  console.log('existingNickname', existingNickname)
  if (existingNickname.length > 0) {
    return NextResponse.json({ msg: '昵称已存在', status: 500 })
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO users (nickname, password, account) VALUES (?, ?, ?)',
      [nickname, hashedPassword, account]
    )
    return NextResponse.json({ msg: '注册成功', status: 200 })
  } catch (err) {
    return NextResponse.json({ msg: err.message, status: 500 })
  }
}
