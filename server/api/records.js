const mapValues = require('lodash/mapValues')
const router = require('express').Router()

router.get('/', function (req, res) {
  res.json(req.user.records)
})

router.post('/', function (req, res) {
  req.user.addRecord(req.body, (error, user) => {
    if (error) {
      res.status(400).json({
        error: true,
        message: 'Incorrect record parameters',
        data: mapValues(error.errors, 'message')
      })
    } else {
      user.save(error => {
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
})

router.get('/:id', function (req, res) {
  const record = req.user.findRecord(req.params.id)
  if (record) {
    res.json(record)
  } else {
    res.status(404).json({ error: true, message: 'Record not found' })
  }
})

router.delete('/:id', function (req, res) {
  req.user.removeRecord(req.params.id)
  req.user.save(error => {
    if (error) {
      res.status(400).send({
        error: true,
        message: 'Unknown user error',
        data: mapValues(error.errors, 'message')
      })
    } else {
      res.json({ success: true, message: 'Record deleted successfully' })
    }
  })
})

router.put('/:id', function (req, res) {
  req.user.updateRecord(req.params.id, req.body, (error, user) => {
    if (error) {
      res.status(404).json({ error: true, message: 'Record not found' })
    } else {
      user.save(error => {
        if (error) {
          res.status(400).send({
            error: true,
            message: 'Unknown user error',
            data: mapValues(error.errors, 'message')
          })
        } else {
          res.json({ success: true, message: 'Record updated successfully' })
        }
      })
    }
  })
})

module.exports = router
