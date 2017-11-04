const mapValues = require('lodash/mapValues')
const router = require('express').Router()

const Record = require('../models/record.js').default

router.get('/', function (req, res) {
  res.json(req.user.records)
})

router.post('/create', function (req, res) {
  const { date, distance, time } = req.body
  const newRecord = new Record({
    date, distance, time
  })
  const error = newRecord.validateSync()
  if (error) {
    res.status(400).json({
      error: true,
      message: 'Incorrect record parameters',
      data: mapValues(error.errors, 'message')
    })
  } else {
    req.user.records.push(newRecord)
    req.user.save(error => {
      if (error) {
        res.status(400).send({
          error: true,
          message: 'Unknown user error',
          data: mapValues(error.errors, 'message')
        })
      } else {
        res.json({ success: true, message: 'Record added successfully' })
      }
    })
  }
})

router.get('/:id', function (req, res) {
  const record = req.user.records.find(record => record._id.toString() === req.params.id)
  if (record) {
    res.json(record)
  } else {
    res.status(404).json({ error: true, message: 'Record not found' })
  }
})

router.delete('/:id', function (req, res) {

})

router.put('/:id', function (req, res) {

})

module.exports = router
