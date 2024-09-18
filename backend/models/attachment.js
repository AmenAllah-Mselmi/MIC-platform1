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
});

export default attachementSchema;