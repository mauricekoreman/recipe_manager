const express = require("express");

const {
  httpGetAllCookbooks,
  httpCreateCookbook,
  httpAddRecipeToCookbook,
  httpGetMyCookbooks,
} = require("./cookbooks.controller");

const cookbooksRouter = express.Router();

// /cookbooks/
cookbooksRouter.get("/", httpGetAllCookbooks);
cookbooksRouter.get("/myCookbooks", httpGetMyCookbooks);
cookbooksRouter.post("/createCookbook", httpCreateCookbook);
cookbooksRouter.post("/addRecipeToCookbook", httpAddRecipeToCookbook);

module.exports = cookbooksRouter;
