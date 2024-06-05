// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(req: NextRequest) {
  const result = await pool.query('SELECT * FROM maps')
  return NextResponse.json({ msg: 'ok', status: 200, data: result[0] })
}
