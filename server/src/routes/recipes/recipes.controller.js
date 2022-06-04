const { createRecipe, getRecipes, getAllMyRecipes } = require("../../models/recipes/recipes.model");
const { addRecipeToUser } = require("../../models/users/users.model");

// @route   GET /api/recipes/
// @access  private
async function httpGetRecipes(req, res) {
  try {
    const response = await getRecipes(req.user.id);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   POST /api/recipes/
// @access  private
async function httpCreateRecipe(req, res) {
  const recipeData = req.body;
  const createdBy = req.user.id;

  try {
    if (!recipeData.title || !recipeData.servings) {
      throw new Error("Please fill in all required fields");
    }

    Object.assign(recipeData, {
      createdBy: createdBy,
    });

    const response = await createRecipe(recipeData);

    // Add recipe to user recipe array
    // await addRecipeToUser(createdBy, response._id);

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

module.exports = { httpCreateRecipe, httpGetRecipes, httpGetAllMyRecipes };
