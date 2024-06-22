interface Score {
  duration: number
  speed: string
  created_at: string
}

interface MapScore {
  mapName: string
  list: Score[]
}
import dayjs from 'dayjs'
import '../page.scss'
import { numberToTemp } from '@/utils'

const Record = ({ recordList }: { recordList: MapScore[] }) => {
  console.log('recordList', recordList)
  return (
    <div className="mt-[20px]">
      {recordList.map((item, index) => (
        <div key={index}>
          <div>{item.mapName}</div>
          <div className="list_row mt-[10px]">
            {item.list.map((score, i) => (
              <div key={item.mapName + i} className="list_item">
                <div className="list_item_right w-[30%]">
                  {dayjs(score.created_at).format('YY-MM-DD')}
                </div>
                <div className="list_item_left w-[25%]">
                  {numberToTemp(score.duration)}
                </div>
                <div className="list_item_right w-[30%]">{score.speed}km/h</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
export default Record
