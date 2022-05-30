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
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Cookbook",
    },
    recipes: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Recipe",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
