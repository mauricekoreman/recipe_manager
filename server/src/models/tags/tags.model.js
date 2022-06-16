const tagsDatabase = require("./tags.mongo");

const { tags } = require("../../data/tags.data");

async function updateTags() {
  await tagsDatabase.findOneAndUpdate({}, tags);
}

async function getAllTags() {
  return await tagsDatabase.find({}, { _id: 0 });
}

module.exports = {
  getAllTags,
  updateTags,
};
