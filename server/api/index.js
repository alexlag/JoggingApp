const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const config = require('../config.js')
const database = require('../db/index.js')(mongoose, config)

const app = express()
const passportConfig = require('../passport/index.js')(passport)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())

app.set('appsecret', config.secret)

module.exports = app
