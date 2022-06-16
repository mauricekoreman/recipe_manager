const recipesDatabase = require("./recipes.mongo");

async function getRecipes(userId, queryText) {
  return await recipesDatabase.find({
    createdBy: userId,
    title: { $regex: `${queryText}`, $options: "i" },
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
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
