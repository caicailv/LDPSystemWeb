import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  const {
    userId,
    avatar_url,
    bio,
    gear_setup,
    height,
    weight,
    age,
    region,
    gender,
    gear_setup_img,
  } = await req.json()

  //   if (req.method === 'PUT') {

  // 动态构建 SQL 语句和参数
  let sql = 'UPDATE users SET'
  const values = []
  if (avatar_url !== undefined) {
    sql += ' avatar_url = ?,'
    values.push(avatar_url)
  }

  if (gear_setup !== undefined) {
    sql += ' gear_setup = ?,'
    values.push(gear_setup)
  }

  if (bio !== undefined) {
    sql += ' bio = ?,'
    values.push(bio)
  }

  if (weight) {
    sql += ' weight = ?,'
    values.push(weight)
  }

  if (height) {
    sql += ' height = ?,'
    values.push(height)
  }
  if (region) {
    sql += ' region = ?,'
    values.push(region)
  }
  if (age) {
    sql += ' age = ?,'
    values.push(age)
  }
  if (gender) {
    sql += ' gender = ?,'
    values.push(gender)
  }
  if (gear_setup_img) {
    sql += ' gear_setup_img = ?,'
    values.push(gear_setup_img)
  }

  // 移除末尾的逗号
  sql = sql.slice(0, -1)
  sql += ' WHERE id = ?'
  values.push(userId)

  try {
    await pool.execute(sql, values)
    // res.status(200).json({ message: 'User information updated successfully' });
    return NextResponse.json({ msg: 'success', status: 200 })
  } catch (error) {
    console.error('Error updating user information:', error)
    // res.status(500).json({ error: 'Failed to update user information' });
    return NextResponse.json({ msg: 'error', status: 500, data: error })
  }
  // } else {
  //     res.status(405).json({ error: 'Method not allowed' });
  // }

  // const { userId } = await req.json()
  // const [info] = await pool.query('SELECT * FROM users WHERE id = ?', [userId])
  // // 验证密码是否正确
  // // @ts-ignore
  // const result: any = info[0]
  // delete result.password
  // // 查用户 查地图
  // return NextResponse.json({ msg: '查询成功', status: 200, data: result })
}
