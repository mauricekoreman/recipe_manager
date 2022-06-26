const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const clientURL = process.env.CLIENT_URL;

const { createUser, existUserByEmail, updateUser } = require("../../models/users/users.model");
const { getToken, saveToken } = require("../../models/reset-token/reset-token.model");
const { sendEmail } = require("../../utils/sendEmail");
const { hashItem } = require("../../utils/hashItem");

// @desc    Register new user
// @route   POST api/v1/users/register
// @access  Public
async function httpRegisterUser(req, res) {
  const { name, email, password, code } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Please fill in all fields",
    });
  }

  try {
    // Check if secret code is correct
    if (code !== process.env.REGISTER_CODE) {
      return res.status(400).json({
        error: "Wrong code...",
      });
    }

    // Check if user exists
    const userExists = await existUserByEmail(email);

    if (userExists) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await hashItem(password);

    // Create user
    const user = await createUser(name, email, hashedPassword);

    if (user) {
      const userWithToken = Object.assign({}, user._doc, {
        token: generateToken(user._id),
      });

      return res.status(201).json(userWithToken);
    } else {
      return res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: "Something went wrong...",
    });
  }
}

// @desc    Login user
// @route   POST api/v1/users/login
// @access  Public
async function httpLoginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Please fill in all fields",
    });
  }

  try {
    const sanitizedEmail = email.toLowerCase();

    // find if user exists
    const user = await existUserByEmail(sanitizedEmail);

    // Check password
    if (user && (await bcrypt.compare(String(password), user.hashed_password))) {
      const userWithToken = Object.assign({}, user._doc, {
        token: generateToken(user._id),
      });

      return res.status(200).json(userWithToken);
    } else {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Something went wrong...",
    });
  }
}

// @desc    Get user data
// @route   GET api/v1/users/me
// @access  Private
async function httpGetMe(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (e) {
    return res.status(400).json({
      error: "Cannot get user data",
    });
  }
}

// @route   PATCH api/v1/users/me
// @access  private
async function httpUpdateUser(req, res) {
  const { name, newEmail, oldEmail, password } = req.body;
  const userId = req.user.id;

  try {
    // find if user exists
    const user = await existUserByEmail(oldEmail);

    // Check password
    if (user && (await bcrypt.compare(String(password), user.hashed_password))) {
      // Update user!
      const response = await updateUser({ name, email: newEmail }, userId);

      const userWithToken = Object.assign({}, response._doc, {
        token: generateToken(userId),
      });

      return res.status(200).json(userWithToken);
    } else {
      return res.status(400).json({
        error: "Invalid password",
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function httpRequestPasswordReset(req, res) {
  const { email } = req.body;

  try {
    const user = await existUserByEmail(email);
    if (!user) throw new Error("User does not exist");

    // If there is an existing token for this user, delete it
    let token = await getToken(user._id);
    if (token) await token.deleteOne();

    // Create new token, hash it, save it in database
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await hashItem(resetToken);

    await saveToken(user._id, hash, Date.now());

    const link = `${clientURL}/password/reset?token=${resetToken}&id=${user._id}`;
    sendEmail(user.email, "Password Reset Request", {
      heading: "Please click the link below to reset your password! (expires in 1 hour)",
      text: link,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

async function httpResetPassword(req, res) {
  const { userId, token, password } = req.body;

  try {
    let passwordResetToken = await getToken(userId);
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }

    // Check if the token from the user received from requestPasswordReset
    // and the password reset token are equal
    const isValid = await bcrypt.compare(token, passwordResetToken.resetToken);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }

    // hash new user password
    const hash = await hashItem(password);

    // update user object with new password
    const user = await updateUser({ hashed_password: hash }, userId);

    sendEmail(user.email, "Password Reset Successfully", {
      heading: "Password reset successfully!",
    });

    // Delete the reset token again!
    await passwordResetToken.deleteOne();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

// Generate JWT
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = {
  httpRegisterUser,
  httpLoginUser,
  httpGetMe,
  httpUpdateUser,
  httpRequestPasswordReset,
  httpResetPassword,
};
