const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipesWithFilter,
} = require("../../models/recipes/recipes.model");
const {
  removeRecipeFromCookbooks,
  getCookbooksWithRecipe,
} = require("../../models/cookbooks/cookbooks.model");

// @route   GET /api/recipes/
// @access  private
async function httpGetRecipes(req, res) {
  const userId = req.user.id;

  const titleSearch = req.query.title || "";

  try {
    const response = await getRecipes(userId, titleSearch);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   GET /api/recipes/search
// @access  private
async function httpGetRecipesByFilter(req, res) {
  const userId = req.user.id;
  const { tags } = req.query;

  try {
    const response = await getRecipesWithFilter(userId, tags);

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

    const response = await createRecipe(recipeData);

    // TODO: Add recipe to cookbook here instead of front-end.

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

// @route   DELETE /api/recipes/:recipeId
// @access  private
async function httpDeleteRecipe(req, res) {
  const { recipeId } = req.params;
  const currentUser = req.user.id;

  try {
    const response = await deleteRecipe(recipeId, currentUser);

    // Find the cookbooks that the recipe is in
    const cookbooks = await getCookbooksWithRecipe(recipeId);

    // turn cookbooks into array of id's
    const cookbooksIdArr = cookbooks.map((cookbook) => cookbook._id);

    // Delete recipe from recipe list in cookbooks
    await removeRecipeFromCookbooks(cookbooksIdArr, recipeId, currentUser);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

module.exports = {
  httpGetRecipes,
  httpGetRecipesByFilter,
  httpGetRecipeById,
  httpCreateRecipe,
  httpUpdateRecipe,
  httpDeleteRecipe,
};
