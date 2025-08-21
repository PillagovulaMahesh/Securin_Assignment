const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. from Supabase / Neon / Railway
  ssl: { rejectUnauthorized: false } // needed for hosted DBs
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Securin Recipe API is running 🚀" });
});

// Get paginated recipes sorted by rating (desc)
app.get("/api/recipes", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 15;
    const offset = (page - 1) * size;

    const result = await pool.query(
      "SELECT * FROM recipes ORDER BY rating DESC LIMIT $1 OFFSET $2",
      [size, offset]
    );

    res.json({
      page,
      size,
      results: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Search with filters
app.get("/api/recipes/search", async (req, res) => {
  try {
    let query = "SELECT * FROM recipes WHERE 1=1";
    let values = [];
    let count = 1;

    if (req.query.title) {
      query += ` AND LOWER(title) LIKE $${count++}`;
      values.push(`%${req.query.title.toLowerCase()}%`);
    }
    if (req.query.cuisine) {
      query += ` AND LOWER(cuisine) = $${count++}`;
      values.push(req.query.cuisine.toLowerCase());
    }
    if (req.query.rating) {
      query += ` AND rating >= $${count++}`;
      values.push(req.query.rating);
    }
    if (req.query.total_time) {
      query += ` AND total_time <= $${count++}`;
      values.push(req.query.total_time);
    }
    if (req.query.calories) {
      query += ` AND (nutrients->>'calories')::int <= $${count++}`;
      values.push(req.query.calories);
    }

    query += " ORDER BY rating DESC LIMIT 50"; // max limit for safety

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

// Start server (local dev only)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
}

module.exports = app; 
