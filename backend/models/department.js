const mongoose = require('mongoose')

const { Schema } = mongoose

// User Schema
const DepartmentSchema = new Schema({
  DepartmentName: {
    type: String,
    enum: ['Basic', 'Intermediate', 'Advanced' , 'Mariem Department Attention!!!!!'],
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
      ref: 'Session'
    }
  ],
  assignments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment'
    }
  ]
})

// User model
const department = mongoose.model('department', DepartmentSchema)

module.exports = { department }
