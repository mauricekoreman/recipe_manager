const resetTokenDatabase = require("./reset-token.mongo");

async function getToken(userId) {
  return await resetTokenDatabase.findOne({ userId: userId });
}

async function saveToken(userId, resetToken, createdAt) {
  return await resetTokenDatabase.create({
    userId,
    resetToken,
    createdAt,
  });
}

module.exports = {
  getToken,
  saveToken,
};
