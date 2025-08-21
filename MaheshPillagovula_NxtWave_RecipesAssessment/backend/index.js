const express = require("express");
const cors = require("cors");
require("dotenv").config();

const recipeRoutes = require("./routes/recipes");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/recipes", recipeRoutes);

// Root endpoint (useful to check if server is alive)
app.get("/", (req, res) => {
  res.json({ message: "🚀 Securin Recipe API is running!" });
});

// Local server (Vercel ignores listen, but it works locally)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`✅ Backend running at http://localhost:${port}`);
  });
}

// Export for Vercel
module.exports = app;
