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
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment', // Référence au modèle Assignment
    required: false, // Une session doit avoir un assignment
    unique: true // Garantit qu'une session ne peut avoir qu'un seul assignment
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
