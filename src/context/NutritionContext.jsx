import { createContext, useContext, useState } from "react";
import axios from "axios";

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState({
    goals: {},
    deficiencies: [],
    diet: "",
    meal_type: "",
    group_allergies: [],
    ingredient_allergies: [],
    user_profile: {
      age: "",
      gender: "",
      weight: "",
    },
  });

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);

      // Clean payload
      const payload = {
        ...userPreferences,
        user_profile: {
          age: userPreferences.user_profile.age
            ? Number(userPreferences.user_profile.age)
            : null,
          gender: userPreferences.user_profile.gender || null,
          weight: userPreferences.user_profile.weight
            ? Number(userPreferences.user_profile.weight)
            : null,
        },
      };
      console.log(payload)
      const response = await axios.post(
        "http://localhost:8000/recommend",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRecommendations(response.data);
      console.log(response.data)
      return response.data;

    } catch (err) {
      console.error("Recommendation API Error:", err);

      setError(
        err.response?.data?.detail ||
        "Failed to generate recommendations"
      );

      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <NutritionContext.Provider
      value={{
        userPreferences,
        setUserPreferences,
        recommendations,
        setRecommendations,
        generateRecommendations,
        loading,
        error,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => useContext(NutritionContext);