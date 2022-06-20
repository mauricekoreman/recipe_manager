const express = require("express");

const usersRouter = express.Router();

const {
  httpLoginUser,
  httpRegisterUser,
  httpGetMe,
  httpUpdateUser,
} = require("./users.controller");

// middleware
const { protect } = require("../../middleware/authMiddleware");

// /users/
usersRouter.post("/register", httpRegisterUser);
usersRouter.post("/login", httpLoginUser);
usersRouter.route("/me").get(protect, httpGetMe).patch(protect, httpUpdateUser);


module.exports = usersRouter;
