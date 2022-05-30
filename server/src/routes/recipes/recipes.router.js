const express = require("express");

const {
  httpCreateRecipe,
  httpGetAllRecipes,
  httpGetAllMyRecipes,
} = require("./recipes.controller");

const recipesRouter = express.Router();

// /recipes/
recipesRouter.get("/", httpGetAllRecipes);
recipesRouter.get("/myRecipes", httpGetAllMyRecipes);
recipesRouter.post("/createRecipe", httpCreateRecipe);

module.exports = recipesRouter;
