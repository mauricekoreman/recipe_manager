const express = require("express");

const { httpCreateRecipe, httpGetRecipes, httpGetAllMyRecipes } = require("./recipes.controller");

const recipesRouter = express.Router();

const { protect } = require("../../middleware/authMiddleware");

// /recipes/
recipesRouter.route("/").get(protect, httpGetRecipes).post(protect, httpCreateRecipe);

recipesRouter.get("/myRecipes", httpGetAllMyRecipes);
recipesRouter.post("/createRecipe", httpCreateRecipe);

module.exports = recipesRouter;
