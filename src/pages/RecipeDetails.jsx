import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useNutrition } from "../context/NutritionContext";

const nutrientUnits = {
  Energy: "kcal",
  Protein: "g",
  Fat: "g",
  Carbohydrates: "g",
  "Dietary Fiber": "g",
  Iron: "mg",
  Calcium: "mg",
  Magnesium: "mg",
  Sodium: "mg",
  Potassium: "mg",
  Zinc: "mg",
  Copper: "mg",
  Selenium: "mcg",
  "Vitamin A": "mcg",
  "Vitamin C": "mg",
};

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#ec4899",
];

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recommendations } = useNutrition();

  const recipe =
    recommendations.find((r) => String(r.id) === id) ||
    recommendations[Number(id)];

  
  if (!recipe) return null;

  // console.log(recipe);
  
  const nutrition = recipe.nutrition_per_serving || {};

  const topNutrients = [
    "Energy",
    "Protein",
    "Iron",
    "Vitamin C",
    "Calcium",
    "Dietary Fiber",
  ];

  const goalData = Object.entries(
    recipe.goal_score_contribution_pct || {}
  ).map(([name, value]) => ({ name, value }));

  const nutrientData = Object.entries(
    recipe.nutrient_score_contribution_pct || {}
  ).map(([name, value]) => ({ name, value }));

  const ingredientData = Object.entries(
    recipe.ingredient_score_contribution_pct || {}
  ).map(([name, value]) => ({ name, value }));

  const normalize = (value, max) =>
    Math.min(((value || 0) / max) * 100, 100);

  const radarData = [
    { subject: "Protein", A: normalize(nutrition.Protein, 30) },
    { subject: "Iron", A: normalize(nutrition.Iron, 18) },
    { subject: "Vit C", A: normalize(nutrition["Vitamin C"], 90) },
    { subject: "Energy", A: normalize(nutrition.Energy, 500) },
  ];

  const bestGoal = goalData.sort((a, b) => b.value - a.value)[0];
  const bestNutrient = nutrientData.sort((a, b) => b.value - a.value)[0];
  const bestIngredient = ingredientData.sort((a, b) => b.value - a.value)[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <Navbar />

      <section className="max-w-7xl mx-auto px-8 py-16">
        <button
          onClick={() => navigate("/recommendations")}
          className="mb-10 px-6 py-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          ← Back
        </button>

        {/* HERO */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-12 mb-14 border border-emerald-100">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div>
              <p className="text-emerald-600 font-semibold tracking-wide mb-3">
                RECIPE ANALYSIS
              </p>

              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                {recipe.recipe_name}
              </h1>

              <div className="flex gap-3 mb-4 flex-wrap">
                <Badge
                  text={recipe.veg ? "Vegetarian" : "Non-Vegetarian"}
                  color={recipe.veg ? "green" : "red"}
                />

                {recipe.serving && (
                  <Badge text={recipe.serving} color="blue" />
                )}
              </div>

              <p className="text-gray-600 text-lg">
                Personalized nutritional performance breakdown
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-10 py-6 rounded-3xl shadow-xl">
              <p className="text-sm uppercase tracking-wide">
                Match Score
              </p>
              <p className="text-5xl font-bold">
                {(recipe.score || 0).toFixed(1)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {topNutrients.map((key) => (
              <NutritionCard
                key={key}
                title={key}
                value={`${nutrition[key] || 0}`}
              />
            ))}
          </div>
        </div>

        {/* WHY RECOMMENDED */}
        <div className="bg-white rounded-[2rem] shadow-xl p-10 mb-10">
          <h2 className="text-2xl font-bold mb-6">
            Why This Recipe Was Recommended
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <InsightCard
              title="Primary Goal"
              value={bestGoal?.name || "-"}
              subtitle={`${bestGoal?.value?.toFixed(1)}% contribution`}
            />

            <InsightCard
              title="Top Nutrient"
              value={bestNutrient?.name || "-"}
              subtitle={`${bestNutrient?.value?.toFixed(1)}% impact`}
            />

            <InsightCard
              title="Main Ingredient Driver"
              value={bestIngredient?.name || "-"}
              subtitle={`${bestIngredient?.value?.toFixed(1)}% influence`}
            />
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <ChartCard title="Goal Contribution">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={goalData} dataKey="value" label>
                  {goalData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Nutrition Radar">
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* NUTRIENT BAR */}
        <ChartCard title="Nutrient Contribution Analysis">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={nutrientData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {nutrientData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* INGREDIENT CONTRIBUTION */}
        <div className="mt-10">
          <ChartCard title="Ingredient Contribution Analysis">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={ingredientData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {ingredientData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ALLERGENS + INGREDIENTS */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <InfoCard title="Allergens">
            {recipe.allergen_information?.length ? (
              recipe.allergen_information.map((a) => (
                <Tag key={a} text={a} />
              ))
            ) : (
              <p>No known allergens</p>
            )}
          </InfoCard>

          <InfoCard title="Ingredients">
            {ingredientData.length ? (
              ingredientData.map((i) => (
                <Tag
                  key={i.name}
                  text={`${i.name} (${i.value.toFixed(1)}%)`}
                />
              ))
            ) : (
              <p>No ingredient data</p>
            )}
          </InfoCard>
        </div>

        {/* FULL NUTRITION */}
        <div className="mt-12 bg-white rounded-[2rem] shadow-xl p-10">
          <h2 className="text-2xl font-bold mb-8">
            Complete Nutritional Breakdown
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(nutrition).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-50 p-5 rounded-2xl"
              >
                <p className="text-gray-500 text-sm">{key}</p>
                <p className="font-bold text-xl">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function NutritionCard({ title, value }) {
  return (
    <div className="bg-emerald-50 p-6 rounded-2xl">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      {children}
    </div>
  );
}

function InsightCard({ title, value, subtitle }) {
  return (
    <div className="bg-emerald-50 rounded-2xl p-6">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-600 mt-2">{subtitle}</p>
    </div>
  );
}

function Badge({ text, color }) {
  const styles = {
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-4 py-2 rounded-full text-sm ${styles[color]}`}>
      {text}
    </span>
  );
}

function Tag({ text }) {
  return (
    <span className="inline-block bg-gray-100 px-4 py-2 rounded-full mr-2 mb-2">
      {text}
    </span>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-8">
      <h2 className="text-xl font-bold mb-5">{title}</h2>
      {children}
    </div>
  );
}