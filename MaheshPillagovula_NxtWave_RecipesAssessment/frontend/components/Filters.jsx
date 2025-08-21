import { useState } from "react";

export default function Filters({ onFilter }) {
  const [title, setTitle] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [rating, setRating] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ title, cuisine, rating, total_time: totalTime, calories });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-2 md:grid-cols-5 gap-3 bg-white p-4 rounded-2xl shadow"
    >
      <input
        type="text"
        placeholder="Search title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="text"
        placeholder="Cuisine"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="number"
        placeholder="Min Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="number"
        placeholder="Max Time (min)"
        value={totalTime}
        onChange={(e) => setTotalTime(e.target.value)}
        className="border rounded p-2"
      />
      <input
        type="number"
        placeholder="Max Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        className="border rounded p-2"
      />

      <button
        type="submit"
        className="col-span-2 md:col-span-5 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </form>
  );
}
