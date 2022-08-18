const express = require("express");
const dashboardActionRouter = express.Router({
  mergeParams: true,
});
const dashboardActionController = require("../controllers/dashboardActionController");
const checkAuthentication = require("../middleware/checkAuth");
const checkAccess = require("../middleware/checkAccess");

dashboardActionRouter.get(
  "/",
  [checkAuthentication, checkAccess],
  dashboardActionController.getDashboardById
);

dashboardActionRouter.post(
  "/change_dashboard_name",
  [checkAuthentication, checkAccess],
  dashboardActionController.changeDashboardName
);

dashboardActionRouter.post(
  "/add_user",
  [checkAuthentication, checkAccess],
  dashboardActionController.addUserToDashboard
);

module.exports = dashboardActionRouter;
