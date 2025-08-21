export default function RecipeDrawer({ recipe, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end">
      <div className="w-full md:w-1/3 bg-white h-full p-6 overflow-y-auto shadow-xl rounded-l-2xl">
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-3 py-1 rounded mb-4"
        >
          Close
        </button>

        <h2 className="text-2xl font-bold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 italic mb-4">{recipe.description}</p>

        <h3 className="font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc pl-5 mb-4">
          {recipe.ingredients &&
            recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>

        <h3 className="font-semibold mb-2">Instructions</h3>
        <ol className="list-decimal pl-5 mb-4">
          {recipe.instructions &&
            recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
        </ol>

        <h3 className="font-semibold mb-2">Nutrients</h3>
        <pre className="bg-gray-100 p-3 rounded">
          {JSON.stringify(recipe.nutrients, null, 2)}
        </pre>
      </div>
    </div>
  );
}
