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
  const { user_id } = req.body;
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

  client.query(
    `INSERT INTO userdashboard (dashboard_id, user_id, permissions, access) VALUES ($1, $2, '{}', '{}')`,
    [req.params.id, user_id],
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
};
