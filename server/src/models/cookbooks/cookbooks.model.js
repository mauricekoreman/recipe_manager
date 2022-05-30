const cookbooksDatabase = require("./cookbooks.mongo");
const usersDatabase = require("../users/users.mongo");

async function createCookbook(title, createdBy) {
  // TODO: check if this user already has a cookbook with this name

  return await cookbooksDatabase.create({ title, createdBy });
}

async function getAllCookbooks() {
  return await cookbooksDatabase.find({});
}

async function addRecipeToCookbook(cookbookId, recipeId) {
  return await cookbooksDatabase.updateOne({ _id: cookbookId }, { $push: { recipes: recipeId } });
}

async function getMyCookbooks() {
  // get all cookbook ID's from my user
  return await usersDatabase.find({}, { cookbooks: 1 }).populate("cookbooks");
}

module.exports = { getAllCookbooks, createCookbook, addRecipeToCookbook, getMyCookbooks };
