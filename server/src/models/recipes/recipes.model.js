const recipesDatabase = require("./recipes.mongo");
const usersDatabase = require("../users/users.mongo");

async function createRecipe(recipeData) {
  return await recipesDatabase.create(recipeData);
}

async function getRecipes(userId) {
  return await recipesDatabase.find({ createdBy: userId });
}

async function getAllMyRecipes(id) {
  return await usersDatabase.find({ _id: id }, { recipes: 1 }).populate("recipes");
}

module.exports = { createRecipe, getRecipes, getAllMyRecipes };
