import moment from 'moment'
import { range, fromPairs, groupBy, map } from 'lodash'
import { secondsToString } from './utils'

// m/s to km/hr
const CONVERT_COEF = 3600 / 1000

function average (arr) {
  if (arr.length === 0) {
    return { distance: 0.0, speed: 0.0 }
  }

  const [ distance, speed ] = arr.reduce(
    ([dist, sp], record) => [dist + record.distance, sp + record.averageSpeed],
    [0.0, 0.0]
  ).map(x => x / arr.length)

  return { distance, speed }
}

export function statsByWeek (records) {
  return map(
    groupBy(records, record => moment(record.date).format('YYYY/WW')),
    (records, week) => ({ week, ...average(records) })
  ).sort((a, b) => a.week > b.week)
}

export function yearStatsByWeek (records) {
  const currentWeek = moment().isoWeek()
  let result = fromPairs(range(1, currentWeek + 1).map(week => [week, []]))

  records.forEach(record =>
    result[moment(record).isoWeek()].push({
      distance: record.distance,
      speed: record.averageSpeed
    })
  )

  return map(result, (records, week) => ({
    week, ...average(records)
  })).sort((a, b) => a.week - b.week)
}

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
