const express = require("express");

const {
  httpGetRecipes,
  httpGetRecipesByFilter,
  httpGetRecipeById,
  httpCreateRecipe,
  httpUpdateRecipe,
  httpDeleteRecipe,
  httpUploadImage,
} = require("./recipes.controller");

const recipesRouter = express.Router();

const { protect } = require("../../middleware/authMiddleware");
const parser = require("../../middleware/cloudinary.config");

// /recipes/
recipesRouter
  .route("/")
  .get(protect, httpGetRecipes)
  .post(protect, parser.single("img"), httpCreateRecipe);

recipesRouter.route("/image/:recipeId").post(protect, parser.single("img"), httpUploadImage);

recipesRouter.route("/search").get(protect, httpGetRecipesByFilter);

recipesRouter
  .route("/:recipeId")
  .get(httpGetRecipeById)
  .patch(protect, parser.single("img"), httpUpdateRecipe)
  .delete(protect, httpDeleteRecipe);

module.exports = recipesRouter;
