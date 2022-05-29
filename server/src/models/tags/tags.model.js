const tagsDatabase = require("./tags.mongo");

async function getAllTags() {
  return await tagsDatabase.find({}, { _id: 0 });
}

module.exports = {
  getAllTags,
};
