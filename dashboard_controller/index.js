const { Client } = require("pg");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mainRouter = require("./routes");

// dotenv init
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", mainRouter);

// start server on port 3001
app.listen(3001, () => {
  console.log("Server started on port 3001");
});
