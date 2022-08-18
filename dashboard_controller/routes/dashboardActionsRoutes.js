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
  [checkAuthentication, checkAccess("user_management")],
  dashboardActionController.addUserToDashboard
);

dashboardActionRouter.post(
  "/remove_user",
  [checkAuthentication, checkAccess("user_management")],
  dashboardActionController.removeUserFromDashboard
);

dashboardActionRouter.post(
  "/change_permissions",
  [checkAuthentication, checkAccess("user_management")],
  dashboardActionController.changePermissions
);

module.exports = dashboardActionRouter;
