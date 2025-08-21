const fs = require("fs");
const path = require("path");
const pool = require("../db/connect");

async function insertRecipes() {
  try {
    // Load JSON file
    const filePath = path.join(__dirname, "..", "US_recipes.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const recipes = JSON.parse(rawData);

    let inserted = 0;

    // Loop through recipes and insert
    for (let key in recipes) {
      const r = recipes[key];

      await pool.query(
        `INSERT INTO recipes
          (continent, country_state, cuisine, title, url, rating, total_time, prep_time, cook_time, description, ingredients, instructions, nutrients, serves)
         VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
         ON CONFLICT (title) DO NOTHING`,
        [
          r.Contient || null,
          r.Country_State || null,
          r.cuisine || null,
          r.title || null,
          r.URL || null,
          r.rating || null,
          r.total_time || null,
          r.prep_time || null,
          r.cook_time || null,
          r.description || null,
          JSON.stringify(r.ingredients || []),
          JSON.stringify(r.instructions || []),
          JSON.stringify(r.nutrients || {}),
          r.serves || null
        ]
      );

      inserted++;
    }

    console.log(`✅ Inserted ${inserted} recipes successfully`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting recipes:", err.message);
    process.exit(1);
  }
}

insertRecipes();
