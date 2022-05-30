const {
  createRecipe,
  getAllRecipes,
  getAllMyRecipes,
} = require("../../models/recipes/recipes.model");
const { addRecipeToUser } = require("../../models/users/users.model");

async function httpGetAllRecipes(req, res) {
  try {
    const response = await getAllRecipes();

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function httpCreateRecipe(req, res) {
  const recipeData = req.body;

  try {
    const response = await createRecipe(recipeData);

    // Add recipe to user recipe array
    await addRecipeToUser(response.createdBy, response._id);

    // TODO: Add recipe to cookbook

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function httpGetAllMyRecipes(req, res) {
  const { userId } = req.body;

  try {
    const recipes = await getAllMyRecipes(userId);

    return res.status(200).json(recipes);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

module.exports = { httpCreateRecipe, httpGetAllRecipes, httpGetAllMyRecipes };
