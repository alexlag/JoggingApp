const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { default: Record, Schema: RecordSchema } = require('./record.js')

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
  records: [RecordSchema]
})

const EDIT_FIELDS = ['date', 'distance', 'time']

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

Schema.methods.findRecord = function (id) {
  return this.records.id(id)
}

Schema.methods.addRecord = function (params, callback) {
  const { date, distance, time } = params
  const newRecord = new Record({
    date, distance, time
  })
  const error = newRecord.validateSync()
  if (error) {
    callback(error, null)
  } else {
    this.records.push(newRecord)
    callback(null, this)
  }
}

Schema.methods.removeRecord = function (id, callback) {
  this.records.pull(id)
}

Schema.methods.updateRecord = function (id, params, callback) {
  const record = this.findRecord(id)
  if (record) {
    EDIT_FIELDS.forEach(field => params[field] && record.set(field, params[field]))
    callback(null, this)
  } else {
    callback(new Error('Record not found'), null)
  }
}

module.exports = {
  Schema,
  default: mongoose.model('User', Schema)
}
