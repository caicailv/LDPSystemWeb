import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { pool } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()
  const [info] = await pool.query('SELECT * FROM users WHERE id = ?', [userId])
  // 验证密码是否正确
  // @ts-ignore
  const result: any = info[0]
  delete result.password
  // 查用户 查地图
  /* 
  recors:
  
  */

  // 查询用户在 user_map_scores 表中的所有信息
  const [scores] = await pool.query(
    'SELECT ums.*, maps.name as mapName,maps.route_length as route_length FROM user_map_scores ums INNER JOIN maps ON ums.map_id = maps.id WHERE ums.user_id = ?',
    [userId]
  )

  // 格式化结果
  let mapScores = (scores as any[]).reduce((acc, score) => {
    const map = acc.find((m: any) => m.mapName === score.mapName)
    
    if (map) {
      map.list.push({
        duration: score.duration,
        speed: score.speed,
        created_at: score.created_at,
      })
    } else {
      acc.push({
        mapName: score.mapName,
        routeLength: score.route_length,
        list: [
          {
            duration: score.duration,
            speed: score.speed,
          },
        ],
      })
    }
    return acc
  }, [])
  mapScores = mapScores.map((map: any) => {
    // @ts-ignore
    map.list = map.list.sort((a, b) => a.duration - b.duration)
    return map
  })
  //  let records = [
  //   {
  //     mapName:'地图1',
  //     list:[
  //       {
  //         duration: 10,
  //         speed: 10,
  //       }
  //     ]
  //   }
  // ]

  return NextResponse.json({
    msg: '查询成功',
    status: 200,
    data: { ...result, mapScores },
  })
}
