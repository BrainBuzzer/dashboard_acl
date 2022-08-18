// dotenv
require("dotenv").config();

// init postgres connection
const { Client } = require("pg");
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
client.connect();

function closeClient() {
  console.log("server is starting cleanup");
  return client
    .end()
    .then(() => console.log("client has disconnected"))
    .catch((err) => console.error("error during disconnection", err.stack));
}

// initialize uuid extension in postgres
client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`, (err, _res) => {
  if (err) {
    console.log(err);
  }
});

// create users table with id as uuid primary key
client.query(
  `CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`,
  (err, _res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("users table created");
    }
  }
);

// create dashboards table with id as uuid primary key and name
client.query(
  `CREATE TABLE IF NOT EXISTS dashboards (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
)`,
  (err, _res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("dashboards table created");
    }
  }
);

// connnect last two tables to create a many to many relationship
client.query(
  `CREATE TABLE IF NOT EXISTS userdashboard (
  user_id UUID NOT NULL,
  dashboard_id UUID NOT NULL,
  permissions VARCHAR(255)[] NOT NULL,
  access VARCHAR(255)[] NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, dashboard_id)
)`,
  (err, _res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("userdashboard table created");
      closeClient();
    }
  }
);
