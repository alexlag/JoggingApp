const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  distance: {
    type: Number,
    min: 0,
    required: true
  },
  time: {
    type: Number,
    unique: true,
    required: true
  }
})

module.exports = {
  Schema
}
