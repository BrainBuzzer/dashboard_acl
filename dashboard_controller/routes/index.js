const express = require("express");
const dashboardRouter = require("./dashboardRoutes");

const mainRouter = express.Router();

mainRouter.use("/dashboard", dashboardRouter);

module.exports = mainRouter;
