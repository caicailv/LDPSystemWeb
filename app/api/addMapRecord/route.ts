import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { getAccount } from '@/utils'

export async function POST(req: NextRequest) {
  const { mapId, duration, speed } = await req.json()
  const account = getAccount(req)
  
  try {
    const [result] = await pool.query(
      'INSERT INTO user_map_scores (user_id, map_id, speed, duration) VALUES (?, ?, ?, ?)',
      [account, mapId, speed, duration]
    )
    console.log('result',result);
    return NextResponse.json({ msg: 'ok', status: 200})
  } catch (err) {
    // @ts-ignore
    return NextResponse.json({ msg: err.message, status: 500 })
  }
}
