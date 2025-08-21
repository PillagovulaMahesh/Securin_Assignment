import { useState } from "react";
import Head from "next/head";
import Filters from "@/components/Filters";
import RecipeTable from "@/components/RecipeTable";

export default function HomePage() {
  const [filters, setFilters] = useState(null);

  return (
    <>
      <Head>
        <title>🍲 Securin Recipe Explorer</title>
        <meta name="description" content="Explore delicious US recipes with filters" />
        {/* ✅ Pointing favicon to styles folder */}
        <link rel="icon" href="/styles/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          🍲 Securin Recipe Explorer
        </h1>

        {/* Filters */}
        <Filters onFilter={setFilters} />

        {/* Recipes Table */}
        <RecipeTable filters={filters} />
      </div>
    </>
  );
}
