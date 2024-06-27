import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getUserId } from './../utils'

export async function POST(req: NextRequest) {
  const { mapId, duration, record_img_url } = await req.json()
  const userId = getUserId(req)
  const [maps] = await pool.query('SELECT * FROM maps WHERE id =?', [mapId])
  const { route_length } = (maps as any[])[0]
  const hoursDuraton = duration / 60 / 60 / 1000
  const speed = (route_length / hoursDuraton).toFixed(2)

  try {
    await pool.query(
      'INSERT INTO user_map_scores (user_id, map_id, speed, duration, record_img_url) VALUES (?, ?, ?, ?, ?)',
      [userId, mapId, speed, duration, record_img_url]
    )
    return NextResponse.json({ msg: 'ok', status: 200 })
  } catch (err) {
    // @ts-ignore
    return NextResponse.json({ msg: err.message, status: 500 })
  }
}
