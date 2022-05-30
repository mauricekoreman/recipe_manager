const express = require("express");

const usersRouter = express.Router();

const { httpLoginUser, httpRegisterUser, httpGetMe } = require("./users.controller");

// middleware
const { protect } = require("../../middleware/authMiddleware");

// /users/
usersRouter.post("/register", httpRegisterUser);
usersRouter.post("/login", httpLoginUser);
usersRouter.get("/me", protect, httpGetMe);


module.exports = usersRouter;
