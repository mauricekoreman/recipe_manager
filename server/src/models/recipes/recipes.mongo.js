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
  tags: {
    kitchen: {
      type: [String],
    },
    type: {
      type: [String],
    },
    season: {
      type: [String],
    },
    diet: {
      type: [String],
    },
    main: {
      type: [String],
    },
    course: {
      type: [String],
    },
  },
  instructions: [String],
  notes: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);
