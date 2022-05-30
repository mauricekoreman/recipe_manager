const {
  createCookbook,
  getAllCookbooks,
  addRecipeToCookbook,
  getMyCookbooks,
} = require("../../models/cookbooks/cookbooks.model");
const { addCookbookToUser } = require("../../models/users/users.model");

async function httpCreateCookbook(req, res) {
  const { title, createdBy } = req.body;

  try {
    const response = await createCookbook(title, createdBy);

    // add cookbook to user
    await addCookbookToUser(response.createdBy, response._id);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function httpGetAllCookbooks(req, res) {
  try {
    const response = await getAllCookbooks();

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function httpAddRecipeToCookbook(req, res) {
  const { recipeId, cookbookId } = req.body;

  try {
    const response = await addRecipeToCookbook(cookbookId, recipeId);

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

async function httpGetMyCookbooks(req, res) {
  try {
    const response = await getMyCookbooks();

    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
}

module.exports = {
  httpCreateCookbook,
  httpGetAllCookbooks,
  httpAddRecipeToCookbook,
  httpGetMyCookbooks,
};
