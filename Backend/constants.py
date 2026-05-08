GOAL_NUTRIENT_MAP = {
    "Improve Iron Levels": {
        "iron": 1.0,
        "vitc": 0.5,
        "folate": 0.3,
        "calcium": -0.3
    },
    "Boost Immunity": {
        "vitc": 1.0,
        "zinc": 0.7,
        "vite": 0.5,
        "vita": 0.5,
        "protein": 0.3
    },
    "High Protein Diet": {
        "protein": 1.0,
        "freesugar": 0.5,
        "sfa": 0.3
    },
    "Weight Loss (Calorie Control)": {
        "energy": -1.0,
        "fibre": 0.7,
        "protein": 0.5,
        "freesugar": 0.7,
        "fat": -0.3
    },
    "Heart Health": {
        "sfa": 1.0,
        "cholesterol": 0.7,
        "mufa": 0.5,
        "pufa": 0.5,
        "fibre": 0.5,
        "potassium": 0.3
    },
    "Bone Health": {
        "calcium": 1.0,
        "vitd3": 0.7,
        "phosphorus": 0.5,
        "magnesium": 0.3,
        "protein": 0.3
    },
    "Diabetes / Blood Sugar Control": {
        "freesugar": 1.0,
        "fibre": 0.7,
        "carb": -0.5,
        "protein": 0.3
    },
    "Muscle Gain": {
        "protein": 1.0,
        "energy": 0.5,
        "potassium": 0.3,
        "magnesium": 0.3
    },
    "Digestive Health": {
        "fibre": 1.0,
        "fat": -0.3,
        "freesugar": 0.3
    },
    "Skin & Vision Health": {
        "vita": 1.5,
        "vitc": 0.5,
        "vite": 0.5
    }
}


GOAL_IMPORTANCE_MAP = {
    "None": 0.0,
    "Low": 0.5,
    "Medium": 1.0,
    "High": 2.0
}

DEFICIENCY_MAP = {
    "Iron": "iron_mg",
    "Calcium": "calcium_mg",
    "Vitamin D": "vitd3_ug",
    "Vitamin C": "vitc_mg",
    "Vitamin B9(Folate)": "folate_ug",
    "Zinc": "zinc_mg",
    "Magnesium": "magnesium_mg",
    "Potassium": "potassium_mg",
    "Vitamin A": "vita_ug",
    "Vitamin E": "vite_mg",
    "Protein": "protein_g",
    "Fiber": "fibre_g",
    "Sodium (limit)": "sodium_mg",
    "Sugar (limit)": "freesugar_g"
}

DEFICIENCY_WEIGHT = 0.2

LIMIT_NUTRIENTS = {"freesugar", "sfa", "cholesterol"}

VEG_GROUPS = set(list("ABCDEFGHIJKLT"))
NON_VEG_GROUPS = set(list("MNOPQRST"))

STRICT_VEG_EXCLUDE = {"M"}

FOOD_GROUP_ALLERGY_MAP = {
    "dairy": {"L"},
    "egg": {"M"},
    "poultry": {"N"},
    "red meat": {"O"},
    "fish": {"P", "S"},
    "shellfish": {"Q", "R"},
    "seafood": {"P", "Q", "R", "S"},
    "nuts and seeds": {"H"},
    "sugar": {"I"},
    "oils and fats": {"T"}
}

GROUP_TO_ALLERGY = {}

for allergy, groups in FOOD_GROUP_ALLERGY_MAP.items():
    for g in groups:
        GROUP_TO_ALLERGY.setdefault(g, set()).add(allergy)

INGREDIENT_ALLERGY_MAP = {
    "peanut": ["peanut", "groundnut"],
    "tree_nuts": ["almond", "cashew", "walnut", "pistachio"],
    "gluten": ["wheat", "barley", "rye", "maida"],
    "soy": ["soy", "soybean", "tofu"],
    "lactose": ["milk", "cream", "paneer"],
    "garlic": ["garlic"],
    "onion": ["onion"],
    "mustard": ["mustard"],
    "sesame": ["sesame"],
    "mushroom": ["mushroom"]
}

INGREDIENT_ALLERGY_PATTERN_MAP = {
    "peanut": r"\b(peanut|groundnut)s?\b",
    "tree_nuts": r"\b(almond|cashew|pistachio|walnut|hazelnut|pine\s?nut)s?\b",
    "gluten": r"\b(wheat|maida|semolina|suji|rava|barley|rye)\b",
    "soy": r"\b(soy|soybean|tofu|soya)\b",
    "lactose": r"\b(milk|paneer|cheese|butter|cream|ghee|curd|yogurt)\b",
    "garlic": r"\b(garlic)\b",
    "onion": r"\b(onion)\b",
    "mustard": r"\b(mustard)\b",
    "sesame": r"\b(sesame|til)\b",
    "mushroom": r"\b(mushroom)\b"
}

PATTERN_TO_ALLERGY = {
    pattern: allergy
    for allergy, pattern in INGREDIENT_ALLERGY_PATTERN_MAP.items()
}

ALLERGY_NAME_MAP = {
    "dairy": "Dairy",
    "egg": "Egg",
    "poultry": "Poultry",
    "red meat": "Red meat",
    "fish": "Fish",
    "shellfish": "Shellfish",
    "seafood": "Seafood",
    "nuts and seeds": "Nuts and Seeds",
    "sugar": "Sugar",
    "oils and fats": "Oils and Fats",

    "peanut": "Peanut",
    "tree_nuts": "Tree nuts",
    "gluten": "Gluten",
    "soy": "Soy",
    "lactose": "Lactose",
    "garlic": "Garlic",
    "onion": "Onion",
    "mustard": "Mustard",
    "sesame": "Sesame",
    "mushroom": "Mushroom"
}

MEAL_TYPE_MAP = {
    "Breakfast": ["breakfast"],
    "Lunch": ["lunch"],
    "Dinner": ["dinner"]
}

NUTRIENT_DISPLAY_MAP = {
    "energy": "Energy",
    "carb": "Carbohydrates",
    "protein": "Protein",
    "fat": "Fat",
    # "freesugar": "Free Sugar (g)",
    "fibre": "Dietary Fiber",

    # "sfa": "Saturated Fat (g)",
    # "mufa": "Monounsaturated Fat (g)",
    # "pufa": "Polyunsaturated Fat (g)",
    # "cholesterol": "Cholesterol (mg)",

    "calcium": "Calcium",
    "phosphorus": "Phosphorus",
    "magnesium": "Magnesium",
    "sodium": "Sodium",
    "potassium": "Potassium",

    "iron": "Iron",
    "zinc": "Zinc",
    "copper": "Copper",
    "selenium": "Selenium",

    "vita": "Vitamin A",
    "vite": "Vitamin E",
    "vitd2": "Vitamin D2",
    "vitd3": "Vitamin D3",
    "vitk1": "Vitamin K1",
    "vitk2": "Vitamin K2",

    "vitb1": "Vitamin B1 (Thiamine)",
    "vitb2": "Vitamin B2 (Riboflavin)",
    "vitb3": "Vitamin B3 (Niacin)",
    "vitb5": "Vitamin B5 (Pantothenic Acid)",
    "vitb6": "Vitamin B6",
    "vitb7": "Vitamin B7 (Biotin)",
    "folate": "Vitamin B9 (Folate)",
    "vitc": "Vitamin C"
}

TARGET_NON_FILTERED = 20