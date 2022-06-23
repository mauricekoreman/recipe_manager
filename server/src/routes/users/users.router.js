const express = require("express");

const usersRouter = express.Router();

const {
  httpLoginUser,
  httpRegisterUser,
  httpGetMe,
  httpUpdateUser,
  httpRequestPasswordReset,
  httpResetPassword,
} = require("./users.controller");

// middleware
const { protect } = require("../../middleware/authMiddleware");

// /users/
usersRouter.route("/register").post(httpRegisterUser);
usersRouter.route("/login").post(httpLoginUser);
usersRouter.route("/me").get(protect, httpGetMe).patch(protect, httpUpdateUser);

usersRouter.route("/password/requestResetPassword").post(httpRequestPasswordReset);
usersRouter.route("/password/resetPassword").post(httpResetPassword);



module.exports = usersRouter;
