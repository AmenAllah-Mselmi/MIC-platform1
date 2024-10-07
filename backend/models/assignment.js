const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  DueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor", 
  },
  Attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attachment", 
    },
  ],
  Responses:
  [ 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Response",  
    }
  ],
  department:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
  }
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
