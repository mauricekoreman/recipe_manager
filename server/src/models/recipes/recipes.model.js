const recipesDatabase = require("./recipes.mongo");

async function getRecipes(userId, queryText) {
  return await recipesDatabase.find({
    createdBy: userId,
    title: { $regex: `${queryText}`, $options: "i" },
  });
}

async function getRecipesWithFilter(userId, tags) {
  // TODO: if there are no tags, give back the cookbook recipes. => should be handled in the front-end right?

  return await recipesDatabase.find({
    createdBy: userId,
    tags: { $all: tags.split(",") },
  });
}

async function getRecipeById(recipeId) {
  return await recipesDatabase.findById(recipeId, { __v: 0 });
}

async function createRecipe(recipeData) {
  return await recipesDatabase.create(recipeData);
}

async function updateRecipe(recipeId, recipeData) {
  return await recipesDatabase.findByIdAndUpdate(recipeId, recipeData, { new: true });
}

async function deleteRecipe(recipeId, userId) {
  const recipe = await getRecipeById(recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }

  if (recipe.createdBy.toString() !== userId) {
    throw new Error("You're not authorized to delete this recipe");
  }

  return await recipe.remove();
}

module.exports = {
  getRecipes,
  getRecipesWithFilter,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
