const recipesDatabase = require("./recipes.mongo");

async function createRecipe(recipeData) {
  return await recipesDatabase.create(recipeData);
}

async function getRecipes(userId) {
  return await recipesDatabase.find({ createdBy: userId });
}

async function getRecipeById(recipeId) {
  return await recipesDatabase.findById(recipeId);
}

async function updateRecipe(recipeId, recipeData) {
  return await recipesDatabase.findByIdAndUpdate(recipeId, recipeData, { new: true });
}

module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe };
