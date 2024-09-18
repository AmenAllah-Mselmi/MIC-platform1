import mongoose from "mongoose";
import attachementSchema from "./attachment.js";
import responsesSchema from "./response.js";

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
  Attachments: [attachementSchema],
  Responses: [responsesSchema],
});

const Assignement = mongoose.model("Assignment", assignmentSchema);
export default Assignement;
