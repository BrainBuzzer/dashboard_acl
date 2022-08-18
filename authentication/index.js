const { Client } = require("pg");
const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

// dotenv init
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
});
client.connect();

// create endpoint for signup and login
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  client.query(
    `INSERT INTO users (id, name, email, password, created_at) VALUES (uuid_generate_v4(), $1, $2, $3, NOW())`,
    [name, email, hash],
    (err, _res) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong.",
        });
      } else {
        res.status(200).json({
          message: "User created. Please login.",
        });
      }
    }
  );
});

// create endpoint for login using jwt
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  client.query(`SELECT * FROM users WHERE email = $1`, [email], (err, _res) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong.",
      });
    } else {
      const user = _res.rows[0];
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { id: user.id, name: user.name, email: user.email },
          process.env.JWT_SECRET
        );
        res.status(200).json({
          token,
          message: "Successfully logged in",
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    }
  });
});

// listen to app on port 3000
app.listen(3000, () => {
  console.log("listening on port 3000");
});
