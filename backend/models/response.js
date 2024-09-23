const mongoose = require("mongoose");

const responsesSchema = new mongoose.Schema({
  Content: {
    type: String,
    required: true,
  },
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model("Response", responsesSchema);
module.exports = Response;
