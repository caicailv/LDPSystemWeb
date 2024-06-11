import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  console.log('req.headers', req.headers)
  // @ts-ignore
  const authHeader = req.headers.get('authorization') || ''
  const { mapId } = await req.json()
  // console.log('req.headers',req.headers.authorization);

  const result = await pool.query(
    `SELECT ums.*, u.nickname 
     FROM user_map_scores ums
     INNER JOIN users u ON ums.user_id = u.id
     WHERE ums.map_id = ? 
     ORDER BY ums.speed DESC`,
    [mapId]
  )
  return NextResponse.json({ msg: 'ok', status: 200, data: result[0] })
}
