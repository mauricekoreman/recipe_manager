const express = require("express");

const {
  httpGetCookbooks,
  httpCreateCookbook,
  httpUpdateCookbook,
  httpDeleteCookbook,
  httpAddRecipeToCookbooks,
  httpRemoveRecipeFromCookbooks,
  httpGetCookbookRecipes,
  httpGetCookbookRecipesFiltered,
} = require("./cookbooks.controller");

const cookbooksRouter = express.Router();

const { protect } = require("../../middleware/authMiddleware");

// /cookbooks/
cookbooksRouter.route("/").get(protect, httpGetCookbooks).post(protect, httpCreateCookbook);
cookbooksRouter.route("/addRecipeToCookbooks").patch(protect, httpAddRecipeToCookbooks);
cookbooksRouter.route("/removeRecipeFromCookbooks").patch(protect, httpRemoveRecipeFromCookbooks);
cookbooksRouter
  .route("/:cookbookId")
  .delete(protect, httpDeleteCookbook)
  .patch(protect, httpUpdateCookbook)
  .get(httpGetCookbookRecipes);
cookbooksRouter.route("/:cookbookId/search").get(httpGetCookbookRecipesFiltered);

module.exports = cookbooksRouter;
