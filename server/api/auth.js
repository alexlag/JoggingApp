const jwt = require('jsonwebtoken')

const config = require('../config.js')
const User = require('../models/user.js').default

const router = require('express').Router()

router.post('/signup', function (req, res) {
  const { name, surname, email, password, passwordConfirm } = req.body
  if (password === passwordConfirm) {
    const newUser = new User({
      name, surname, email, password, records: []
    })

    newUser.save(error => {
      if (error) {
        res.status(400).send({ error: true, message: 'Incorrect user parameters', data: error.errors })
      } else {
        res.json({ success: true, message: 'Account created successfully' })
      }
    })
  } else {
    res.status(400).json({ error: true, message: 'Passwords do not match' })
  }
})

router.post('/signin', function (req, res) {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) throw error

    if (!user) {
      res.status(400).send({ error: true, message: 'Authentication failed. User not found.' })
    } else {
      user.comparePassword(req.body.password, (error, matches) => {
        if (matches && !error) {
          const token = jwt.sign({ user }, config.secret)
          res.json({ success: true, message: 'Token granted', token })
        } else {
          res.status(400).send({ error: true, message: 'Authentication failed. Wrong password.' })
        }
      })
    }
  })
})

module.exports = router
