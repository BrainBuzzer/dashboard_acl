const permissionsConst = require("../constants/permissions");
const accessConst = require("../constants/access");
const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});
client.connect();

exports.getDashboardById = (req, res) => {
  res.status(200).json({
    id: req.dashboard.id,
    name: req.dashboard.name,
    created_at: req.dashboard.created_at,
  });
};

exports.addUserToDashboard = (req, res) => {
  let { user_id, permissions, access } = req.body;
  // check if user id exists in users table
  client.query(
    "SELECT * FROM users WHERE id = $1",
    [user_id],
    (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      } else {
        if (response.rows.length === 0) {
          res.status(404).json({
            message: "User not found.",
          });
        }
      }
    }
  );

  // verify permissions
  let validPermissions = true;
  if (permissions && permissions.length > 0) {
    permissions.includes("read") || permissions.push("read");
    permissions.forEach((permission) => {
      if (!permissionsConst.hasOwnProperty(permission)) {
        validPermissions = false;
      }
    });
  } else {
    permissions = ["read"];
  }

  // verify access
  let validAccess = true;
  if (access && access.length > 0) {
    access.forEach((access) => {
      if (!accessConst.hasOwnProperty(access)) {
        validAccess = false;
      }
    });
  } else {
    access = [];
  }

  if (validPermissions && validAccess) {
    client.query(
      `INSERT INTO userdashboard (dashboard_id, user_id, permissions, access) VALUES ($1, $2, $3, $4)`,
      [req.params.id, user_id, permissions, access],
      (err, _res) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        } else {
          res.status(200).json({
            message: "User added to dashboard.",
          });
        }
      }
    );
  } else {
    res.status(400).json({
      message: "Invalid permissions or access.",
    });
  }
};

exports.removeUserFromDashboard = (req, res) => {
  client.query(
    `DELETE FROM userdashboard WHERE user_id = $1 AND dashboard_id = $2`,
    [req.params.user_id, req.params.id],
    (err, _res) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      } else {
        res.status(200).json({
          message: "User removed from dashboard.",
        });
      }
    }
  );
};

exports.changePermissions = (req, res) => {
  let { permissions, access } = req.body;
  // verify permissions
  let validPermissions = true;
  if (permissions && permissions.length > 0) {
    permissions.includes("read") || permissions.push("read");
    permissions.forEach((permission) => {
      if (!permissionsConst.hasOwnProperty(permission)) {
        validPermissions = false;
      }
    });
  } else {
    permissions = ["read"];
  }

  // verify access
  let validAccess = true;
  if (access && access.length > 0) {
    access.forEach((access) => {
      if (!accessConst.hasOwnProperty(access)) {
        validAccess = false;
      }
    });
  } else {
    access = [];
  }

  if (validPermissions && validAccess) {
    client.query(
      `UPDATE userdashboard SET permissions = $1, access = $2 WHERE user_id = $3 AND dashboard_id = $4`,
      [permissions, access, req.params.user_id, req.params.id],
      (err, _res) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        } else {
          res.status(200).json({
            message: "Permissions changed.",
          });
        }
      }
    );
  } else {
    res.status(400).json({
      message: "Invalid permissions or access.",
    });
  }
};

exports.changeDashboardName = (req, res) => {
  const { name } = req.body;
  client.query(
    `UPDATE dashboards SET name = $1 WHERE id = $2`,
    [name, req.params.id],
    (err, _res) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Dashboard name updated.",
        });
      }
    }
  );
};
