const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  kitchen: {
    type: [String],
    required: true,
  },
  type: {
    type: [String],
    required: true,
  },
  season: {
    type: [String],
    required: true,
  },
  diet: {
    type: [String],
    required: true,
  },
  main: {
    type: [String],
    required: true,
  },
  course: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
