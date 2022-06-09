const recipesDatabase = require("./recipes.mongo");

async function createRecipe(recipeData) {
  return await recipesDatabase.create(recipeData);
}

async function getRecipes(userId) {
  return await recipesDatabase.find({ createdBy: userId });
}

module.exports = { createRecipe, getRecipes };
