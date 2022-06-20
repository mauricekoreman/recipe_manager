const cookbooksDatabase = require("./cookbooks.mongo");

async function createCookbook(title, createdBy) {
  // Check if this user already has a cookbook with this name
  const cookbook = await cookbooksDatabase.findOne({ createdBy: createdBy, title: title });

  // If cookbook already exists, return an error
  if (cookbook) {
    throw new Error("Cookbook with this name already exists");
  }

  return await cookbooksDatabase.create({ title, createdBy });
}

async function updateCookbook(cookbookId, title, userId) {
  const cookbook = await cookbooksDatabase.findById(cookbookId);

  if (!cookbook) {
    throw new Error("Cookbook not found");
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

async function removeRecipeFromCookbooks(cookbooksArr, recipeId, userId) {
  const cookbooks = await cookbooksDatabase.find({ _id: { $in: cookbooksArr } });

  // Check if cookbook exists
  if (!cookbooks) {
    throw new Error("No cookbooks found");
  }

  // Make sure logged in user matches the owner of the cookbook user.
  cookbooks.forEach((cookbook) => {
    if (cookbook.createdBy.toString() !== userId) {
      throw new Error("User not authorized");
    }
  });

  return await cookbooksDatabase.updateMany(
    { _id: { $in: cookbooksArr } },
    { $pull: { recipes: recipeId } }
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

async function getCookbookRecipesFiltered(cookbookId, tagItems) {
  const cookbook = await cookbooksDatabase.findById(cookbookId);

  if (!cookbook) {
    throw new Error("Cookbook not found");
  }

  return await cookbooksDatabase.findById(cookbookId).populate({
    path: "recipes",
    match: { tags: { $all: tagItems.split(",") } },
  });
}

async function getCookbooksWithRecipe(recipeId) {
  return await cookbooksDatabase.find({ recipes: recipeId }, { _id: 1 });
}

module.exports = {
  getCookbooks,
  createCookbook,
  updateCookbook,
  deleteCookbook,
  addRecipeToCookbooks,
  removeRecipeFromCookbooks,
  getCookbookRecipes,
  getCookbookRecipesFiltered,
  getCookbooksWithRecipe,
};
