const express = require("express");

const testsRouter = require("./tests/tests.router");
const tagsRouter = require("./tags/tags.router");
const usersRouter = require("./users/users.router");

const v1 = express.Router();

v1.use("/tests", testsRouter);
v1.use("/tags", tagsRouter);
v1.use("/users", usersRouter);

module.exports = v1;
