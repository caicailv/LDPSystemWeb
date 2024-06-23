import dayjs from 'dayjs'
import '../page.scss'
import { numberToTemp } from '@/utils'

const BaseInfo = ({ detail }: { detail: any }) => {
  return (
    <div>
      <div className="base-info">
        <div className="li">
          <span className="label">身高：</span>
          <span className="value">
            {detail.height ? `${detail.height}cm` : '--'}
          </span>
        </div>
        <div className="li">
          <span className="label">体重：</span>
          <span className="value">
            {detail.weight ? `${detail.height}kg` : '--'}
          </span>
        </div>
        <div className="li">
          <span className="label">年龄：</span>
          <span className="value">{detail.age ? detail.age : '--'}</span>
        </div>
        <div className="li">
          <span className="label">地区：</span>
          <span className="value">{detail.region ? detail.region : '--'}</span>
        </div>
      </div>
    </div>
  )
}
export default BaseInfo
