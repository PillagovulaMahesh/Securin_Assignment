const express = require("express");
const pool = require("../db/connect");

const router = express.Router();

/**
 * @route   GET /api/recipes
 * @desc    Get paginated recipes sorted by rating
 */
router.get("/", async (req, res) => {
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
    console.error("Error fetching recipes:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * @route   GET /api/recipes/search
 * @desc    Search recipes with filters
 */
router.get("/search", async (req, res) => {
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

    query += " ORDER BY rating DESC LIMIT 50";

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error searching recipes:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
