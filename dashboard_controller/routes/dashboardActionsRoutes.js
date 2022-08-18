const express = require("express");
const dashboardActionRouter = express.Router({
  mergeParams: true,
});
const dashboardActionController = require("../controllers/dashboardActionController");
const checkAuthentication = require("../middleware/checkAuth");
const checkAccess = require("../middleware/checkAccess");

dashboardActionRouter.get(
  "/",
  [checkAuthentication, checkAccess("read")],
  dashboardActionController.getDashboardById
);

dashboardActionRouter.post(
  "/change_dashboard_name",
  [checkAuthentication, checkAccess("name_change")],
  dashboardActionController.changeDashboardName
);

dashboardActionRouter.post(
  "/add_user",
  [checkAuthentication, checkAccess("add_user")],
  dashboardActionController.addUserToDashboard
);

module.exports = dashboardActionRouter;
