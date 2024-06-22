import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { mapId } = await req.json()
  const result = await pool.query(
    `SELECT ums.*, u.nickname
     FROM user_map_scores ums
     INNER JOIN users u ON ums.user_id = u.id
     INNER JOIN (
       SELECT user_id, MIN(duration) AS min_duration
       FROM user_map_scores
       WHERE map_id = ?
       GROUP BY user_id
     ) min_ums ON ums.user_id = min_ums.user_id AND ums.duration = min_ums.min_duration
     WHERE ums.map_id = ?
     ORDER BY ums.duration ASC`,
    [mapId, mapId]
  );
  return NextResponse.json({ msg: 'ok', status: 200, data: result[0] })
}
