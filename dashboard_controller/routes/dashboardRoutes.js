const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");
const checkAuthentication = require("../middleware/checkAuth");
const dashboardAcionRouter = require("./dashboardActionsRoutes");

dashboardRouter.post(
  "/create",
  checkAuthentication,
  dashboardController.createDashboard
);
dashboardRouter.get(
  "/all",
  checkAuthentication,
  dashboardController.getAllDashboards
);
dashboardRouter.use("/:id", dashboardAcionRouter);

module.exports = dashboardRouter;
