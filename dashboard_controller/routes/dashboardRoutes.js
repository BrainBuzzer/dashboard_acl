const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");
const checkAuthentication = require("../middleware/checkAuth");

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
dashboardRouter.get(
  "/:id",
  checkAuthentication,
  dashboardController.getDashboardById
);

module.exports = dashboardRouter;
