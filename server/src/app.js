const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
// const morgan = require('morgan'); // TODO: find out what this is?

const v1Router = require("./routes/v1");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", v1Router);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../", "../", "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

module.exports = app;
