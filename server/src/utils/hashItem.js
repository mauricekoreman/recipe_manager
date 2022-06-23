const bcrypt = require("bcrypt");

async function hashItem(item) {
  const salt = await bcrypt.genSalt(10);
  const hashedItem = await bcrypt.hash(item, salt);

  return hashedItem;
}

module.exports = { hashItem };
