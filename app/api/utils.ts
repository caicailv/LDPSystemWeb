import { NextRequest, NextResponse } from 'next/server'

export const getUserId = (req: NextRequest) => {
  return req.headers.get('authorization') || ''
}