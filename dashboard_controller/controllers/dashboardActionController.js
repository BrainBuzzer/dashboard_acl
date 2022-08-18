const { Client } = require("pg");
const checkValidity = require("../utils/permissionValidity");
require("dotenv").config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});
client.connect();

/**
 * Get the specific dashboard of the user by ID.
 * @param {*} req
 * @param {*} res
 */
exports.getDashboardById = (req, res) => {
  res.status(200).json({
    id: req.dashboard.id,
    name: req.dashboard.name,
    created_at: req.dashboard.created_at,
  });
};

/**
 * Add a user to a dashboard.
 * @param {*} req
 * @param {*} res
 */
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

  const valid = checkValidity(permissions, access);

  if (valid) {
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

/**
 * Delete a user from a dashboard.
 * @param {*} req
 * @param {*} res
 */
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

/**
 * Change the permissions of a user in a dashboard.
 * @param {*} req
 * @param {*} res
 */
exports.changePermissions = (req, res) => {
  let { permissions, access } = req.body;
  const valid = checkValidity(permissions, access);

  if (valid) {
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

/**
 * Change the name of a dashboard.
 * @param {*} req
 * @param {*} res
 */
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
