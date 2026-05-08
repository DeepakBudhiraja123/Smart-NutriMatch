import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useNutrition } from "../context/NutritionContext";
import { useNavigate } from "react-router-dom";

export default function Recommendations() {
  const { recommendations } = useNutrition();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-16">
        <button
          onClick={() => navigate("/")}
          className="mb-10 px-6 py-3 bg-white shadow-md rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer font-medium text-gray-700"
        >
          ← Back to Profile
        </button>

        <div className="mb-14 text-center">
          <p className="text-emerald-600 font-semibold mb-3">
            PERSONALIZED RESULTS
          </p>

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Recommended Meals For You
          </h1>

          <p className="text-gray-600 text-lg">
            AI-curated meals based on your health profile
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
          {recommendations?.map((recipe, index) => {
            const ingredients =
              typeof recipe.main_ingredients === "string"
                ? JSON.parse(recipe.main_ingredients.replace(/'/g, '"'))
                : recipe.main_ingredients || [];

            const allergens =
              typeof recipe.allergen_information === "string"
                ? JSON.parse(recipe.allergen_information.replace(/'/g, '"'))
                : recipe.allergen_information || [];

            const nutrition = recipe.nutrition_per_serving || {};

            return (
              <div
                key={recipe.id || index}
                className="bg-white rounded-3xl shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 border border-emerald-100"
              >
                <div className="p-7">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                        {recipe.recipe_name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Personalized nutrition match
                      </p>
                    </div>

                    <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-2xl font-semibold shadow-md">
                      {(recipe.score || 0).toFixed(1)}
                    </span>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      Main Ingredients
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((item, i) => (
                        <span
                          key={i}
                          className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nutrition */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <NutritionBox
                      title="Energy"
                      value={`${nutrition.Energy || 0}`}
                      color="bg-emerald-50"
                    />
                    <NutritionBox
                      title="Protein"
                      value={`${nutrition.Protein || 0}`}
                      color="bg-blue-50"
                    />
                    <NutritionBox
                      title="Iron"
                      value={`${nutrition.Iron || 0}`}
                      color="bg-orange-50"
                    />
                    <NutritionBox
                      title="Vitamin C"
                      value={`${nutrition["Vitamin C"] || 0}`}
                      color="bg-yellow-50"
                    />
                  </div>

                  {/* Serving */}
                  <div className="flex justify-between text-gray-600 mb-5 text-sm border-t border-gray-100 pt-4">
                    <span>
                      Serving:{" "}
                      <span className="font-semibold text-gray-800">
                        {recipe.serving_size || "N/A"}
                      </span>
                    </span>

                    <span>
                      {recipe.weight_per_serving_g || 0}g
                    </span>
                  </div>

                  {/* Allergens */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2 font-medium">
                      Allergens
                    </p>

                    {allergens.length === 0 ? (
                      <span className="text-emerald-600 font-semibold">
                        Allergy Safe
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        {allergens.join(", ")}
                      </span>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() =>
                      navigate(`/recipe/${recipe.id || index}`)
                    }
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    View Recommendation Insights
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function NutritionBox({ title, value, color }) {
  return (
    <div className={`${color} p-4 rounded-2xl`}>
      <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
        {title}
      </p>
      <p className="font-bold text-lg text-gray-900">{value}</p>
    </div>
  );
}