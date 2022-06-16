const express = require("express");

const {
  httpGetRecipes,
  httpGetRecipeById,
  httpCreateRecipe,
  httpUpdateRecipe,
  httpDeleteRecipe,
} = require("./recipes.controller");

const recipesRouter = express.Router();

const { protect } = require("../../middleware/authMiddleware");

// /recipes/
recipesRouter
  .route("/")
  .get(protect, httpGetRecipes)
  .post(protect, httpCreateRecipe);
recipesRouter
  .route("/:recipeId")
  .get(httpGetRecipeById)
  .patch(protect, httpUpdateRecipe)
  .delete(protect, httpDeleteRecipe);

module.exports = recipesRouter;
