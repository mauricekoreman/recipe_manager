const jwt = require("jsonwebtoken");

const { existUserById } = require("../models/users/users.model");

async function protect(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await existUserById(decoded.id);

      next();
    } catch (error) {
      return res.status(401).json({
        error: "Not authorized",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      error: "Not authorized, no token",
    });
  }
}

module.exports = { protect };
