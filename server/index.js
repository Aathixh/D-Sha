const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
require("dotenv").config();
const cors = require("cors");


const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(bodyParser.json());

// Middleware for verifying JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User Authentication
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query("SELECT * FROM Users WHERE username = $1", [
    username,
  ]);
  if (
    user.rows.length > 0 &&
    bcrypt.compareSync(password, user.rows[0].password)
  ) {
    const token = jwt.sign(
      { id: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// Admin Routes
app.post("/admin/addBus", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const { bus_number, capacity } = req.body;
  await pool.query("INSERT INTO Buses (bus_number, capacity) VALUES ($1, $2)", [
    bus_number,
    capacity,
  ]);
  res.send("Bus added successfully");
});

app.post("/admin/addRoute", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const { name, start_stop, end_stop } = req.body;
  await pool.query(
    "INSERT INTO Routes (name, start_stop, end_stop) VALUES ($1, $2, $3)",
    [name, start_stop, end_stop]
  );
  res.send("Route added successfully");
});

app.post("/admin/addBusStop", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const { route_id, stop_name, stop_order } = req.body;
  await pool.query(
    "INSERT INTO BusStops (route_id, stop_name, stop_order) VALUES ($1, $2, $3)",
    [route_id, stop_name, stop_order]
  );
  res.send("Bus stop added successfully");
});

// More routes for CRUD operations, route optimization, real-time monitoring, etc.

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
