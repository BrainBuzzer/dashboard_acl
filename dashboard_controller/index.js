const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mainRouter = require("./routes");
const morgan = require("morgan");

// dotenv init
dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", mainRouter);

// start server on port 3001
app.listen(3001, () => {
  console.log("Dashboard server started on port 3001");
});
