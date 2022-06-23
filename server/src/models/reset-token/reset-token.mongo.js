const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "User",
  },
  resetToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600, // time in seconds
  },
});

module.exports = mongoose.model("ResetToken", resetTokenSchema);
