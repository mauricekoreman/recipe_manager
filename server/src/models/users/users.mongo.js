const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    cookbooks: {
      type: [
        {
          id: { type: Number, required: true },
          title: String,
        },
      ],
    },
    recipes: {
      type: [
        {
          img: String,
          title: { type: String, required: true },
          people: { type: Number, required: true },
          ingredients: { type: [String], required: true },
          utensils: { type: [String], required: true },
          tags: {
            kitchen: [String],
            type: [String],
            season: [String],
            diet: [String],
            main: [String],
            course: [String],
          },
          instructions: [String],
          notes: String,
          inCookbooks: [Number],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   hashed_password: {
//     type: String,
//     required: true,
//   },
// });

module.exports = mongoose.model("User", userSchema);
