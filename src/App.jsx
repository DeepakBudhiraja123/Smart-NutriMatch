import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recommendations from "./pages/Recommendations";
import Loading from "./pages/Loading";
import RecipeDetails from "./pages/RecipeDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  );
}