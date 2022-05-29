const express = require("express");

const { httpGetAllTests, httpAddTest } = require("./tests.controller");

const testsRouter = express.Router();

// tests/
testsRouter.get("/", httpGetAllTests);
testsRouter.post("/addTest", httpAddTest);

module.exports = testsRouter;
