const {
  createCookbook,
  getCookbooks,
  updateCookbook,
  deleteCookbook,
  addRecipeToCookbooks,
  removeRecipeFromCookbooks,
  getCookbookRecipes,
  getCookbookRecipesFiltered,
} = require("../../models/cookbooks/cookbooks.model");

// @route   POST /api/cookbooks/
// @access  private
async function httpCreateCookbook(req, res) {
  const { title } = req.body;
  const createdBy = req.user.id;

  try {
    if (!title) {
      throw new Error("Please add title");
    }

    const response = await createCookbook(title, createdBy);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   PATCH /api/cookbooks/:id
// @access  private
async function httpUpdateCookbook(req, res) {
  try {
    const cookbookId = req.params.cookbookId;
    const title = req.body.title;
    const userId = req.user.id;

    const updatedCookbook = await updateCookbook(cookbookId, title, userId);

    return res.status(200).json(updatedCookbook);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   DELETE /api/cookbooks/:id
// @access  private
async function httpDeleteCookbook(req, res) {
  try {
    const cookbookId = req.params.cookbookId;
    const userId = req.user.id;

    await deleteCookbook(cookbookId, userId);

    // TODO: Now the cookbook must also be deleted from user cookbooks

    return res.status(200).json({ id: cookbookId });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   GET /api/cookbooks/
// @access  private
async function httpGetCookbooks(req, res) {
  try {
    const response = await getCookbooks(req.user.id);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   PATCH /api/cookbooks/addRecipeToCookbooks
// @access  private
async function httpAddRecipeToCookbooks(req, res) {
  const { cookbooks, recipeId } = req.body;
  const userId = req.user.id;

  try {
    const response = await addRecipeToCookbooks(cookbooks, recipeId, userId);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   PATCH /api/cookbooks/removeRecipeFromCookbooks
// @access  private
async function httpRemoveRecipeFromCookbooks(req, res) {
  const { cookbooks, recipeId } = req.body;
  const userId = req.user.id;

  try {
    const response = await removeRecipeFromCookbooks(cookbooks, recipeId, userId);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   GET /api/cookbooks/:id/
// @access  Public
async function httpGetCookbookRecipes(req, res) {
  const { cookbookId } = req.params;

  try {
    const response = await getCookbookRecipes(cookbookId);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   GET /api/cookbooks/:id/search
// @access  Public
async function httpGetCookbookRecipesFiltered(req, res) {
  const { cookbookId } = req.params;
  const { tags } = req.query;

  try {
    const response = await getCookbookRecipesFiltered(cookbookId, tags);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

module.exports = {
  httpCreateCookbook,
  httpGetCookbooks,
  httpUpdateCookbook,
  httpDeleteCookbook,
  httpAddRecipeToCookbooks,
  httpRemoveRecipeFromCookbooks,
  httpGetCookbookRecipes,
  httpGetCookbookRecipesFiltered,
};
