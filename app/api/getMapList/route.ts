import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(req: NextRequest) {
  console.log('req.headers',req.headers);
  // @ts-ignore
  const authHeader = req.headers.get('authorization') || '';
  console.log('authHeader',authHeader);
  // console.log('req.headers',req.headers.authorization);
  
  const result = await pool.query('SELECT * FROM maps')
  return NextResponse.json({ msg: 'ok', status: 200, data: result[0] })
}
