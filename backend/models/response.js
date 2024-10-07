const mongoose = require('mongoose')

const responsesSchema = new mongoose.Schema({
  // make sure to link the assignment to the response schema
  // and that the responce is unique so that marking on the instructor's end is easier
  // the respoonse should have a status , mark
  // take in consideration providing a client chat service

  Content: {
    type: String,
    required: true
  },
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Response = mongoose.model('Response', responsesSchema)
module.exports = Response
