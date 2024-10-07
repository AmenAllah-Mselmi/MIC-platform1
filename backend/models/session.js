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
    ref: 'Instructor',
    required: true // Ensures that a session must have an instructor
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: false, // A session may not have an assignment
    unique: true // Ensures that a session can have only one assignment
  },
  DepartementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department', // Ensure this matches the model name exactly
    required: true // Ensures that a session must belong to a department
  },
  Date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Session = mongoose.model('Session', sessionSchema)
module.exports = Session
