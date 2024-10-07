const mongoose = require('mongoose')

const { Schema } = mongoose

// User Schema
const DepartmentSchema = new Schema({
  DepartmentName: {
    type: String,
    enum: ['Basic', 'Intermediate', 'Advanced'],
    required: true
  },
  instructors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor'
    }
  ],
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'session'
    },
  ],
  Members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    }
  ],
  Assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment'
    }
  ],
})

// User model
const department = mongoose.model('department', DepartmentSchema)

module.exports = { department }
