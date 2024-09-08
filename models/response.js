import mongoose from "mongoose";

const responsesSchema = new mongoose.Schema({
  Content: {
    type: String,
    required: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default responsesSchema;