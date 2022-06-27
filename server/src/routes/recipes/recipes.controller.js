const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getRecipesWithFilter,
} = require("../../models/recipes/recipes.model");
const {
  getCookbooksWithRecipe,
  addRecipeToCookbooks,
  removeRecipeFromCookbooks,
} = require("../../models/cookbooks/cookbooks.model");

const cloudinary = require("../../services/cloudinary.config");

// @route   GET /api/recipes/
// @access  private
async function httpGetRecipes(req, res) {
  const userId = req.user.id;

  const titleSearch = req.query.title || "";

  try {
    const response = await getRecipes(userId, titleSearch);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   GET /api/recipes/search
// @access  private
async function httpGetRecipesByFilter(req, res) {
  const userId = req.user.id;
  const { tags } = req.query;

  try {
    const response = await getRecipesWithFilter(userId, tags);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   GET /api/recipes/:recipeId
// @access  public
async function httpGetRecipeById(req, res) {
  const { recipeId } = req.params;

  try {
    const response = await getRecipeById(recipeId);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   POST /api/recipes/
// @access  private
async function httpCreateRecipe(req, res) {
  const createdBy = req.user.id;
  const recipeData = JSON.parse(req.body.recipeData);
  const cookbooks = JSON.parse(req.body.cookbooks);

  try {
    if (!recipeData.title || !recipeData.servings) {
      throw new Error("Please fill in all required fields");
    }

    let imageRes;
    if (req.file) {
      imageRes = await cloudinary.uploader.upload(req.file.path, {
        folder: createdBy,
        public_id: req.file.filename,
        format: "webp",
      });
    }

    Object.assign(recipeData, {
      createdBy: createdBy,
      img: imageRes.secure_url || recipeData.img,
      imageFileName: imageRes.public_id || null,
    });

    const response = await createRecipe(recipeData);

    // Add recipe to cookbooks
    await addRecipeToCookbooks(cookbooks, response._id, createdBy);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   PATCH /api/recipes/:recipeId
// @access  private
async function httpUpdateRecipe(req, res) {
  const { recipeId } = req.params;
  const currentUser = req.user.id;
  const recipeData = JSON.parse(req.body.recipeData); // TODO: add error handling.
  const cookbooks = JSON.parse(req.body.cookbooks);

  const newImage = req.file;
  const oldImageFileName = recipeData.imageFileName;

  try {
    // Only the owner of the recipe can alter the recipe itself
    if (recipeData.createdBy !== currentUser) {
      throw new Error("Not authorized to edit this recipe");
    }

    if (!recipeData.title || !recipeData.servings) {
      throw new Error("Please fill in all required fields");
    }

    // Als gebruiker gebruiker de image wil verwijderen
    if (!newImage && recipeData.img === "") {
      oldImageFileName && (await cloudinary.uploader.destroy(oldImageFileName));
      Object.assign(recipeData, {
        imageFileName: "",
      });
    }
    // Als de gebruiker een nieuwe image wil uploaden
    else if (newImage) {
      imageRes = await cloudinary.uploader.upload(newImage.path, {
        folder: currentUser,
        public_id: newImage.filename,
        format: "webp",
      });
      oldImageFileName && cloudinary.uploader.destroy(oldImageFileName);
      Object.assign(recipeData, {
        img: imageRes.url,
        imageFileName: imageRes.public_id,
      });
    }

    const response = await updateRecipe(recipeId, recipeData);

    // 1. check what cookbooks the recipe is in right now
    const serverCookbooks = await getCookbooksWithRecipe(recipeId).then((res) =>
      res.map((cookbook) => cookbook._id.toString())
    );

    // 2. what cookbooks are in cookbooks that are NOT in cookbooksWithRecipeArr
    const newCookbooks = cookbooks.filter((cookbook) => !serverCookbooks.includes(cookbook));
    await addRecipeToCookbooks(newCookbooks, recipeId, currentUser);

    // 3. what cookbooks are in cookbooksWithRecipeArr that are NOT in cookbooks
    const removedCookbooks = serverCookbooks.filter((cookbook) => !cookbooks.includes(cookbook));
    await removeRecipeFromCookbooks(removedCookbooks, recipeId, currentUser);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

// @route   DELETE /api/recipes/:recipeId
// @access  private
async function httpDeleteRecipe(req, res) {
  const { recipeId } = req.params;
  const currentUser = req.user.id;

  try {
    const response = await deleteRecipe(recipeId, currentUser);

    // Delete the recipe image from cloudinary storage
    if (response.imageFileName) {
      await cloudinary.uploader.destroy(response.imageFileName);
    }

    // Find the cookbooks that the recipe is in
    const cookbooks = await getCookbooksWithRecipe(recipeId);

    // turn cookbooks into array of id's
    const cookbooksIdArr = cookbooks.map((cookbook) => cookbook._id);

    // Delete recipe from recipe list in cookbooks
    await removeRecipeFromCookbooks(cookbooksIdArr, recipeId, currentUser);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

module.exports = {
  httpGetRecipes,
  httpGetRecipesByFilter,
  httpGetRecipeById,
  httpCreateRecipe,
  httpUpdateRecipe,
  httpDeleteRecipe,
};
