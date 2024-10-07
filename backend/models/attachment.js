const mongoose = require("mongoose");

const 
attachmentSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
  },
  Session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session", 
  },
  Assignement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
  },
});

const Attachment = mongoose.model("Attachment", attachmentSchema);
module.exports = Attachment;
