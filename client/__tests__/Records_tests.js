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
})
