const Record = require('../models/Record.js').default

const { secondsToString, stringToSeconds } = require('../models/utils.js')

describe('Record Model', () => {
  test('computes average speed correctly', () => {
    const r = new Record({
      distance: 60000, // 60 km
      time: 3600 // 1 hour
    })

    expect(r.averageSpeed.toFixed(2).toString()).toBe('60.00')
  })

  test('returns zero if time is zero', () => {
    const r = new Record({
      distance: 60000, // 60 km
      time: 0
    })

    expect(r.averageSpeed.toFixed(2).toString()).toBe('0.00')
  })

  test('computes average speed correctly (complex)', () => {
    const r = new Record({
      distance: 12345,
      time: 5432
    })

    expect(r.averageSpeed.toFixed(2).toString()).toBe('8.18')
  })
})

describe('Time utils', () => {
  test('converts seconds to string correctly', () => {
    expect(secondsToString(3600)).toBe('01:00:00')
    expect(secondsToString(3742)).toBe('01:02:22')
    expect(secondsToString(61)).toBe('00:01:01')
  })

  test('converts strings to seconds correctly', () => {
    expect(stringToSeconds('01:00:00')).toBe(3600)
    expect(stringToSeconds('01:02:22')).toBe(3742)
    expect(stringToSeconds('00:01:01')).toBe(61)
  })
})
