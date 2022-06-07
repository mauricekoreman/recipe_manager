const cookbooksDatabase = require("./cookbooks.mongo");
const usersDatabase = require("../users/users.mongo");

async function createCookbook(title, createdBy) {
  // TODO: check if this user already has a cookbook with this name

  return await cookbooksDatabase.create({ title, createdBy });
}

async function updateCookbook(cookbookId, title, userId) {
  const cookbook = await cookbooksDatabase.findById(cookbookId);

  if (!cookbook) {
    throw new Error("Cookbook not found");
  }

  const user = await usersDatabase.findById(userId);

  // check for user
  if (!user) {
    throw new Error("User not found");
  }

  // Make sure logged in user matches the owner of the cookbook user.
  if (cookbook.createdBy.toString() !== userId) {
    throw new Error("User not authorized");
  }

  return await cookbooksDatabase.findByIdAndUpdate(cookbookId, { title: title }, { new: true });
}

async function deleteCookbook(cookbookId, userId) {
  const cookbook = await cookbooksDatabase.findById(cookbookId);

  if (!cookbook) {
    throw new Error("Cookbook not found");
  }

  const user = await usersDatabase.findById(userId);

  // check for user
  if (!user) {
    throw new Error("User not found");
  }

  // Make sure logged in user matches the owner of the cookbook user.
  if (cookbook.createdBy.toString() !== userId) {
    throw new Error("User not authorized");
  }

  return await cookbook.remove();
}

async function getCookbooks(userId) {
  return await cookbooksDatabase.find({ createdBy: userId });
}

async function addRecipeToCookbooks(cookbooksArr, recipeId, userId) {
  // const cookbook = await cookbooksDatabase.findById(cookbookId);
  const cookbooks = await cookbooksDatabase.find({ _id: { $in: cookbooksArr } });

  // Check if cookbook exists
  if (!cookbooks) {
    throw new Error("No cookbooks found");
  }

  const user = await usersDatabase.findById(userId);

  // check for user
  if (!user) {
    throw new Error("User not found");
  }

  // Make sure logged in user matches the owner of the cookbook user.
  cookbooks.forEach((cookbook) => {
    if (cookbook.createdBy.toString() !== userId) {
      throw new Error("User not authorized");
    }
  });

  return await cookbooksDatabase.updateMany(
    { _id: { $in: cookbooksArr } },
    { $push: { recipes: recipeId } }
  );
}

async function removeRecipeFromCookbook(cookbookId, recipeId, userId) {
  const cookbook = await cookbooksDatabase.findById(cookbookId);

  // Check if cookbook exists
  if (!cookbook) {
    throw new Error("Cookbook not found");
  }

  const user = await usersDatabase.findById(userId);

  // check for user
  if (!user) {
    throw new Error("User not found");
  }

  // Make sure logged in user matches the owner of the cookbook user.
  if (cookbook.createdBy.toString() !== userId) {
    throw new Error("User not authorized");
  }

  return await cookbooksDatabase.findByIdAndUpdate(
    cookbookId,
    { $pull: { recipes: recipeId } },
    { new: true }
  );
}

async function getCookbookRecipes(cookbookId) {
  const cookbook = await cookbooksDatabase.findById(cookbookId);

  // Check if cookbook exists
  if (!cookbook) {
    throw new Error("Cookbook not found");
  }

  return await cookbooksDatabase.findById(cookbookId).populate("recipes");
}

module.exports = {
  getCookbooks,
  createCookbook,
  updateCookbook,
  deleteCookbook,
  addRecipeToCookbooks,
  removeRecipeFromCookbook,
  getCookbookRecipes,
};
