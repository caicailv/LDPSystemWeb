import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getUserId } from './../utils'

export async function POST(req: NextRequest) {
  const { mapId, duration, speed :speedOrigin, record_img_url } = await req.json()
  const userId = getUserId(req)
  const speed = Number(speedOrigin).toFixed(2)
  if(speed==='NaN') {
    return NextResponse.json({ msg: 'speed is not a number', status: 500 })
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO user_map_scores (user_id, map_id, speed, duration, record_img_url) VALUES (?, ?, ?, ?, ?)',
      [userId, mapId, speed, duration, record_img_url]
    )
    return NextResponse.json({ msg: 'ok', status: 200 })
  } catch (err) {
    // @ts-ignore
    return NextResponse.json({ msg: err.message, status: 500 })
  }
}
