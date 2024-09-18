import mongoose from "mongoose";

const attachementSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
  },
  Instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor", 
  },
  Session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session", 
  },
  Assignement:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Assignment'
  }
});
const Attachement = mongoose.model("Attachement", attachementSchema);
export default Attachement;