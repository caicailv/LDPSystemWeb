import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { password, account } = await req.json()
  // 检查账号是否已存在
  const [existingAccount] = await pool.query(
    'SELECT * FROM users WHERE account = ?',
    [account]
  )
  // 根据账号查出密码
  const [existingPassword] = await pool.query(
    'SELECT * FROM users WHERE account = ?',
    [account]
  )
  // 验证密码是否正确
  // @ts-ignore
  const result:any = existingPassword[0]
  console.log('hashedPassword');
  const isMatch = await bcrypt.compare(password, result.password)
  if (!isMatch) {
    return NextResponse.json({ msg: '密码错误', status: 500 })
  }
  console.log('existingAccount', existingAccount)
  // @ts-ignore
  if (existingAccount.length <= 0) {
    return NextResponse.json({ msg: '账号不存在', status: 500 })
  }
  delete result.password
  return NextResponse.json({ msg: '登录成功', status: 200, data: result })

}
