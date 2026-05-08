from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, List, Optional
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

from constants import *

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import json

def map_allergen_info(allergen_list):
    mapped = [
        ALLERGY_NAME_MAP[a]
        for a in allergen_list
    ]

    return list(set([a for a in mapped if a is not None]))

df = pd.read_csv("nutrient_file.csv")

import ast


df['main'] = df['main'].apply(json.loads)

df["ingredient"] = df["ingredient"].apply(
    lambda x: json.loads(x) if isinstance(x, str) else {}
)
df["allergen"] = df["allergen"].apply(json.loads)


class UserProfile(BaseModel):
    age: Optional[int] = None
    gender: Optional[str] = None
    weight: Optional[float] = None


class RecommendRequest(BaseModel):
    goals: Dict[str, str]
    deficiencies: List[str]
    diet: str
    meal_type: str
    group_allergies: List[str]
    ingredient_allergies: List[str]
    user_profile: Optional[UserProfile] = None
    
NUTRIENT_NAME_MAP = {
    "Iron": "iron",
    "Calcium": "calcium",
    "Vitamin D": "vitd",
    "Vitamin C": "vitc",
    "Vitamin B9(Folate)": "folate",
    "Zinc": "zinc",
    "Magnesium": "magnesium",
    "Potassium": "potassium",
    "Vitamin A": "vita",
    "Vitamin E": "vite",
    "Protein": "protein",
    "Fiber": "fibre",
    "Sodium (limit)": "sodium",
    "Sugar (limit)": "freesugar"
}

def normalize_weights(nutrient_map: Dict[str, float]) -> Dict[str, float]:
    total = sum(abs(v) for v in nutrient_map.values())
    if total == 0:
        return nutrient_map
    return {k: v / total for k, v in nutrient_map.items()}

def map_deficiencies(def_list: List[str]) -> List[str]:
    return [
        NUTRIENT_NAME_MAP[d]
        for d in def_list
        if d in NUTRIENT_NAME_MAP
    ]
    
def normalize_nutrient_weights(nutrient_map):
    total = sum(abs(v) for v in nutrient_map.values())
    if total == 0:
        return nutrient_map
    return {k: v / total for k, v in nutrient_map.items()}
    
def normalize_goal_importance(goals: dict) -> dict:
    weights = {}

    for g, imp in goals.items():
        w = GOAL_IMPORTANCE_MAP.get(imp, 0)
        if w > 0:
            weights[g] = w

    total = sum(weights.values())

    if total == 0:
        return {}

    return {g: (w / total) * (1 - DEFICIENCY_WEIGHT) for g, w in weights.items()}

def compute_scores(recipe_row, goal_weights, goal_nutrient_map, deficiency_list):

    goal_scores = {}
    nutrient_contrib = {}
    ingredient_contrib = {}

    total_score = 0

    if deficiency_list:
        vals = [recipe_row.get(n, 0) for n in deficiency_list]
        def_score = sum(vals) / len(vals) if vals else 0

        goal_scores["Fulfill Deficiency"] = def_score
        total_score += def_score * DEFICIENCY_WEIGHT

        for n in deficiency_list:
            nutrient_contrib[n] = nutrient_contrib.get(n, 0) + (def_score / len(deficiency_list)) * DEFICIENCY_WEIGHT

    for goal, g_weight in goal_weights.items():

        nutrient_map = normalize_nutrient_weights(goal_nutrient_map[goal])

        g_score = 0
        per_goal_nutrient_score = {}

        for n, w in nutrient_map.items():
            val = recipe_row.get(n, 0)

            g_score += w * val

            contrib_val = val - 1 if n in LIMIT_NUTRIENTS else val

            per_goal_nutrient_score[n] = w * contrib_val

        goal_scores[goal] = g_score
        total_score += g_score * g_weight

        for n, v in per_goal_nutrient_score.items():
            nutrient_contrib[n] = nutrient_contrib.get(n, 0) + v * g_weight

    ing_map = recipe_row["ingredient"]

    for ing, nutrients in ing_map.items():
        score = 0

        for n, pct in nutrients.items():
            if n in nutrient_contrib:
                score += (pct / 100) * nutrient_contrib[n]

        if score > 0:
            ingredient_contrib[ing] = score

    def normalize_pct(d):
        s = sum(d.values())
        if s == 0:
            return {k: 0 for k in d}
        return {k: (v / s) * 100 for k, v in d.items()}

    return {
        "total_score": total_score,
        "goal_score_contribution_pct": normalize_pct({
            g: goal_scores[g] * (DEFICIENCY_WEIGHT if g == "Fulfill Deficiency" else goal_weights.get(g, 0))
            for g in goal_scores
        }),
        "nutrient_score_contribution_pct": normalize_pct(nutrient_contrib),
        "ingredient_score_contribution_pct": normalize_pct(ingredient_contrib)
    }
    
def build_nutrition_per_serving(row, nutrient_map):
    result = {}

    for col, display_name in nutrient_map.items():
        val = row.get(col, None) / 3 * 100

        if val is not None:
            result[display_name] = round(val, 2)

    return result
    
def build_filter_info(row, req):
    reasons = []

    if req.diet == "Veg" and row.get("veg", 1) == 0:
        reasons.append("Non Veg")

    row_allergens_values = set(row.get("allergen", []))
    row_allergens_values.discard(None)

    input_allergens = set(req.group_allergies + req.ingredient_allergies)

    matched = row_allergens_values.intersection(input_allergens)

    for a in matched:
        reasons.append(f"Allergy: {a}")

    reasons = list(set(reasons))

    return {
        "filtered": len(reasons) > 0,
        "reasons": reasons
    }

@app.post("/recommend")
def recommend(req: RecommendRequest):

    goal_weights = normalize_goal_importance(req.goals)

    deficiency_codes = [
        NUTRIENT_NAME_MAP[d]
        for d in req.deficiencies
        if d in NUTRIENT_NAME_MAP
    ]

    results = []

    for _, row in df.iterrows():

        scores = compute_scores(
            row,
            goal_weights,
            GOAL_NUTRIENT_MAP,
            deficiency_codes
        )

        results.append({
            "recipe_name": row["recipe"],
            "score": scores["total_score"],
            "main_ingredients": row["main"],
            "serving_size": row["serving"],
            "weight_per_serving_g": row["amount"],
            "nutrition_per_serving": build_nutrition_per_serving(
                row,
                NUTRIENT_DISPLAY_MAP
            ),
            "allergen_information": row["allergen"],
            "goal_score_contribution_pct": scores["goal_score_contribution_pct"],
            "nutrient_score_contribution_pct": scores["nutrient_score_contribution_pct"],
            "ingredient_score_contribution_pct": scores["ingredient_score_contribution_pct"],
            "filter_info": build_filter_info(row, req),
            "veg": (row.get("veg", 1) != 0)
        })

    results = sorted(results, key=lambda x: x["score"], reverse=True)
    
    non_filtered = [r for r in results if not r["filter_info"]["filtered"]]

    top_non_filtered = non_filtered[:TARGET_NON_FILTERED]

    print(top_non_filtered[:1])
    return top_non_filtered[:20]