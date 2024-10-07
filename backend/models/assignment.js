const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  DueDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  Instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  },
  DepartementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'department'
  },
  Attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attachment'
    }
  ],
  Response: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Response'
  }
})

const Assignment = mongoose.model('Assignment', assignmentSchema)
module.exports = Assignment
