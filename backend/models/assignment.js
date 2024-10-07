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
    ref: 'Department'
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
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session', // Référence au modèle Session
    required: true, // Un assignment doit être lié à une session
    unique: true // Garantit que chaque assignment appartient à une seule session
  }
})

const Assignment = mongoose.model('Assignment', assignmentSchema)
module.exports = Assignment
