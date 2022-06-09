const express = require("express");

const tagsRouter = require("./tags/tags.router");
const usersRouter = require("./users/users.router");
const recipesRouter = require("./recipes/recipes.router");
const cookbooksRouter = require("./cookbooks/cookbooks.router");

const v1 = express.Router();

v1.use("/tags", tagsRouter);
v1.use("/users", usersRouter);
v1.use("/recipes", recipesRouter);
v1.use("/cookbooks", cookbooksRouter);

module.exports = v1;
