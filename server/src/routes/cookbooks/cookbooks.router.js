const express = require("express");

const {
  httpGetCookbooks,
  httpCreateCookbook,
  httpUpdateCookbook,
  httpDeleteCookbook,
  httpAddRecipeToCookbooks,
  httpRemoveRecipeFromCookbook,
  httpGetCookbookRecipes,
  httpGetCookbookRecipesFiltered,
} = require("./cookbooks.controller");

const cookbooksRouter = express.Router();

const { protect } = require("../../middleware/authMiddleware");

// /cookbooks/
cookbooksRouter.route("/").get(protect, httpGetCookbooks).post(protect, httpCreateCookbook);
cookbooksRouter.route("/addRecipeToCookbooks").patch(protect, httpAddRecipeToCookbooks);
cookbooksRouter
  .route("/:cookbookId")
  .delete(protect, httpDeleteCookbook)
  .patch(protect, httpUpdateCookbook)
  .get(httpGetCookbookRecipes);
cookbooksRouter.route("/:cookbookId/search").get(httpGetCookbookRecipesFiltered);
cookbooksRouter.route("/:cookbookId/removeRecipe/:recipeId").patch(protect, httpRemoveRecipeFromCookbook);

module.exports = cookbooksRouter;
