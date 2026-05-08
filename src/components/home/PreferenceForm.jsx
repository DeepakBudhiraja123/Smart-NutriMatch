import { useNutrition } from "../../context/NutritionContext";
import { useNavigate } from "react-router-dom";

const goalsList = [
  "Improve Iron Levels",
  "Boost Immunity",
  "High Protein Diet",
  "Weight Loss (Calorie Control)",
  "Heart Health",
  "Bone Health",
  "Diabetes / Blood Sugar Control",
  "Muscle Gain",
  "Digestive Health",
  "Skin & Vision Health",
];

const goalValues = ["None", "Low", "Medium", "High"];

const deficienciesList = [
  "Iron",
  "Calcium",
  "Vitamin D",
  "Vitamin C",
  "Vitamin B9 (Folate)",
  "Zinc",
  "Magnesium",
  "Potassium",
  "Vitamin A",
  "Vitamin E",
  "Protein",
  "Fiber",
  "Sodium (limit)",
  "Sugar (limit)",
];

const groupAllergiesList = [
  "Dairy",
  "Egg",
  "Poultry",
  "Red meat",
  "Fish",
  "Shellfish",
  "Seafood",
  "Nuts and Seeds",
  "Sugar",
  "Oils and Fats",
];

const ingredientAllergiesList = [
  "Peanut",
  "Tree nuts",
  "Gluten",
  "Soy",
  "Lactose",
  "Garlic",
  "Onion",
  "Mustard",
  "Sesame",
  "Mushroom",
];

export default function PreferenceForm() {
  const navigate = useNavigate();

  const {
    userPreferences,
    setUserPreferences,
    generateRecommendations,
  } = useNutrition();

  const toggleArrayItem = (field, item) => {
    const list = userPreferences[field] || [];

    setUserPreferences({
      ...userPreferences,
      [field]: list.includes(item)
        ? list.filter((i) => i !== item)
        : [...list, item],
    });
  };

  const updateGoal = (goal, value) => {
    setUserPreferences({
      ...userPreferences,
      goals: {
        ...userPreferences.goals,
        [goal]: value,
      },
    });
  };

  const updateField = (field, value) => {
    setUserPreferences({
      ...userPreferences,
      [field]: value,
    });
  };

  const updateProfile = (field, value) => {
    setUserPreferences({
      ...userPreferences,
      user_profile: {
        ...userPreferences.user_profile,
        [field]: value,
      },
    });
  };

  const handleSubmit = async () => {
    const result = await generateRecommendations();

    if (result) {
      navigate("/loading");
    }
  };

  const renderChips = (items, field, color) => (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const selected = userPreferences[field]?.includes(item);

        return (
          <button
            key={item}
            type="button"
            onClick={() => toggleArrayItem(field, item)}
            className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
              selected
                ? `${color} text-white shadow-lg`
                : "bg-white border border-gray-300 hover:border-emerald-500"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );

  return (
    <section className="relative max-w-7xl mx-auto bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl p-12 mb-24 border border-emerald-100 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-emerald-600 font-semibold tracking-wide">
            PERSONALIZED NUTRITION
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mt-2">
            Build Your Nutrition Profile
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            Configure your goals, deficiencies, allergies and health profile
            to unlock intelligent personalized nutrition recommendations.
          </p>
        </div>

        {/* Goals */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">Health Goals</h3>

          <div className="grid md:grid-cols-2 gap-5">
            {goalsList.map((goal) => (
              <div
                key={goal}
                className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 flex justify-between items-center"
              >
                <span className="font-medium">{goal}</span>

                <select
                  value={userPreferences.goals?.[goal] || "None"}
                  onChange={(e) => updateGoal(goal, e.target.value)}
                  className="border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {goalValues.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Deficiencies */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">
            Nutritional Deficiencies
          </h3>

          {renderChips(
            deficienciesList,
            "deficiencies",
            "bg-emerald-600"
          )}
        </div>

        {/* Diet + Meal */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">

          {/* Diet */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Diet Type</h3>

            <div className="flex gap-4 flex-wrap">
              {["Veg", "Non Veg"].map((diet) => (
                <button
                  key={diet}
                  type="button"
                  onClick={() => updateField("diet", diet)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    userPreferences.diet === diet
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 hover:border-blue-500"
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Meal */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Meal Type</h3>

            <div className="flex gap-4 flex-wrap">
              {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => updateField("meal_type", meal)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                    userPreferences.meal_type === meal
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 hover:border-purple-500"
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Group Allergies */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">
            Group Allergies
          </h3>

          {renderChips(
            groupAllergiesList,
            "group_allergies",
            "bg-orange-500"
          )}
        </div>

        {/* Ingredient Allergies */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">
            Ingredient Allergies
          </h3>

          {renderChips(
            ingredientAllergiesList,
            "ingredient_allergies",
            "bg-red-500"
          )}
        </div>

        {/* Profile */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">
            Optional User Profile
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            <input
              type="number"
              placeholder="Age"
              value={userPreferences.user_profile.age}
              onChange={(e) =>
                updateProfile("age", e.target.value)
              }
              className="w-full border p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500"
            />

            <select
              value={userPreferences.user_profile.gender}
              onChange={(e) =>
                updateProfile("gender", e.target.value)
              }
              className="w-full border p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Gender</option>
              <option>male</option>
              <option>female</option>
            </select>

            <input
              type="number"
              placeholder="Weight (kg)"
              value={userPreferences.user_profile.weight}
              onChange={(e) =>
                updateProfile("weight", e.target.value)
              }
              className="w-full border p-4 rounded-2xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-5 rounded-2xl text-lg font-semibold hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
        >
          Generate Personalized Recommendations
        </button>

      </div>
    </section>
  );
}