const mongoose = require("mongoose");

const cookbookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  recipes: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Recipe",
  },
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Cookbook", cookbookSchema);
