const http = require("http");

const app = require("./app");
const { mongoConnect } = require("./services/mongo");

const { updateTags } = require("./models/tags/tags.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  // uncomment if you want to update the tags with new data.
  // await updateTags();

  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}...`);
  });
}

startServer();
