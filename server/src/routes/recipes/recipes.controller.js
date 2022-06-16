const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
} = require("../../models/recipes/recipes.model");

const mongoose = require("mongoose");

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

// @route   GET /api/recipes/:recipeId
// @access  public
async function httpGetRecipeById(req, res) {
  const { recipeId } = req.params;

  try {
    const response = await getRecipeById(recipeId);

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

    // Create objectID
    const response = await createRecipe(recipeData);

    // TODO: Add recipe to cookbook

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   PATCH /api/recipes/:recipeId
// @access  private
async function httpUpdateRecipe(req, res) {
  const recipeData = req.body;

  const { recipeId } = req.params;
  const currentUser = req.user.id;

  // check if there is a createdBy in the recipeData. If not: create one.
  if (!recipeData.createdBy) {
    Object.assign(recipeData, {
      createdBy: currentUser,
    });
  }

  try {
    // Only the owner of the recipe can alter the recipe itself
    if (recipeData.createdBy !== currentUser) {
      throw new Error("Not authorized to edit this recipe");
    }

    if (!recipeData.title || !recipeData.servings) {
      throw new Error("Please fill in all required fields");
    }

    const response = await updateRecipe(recipeId, recipeData);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

module.exports = { httpCreateRecipe, httpGetRecipes, httpGetRecipeById, httpUpdateRecipe };
