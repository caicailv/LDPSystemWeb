// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { mapName, routeLength, description } = await req.json()
  // const hashedPassword = await bcrypt.hash(password, 10)
  // 检查账号是否已存在
  const [existingMapName] = await pool.query(
    'SELECT * FROM maps WHERE name = ?',
    [mapName]
  )
  if (existingMapName.length > 0) {
    return NextResponse.json({ msg: '地图已存在', status: 500 })
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO maps (name, route_length, description) VALUES (?, ?, ?)',
      [mapName, routeLength, description]
    )
    return NextResponse.json({ msg: 'ok', status: 200 })
  } catch (err) {
    return NextResponse.json({ msg: err.message, status: 500 })
  }
}
