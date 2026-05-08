import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { NutritionProvider } from "./context/NutritionContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NutritionProvider>
      <App />
    </NutritionProvider>
  </BrowserRouter>
);