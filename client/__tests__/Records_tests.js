const Record = require('../models/Record.js').default

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

  test('shows time correctly', () => {
    expect(new Record({ time: 3600 }).timeString).toBe('01:00:00')
    expect(new Record({ time: 3742 }).timeString).toBe('01:02:22')
    expect(new Record({ time: 61 }).timeString).toBe('00:01:01')
  })
})
