const { getAllTags } = require("../../models/tags/tags.model");

async function httpGetAllTags(req, res) {
  const tags = await getAllTags();
  return res.status(200).json(tags);
}

module.exports = {
  httpGetAllTags,
};
