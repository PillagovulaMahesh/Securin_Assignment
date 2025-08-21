import { useState, useEffect } from "react";
import RecipeDrawer from "./RecipeDrawer";

export default function RecipeTable({ filters }) {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      let url = "/api/recipes";
      if (filters) {
        const params = new URLSearchParams(filters).toString();
        url = `/api/recipes/search?${params}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.results || data);
    };
    fetchRecipes();
  }, [filters]);

  return (
    <div className="mt-6 bg-white p-4 rounded-2xl shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Cuisine</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">Total Time</th>
            <th className="p-2 border">Calories</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((r, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 cursor-pointer"
              onClick={() => setSelected(r)}
            >
              <td className="p-2 border">{r.title}</td>
              <td className="p-2 border">{r.cuisine}</td>
              <td className="p-2 border">{r.rating}</td>
              <td className="p-2 border">{r.total_time} min</td>
              <td className="p-2 border">
                {r.nutrients?.calories || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Drawer for details */}
      {selected && (
        <RecipeDrawer recipe={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
