const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  },
  Assignment:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment'
    },
  Date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

const Session = mongoose.model('Session', sessionSchema)
module.exports = Session
