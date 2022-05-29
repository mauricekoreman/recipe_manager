const express = require("express");

const { httpGetAllTags } = require("./tags.controller");

const tagsRouter = express.Router();

// tags/
tagsRouter.get("/", httpGetAllTags);

module.exports = tagsRouter;
