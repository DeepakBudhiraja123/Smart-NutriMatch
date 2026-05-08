# Nutri Match 🥗

Nutri Match is an intelligent nutrition recommendation system that suggests food items based on user preferences, dietary restrictions, nutritional goals, and ingredient compatibility.

The system uses a rule-based recommendation engine combined with nutritional scoring to provide personalized food recommendations.

---

## Features

- Personalized food recommendations
- Nutritional score calculation
- Ingredient contribution analysis
- Rule-based recommendation engine
- Dietary preference filtering
- FastAPI backend
- React frontend
- Real-time recommendation generation

---

## Tech Stack

### Backend
- Python
- FastAPI
- Pandas
- NumPy

### Frontend
- React.js
- Axios
- Context API

### Dataset
- IFCT 2017
- USDA Food Composition Data
- UKFCT

---

## Project Structure

```bash
Nutri-Match/
│
├── backend/
│   ├── main.py
│   ├── constants.py
│   ├── scoring.py
│   └── recommendation_engine.py
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── context/
│
├── datasets/
│
└── README.md
```

---

## Working

Nutri Match works in 4 steps:

### 1. User Input Collection
The system collects:

- Age
- Gender
- Dietary preference
- Nutritional goal
- Food restrictions
- Preferred ingredients

---

### 2. Nutritional Analysis
Food items are analyzed on:

- Protein
- Carbohydrates
- Fats
- Fiber
- Calories
- Micronutrients

---

### 3. Score Computation
A weighted nutritional score is computed for each food item.

Formula:

\[
Score = \sum (Nutrient\ Contribution \times Weight)
\]

---

### 4. Recommendation Generation
Top-ranked food items are recommended based on:

- Nutritional suitability
- Ingredient compatibility
- User constraints

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/nutri-match.git
cd nutri-match
```

---

## Backend Setup

Install dependencies:

```bash
pip install -r requirements.txt
```

Run server:

```bash
uvicorn main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

---

## Frontend Setup

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoint

### Get Recommendations

```http
POST /recommend
```

### Request Body

```json
{
  "diet_type": "vegetarian",
  "goal": "high_protein",
  "restrictions": ["nuts"]
}
```

---

## Research Motivation

Existing food recommendation systems often:

- Ignore nutrient-level personalization
- Lack ingredient explainability
- Provide generic suggestions

Nutri Match addresses these gaps by combining:

- Nutritional intelligence
- Rule-based logic
- Explainable recommendations

---

## Future Enhancements

- Machine learning based recommendation engine
- Meal plan generation
- Calorie tracking
- User authentication
- Mobile app integration

---

## Authors

- Deepak Budhiraja
- Team Members

Punjab Engineering College

---

## License

This project is developed for academic and research purposes.