import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(req: NextRequest) {
  // @ts-ignore
  const result = await pool.query('SELECT * FROM maps')
  console.log('result',result,);
  return NextResponse.json({ msg: 'ok', status: 200, data: result[0] })
}
