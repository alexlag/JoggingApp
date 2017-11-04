const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')

const logger = require('morgan')

const config = require('../config.js')

const app = express()

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// DB setup
require('../db/index.js')(mongoose, config)

// Passport setup
require('../passport/index.js')(passport)
app.use(passport.initialize())

app.use('/users', require('./auth.js'))

module.exports = app
