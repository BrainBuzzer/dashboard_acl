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

/**
 * Create a new dashboard for the user.
 * @param {*} req
 * @param {*} res
 */
exports.createDashboard = (req, res) => {
  const { name } = req.body;
  client.query(
    `INSERT INTO dashboards (id, name, user_id, created_at) VALUES (uuid_generate_v4(), $1, $2, NOW())`,
    [name, req.user.id],
    (err, _res) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Dashboard created.",
        });
      }
    }
  );
};

/**
 * Get all dashboards for the user.
 * @param {*} req
 * @param {*} res
 */
exports.getAllDashboards = (req, res) => {
  client.query(
    `SELECT * FROM dashboards WHERE user_id = $1`,
    // TODO: add the dashboards which user is just part of.
    [req.user.id],
    (err, response) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      } else {
        res.status(200).json({
          dashboards: response.rows.map((dashboard) => {
            return {
              id: dashboard.id,
              name: dashboard.name,
              created_at: dashboard.created_at,
            };
          }),
        });
      }
    }
  );
};
