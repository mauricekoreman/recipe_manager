const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUser, existUserByEmail, updateUser } = require("../../models/users/users.model");

// @desc    Register new user
// @route   POST api/v1/users/register
// @access  Public
async function httpRegisterUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Please fill in all fields",
    });
  }

  try {
    const sanitizedEmail = email.toLowerCase();

    // Check if user exists
    const userExists = await existUserByEmail(sanitizedEmail);

    if (userExists) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await createUser(name, sanitizedEmail, hashedPassword);

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
  const userData = req.body;
  const userId = req.user.id;

  try {
    const response = await updateUser(userData, userId);

    const userWithToken = Object.assign({}, response._doc, {
      token: generateToken(userId),
    });

    return res.status(200).json(userWithToken);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// Generate JWT
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

module.exports = { httpRegisterUser, httpLoginUser, httpGetMe, httpUpdateUser };
