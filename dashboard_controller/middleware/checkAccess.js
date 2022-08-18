const dotenv = require("dotenv");
const { Client } = require("pg");
dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});
client.connect();

const checkAccess = (req, res, next) => {
  // check dashboard with id from param
  client
    .query(`SELECT * FROM dashboards WHERE id = $1`, [req.params.id])
    .then((dashboard) => {
      if (dashboard.rows.length === 0) {
        res.status(404).json({
          message: "Dashboard not found.",
        });
      } else if (dashboard.rows[0].user_id === req.user.id) {
        req.dashboard = dashboard.rows[0];
        next();
      } else {
        // check if user is in dashboard
        client
          .query(
            `SELECT * FROM userdashboard WHERE dashboard_id = $1 AND user_id = $2`,
            [req.params.id, req.user.id]
          )
          .then((userdashboard) => {
            if (userdashboard.rows.length === 0) {
              res.status(403).json({
                message: "User not authorized to access dashboard.",
              });
            } else {
              req.dashboard = dashboard.rows[0];
              next();
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    });
};

module.exports = checkAccess;
