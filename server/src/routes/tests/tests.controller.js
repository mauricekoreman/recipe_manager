const { getAllTests, createTest } = require("../../models/tests/tests.model");

async function httpGetAllTests(req, res) {
  const tests = await getAllTests();
  return res.status(200).json(tests);
}

async function httpAddTest(req, res) {
  const { name, siblings, age } = req.body;

  try {
    const test = await createTest(name, siblings, age);

    if (test) {
      return res.status(200).json(test);
    } else {
      return res.status(400).json({
        error: "Couldnt create test",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: error,
    });
  }
}

module.exports = {
  httpGetAllTests,
  httpAddTest,
};
