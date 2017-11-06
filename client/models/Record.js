import { padInt, secondsToString } from './utils'

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
    const d = this.date
    return `${padInt(d.getDate())}.${padInt(d.getMonth() + 1)}.${d.getFullYear()}`
  }

  get timeString () {
    return secondsToString(this.time)
  }
}
