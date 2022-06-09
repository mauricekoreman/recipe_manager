const express = require("express");

const { httpCreateRecipe, httpGetRecipes } = require("./recipes.controller");

const recipesRouter = express.Router();

const { protect } = require("../../middleware/authMiddleware");

// /recipes/
recipesRouter.route("/").get(protect, httpGetRecipes).post(protect, httpCreateRecipe);

module.exports = recipesRouter;
