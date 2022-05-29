const express = require("express");
const cors = require("cors");
// const morgan = require('morgan'); // TODO: find out what this is?

const v1Router = require("./routes/v1");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", v1Router);

app.get("/", (req, res) => res.send("hello there, Maurice"));

module.exports = app;
