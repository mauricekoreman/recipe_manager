const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  img: String,
  title: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  ingredients: [String],
  utensils: [String],
  tags: [String],
  instructions: [String],
  notes: String,
  imageFileName: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);
