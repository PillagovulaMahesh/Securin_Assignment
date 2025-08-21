import { useState } from "react";
import Filters from "@/components/Filters";
import RecipeTable from "@/components/RecipeTable";

export default function HomePage() {
  const [filters, setFilters] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🍲 Securin Recipe Explorer
      </h1>

      {/* Filters */}
      <Filters onFilter={setFilters} />

      {/* Recipes Table */}
      <RecipeTable filters={filters} />
    </div>
  );
}
