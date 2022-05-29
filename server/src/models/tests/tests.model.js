// const axios = require('axios');

const testsDatabase = require("./tests.mongo");

async function getAllTests() {
  return await testsDatabase.find({}, { _id: 0 });
}

async function createTest(name, siblings, age) {
  return await testsDatabase.create({
    name,
    siblings,
    age,
  });
}

module.exports = {
  getAllTests,
  createTest,
};
