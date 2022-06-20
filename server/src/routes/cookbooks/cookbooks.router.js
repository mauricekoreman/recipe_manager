const express = require("express");

const {
  httpGetCookbooks,
  httpCreateCookbook,
  httpUpdateCookbook,
  httpDeleteCookbook,
  httpGetCookbookRecipes,
  httpGetCookbookRecipesFiltered,
  httpGetCookbooksWithRecipe,
} = require("./cookbooks.controller");

const cookbooksRouter = express.Router();

const { protect } = require("../../middleware/authMiddleware");

// /cookbooks/
cookbooksRouter.route("/").get(protect, httpGetCookbooks).post(protect, httpCreateCookbook);
cookbooksRouter.route("/withRecipe/:recipeId").get(httpGetCookbooksWithRecipe);
cookbooksRouter
  .route("/:cookbookId")
  .delete(protect, httpDeleteCookbook)
  .patch(protect, httpUpdateCookbook)
  .get(httpGetCookbookRecipes);
cookbooksRouter.route("/:cookbookId/search").get(httpGetCookbookRecipesFiltered);

module.exports = cookbooksRouter;
