const express = require("express");

const {
  httpGetCookbooks,
  httpCreateCookbook,
  httpUpdateCookbook,
  httpDeleteCookbook,
  httpAddRecipeToCookbooks,
  httpRemoveRecipeFromCookbook,
  httpGetCookbookRecipes,
} = require("./cookbooks.controller");

const cookbooksRouter = express.Router();

const { protect } = require("../../middleware/authMiddleware");

// /cookbooks/
cookbooksRouter.route("/").get(protect, httpGetCookbooks).post(protect, httpCreateCookbook);
cookbooksRouter.route("/addRecipeToCookbooks").patch(protect, httpAddRecipeToCookbooks);
cookbooksRouter.route("/:cookbookId").delete(protect, httpDeleteCookbook).patch(protect, httpUpdateCookbook).get(httpGetCookbookRecipes);
// cookbooksRouter.route('/:cookbookId/recipes').get(httpGetCookbookRecipes);
cookbooksRouter.route("/:cookbookId/removeRecipe/:recipeId").patch(protect, httpRemoveRecipeFromCookbook);


// cookbooksRouter.route('/:id/recipe/:recipeId').delete(protect, httpDeleteRecipeFromCookbook).post(protect, httpAddRecipeToCookbook);

module.exports = cookbooksRouter;
