const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const recordSchema = require('./record.js').Schema

const SALTGEN = 10

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  records: [recordSchema]
})

Schema.pre('save', function (next) {
  const user = this

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(SALTGEN, (error, salt) => {
      if (error) return next(error)

      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error) return next(error)

        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

Schema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (error, matches) => {
    if (error) return callback(error)
    callback(null, matches)
  })
}

module.exports = {
  Schema,
  default: mongoose.model('User', Schema)
}
