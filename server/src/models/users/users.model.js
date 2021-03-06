const usersDatabase = require("./users.mongo");

async function createUser(name, email, hashed_password) {
  return await usersDatabase.create({
    name,
    email,
    hashed_password,
  });
}

async function existUserByEmail(email) {
  return await usersDatabase.findOne({ email }, { __v: 0 });
}

async function existUserById(id) {
  return await usersDatabase.findById(id, { hashed_password: 0, __v: 0 });
}

async function updateUser(userdata, userId) {
  return await usersDatabase.findByIdAndUpdate(userId, userdata, { new: true });
}

module.exports = {
  createUser,
  existUserByEmail,
  existUserById,
  updateUser,
};
