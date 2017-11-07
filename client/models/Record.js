import { secondsToString } from './utils'
import moment from 'moment'

// m/s to km/hr
const CONVERT_COEF = 3600 / 1000

export default class Record {
  constructor ({ _id, date, distance, time }) {
    this._id = _id
    this.date = new Date(date)
    this.distance = distance
    this.time = time
  }

  get averageSpeed () {
    if (this.time === 0) {
      return 0.0
    }

    return CONVERT_COEF * (this.distance / this.time)
  }

  get dateString () {
    return moment(this.date).format('DD/MM/YYYY')
  }

  get timeString () {
    return secondsToString(this.time)
  }
}
