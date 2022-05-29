const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  siblings: {
    type: [String],
  },
  age: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Test", testSchema);
