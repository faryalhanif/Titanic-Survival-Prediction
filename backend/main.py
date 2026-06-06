from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
import os

app = FastAPI(title="Titanic Survival Predictor API", version="1.0.0")

# Allow requests from the React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "model.pkl")
model = joblib.load(MODEL_PATH)


class PassengerInput(BaseModel):
    pclass: int = Field(..., ge=1, le=3, description="Passenger class (1, 2, or 3)")
    sex: str = Field(..., description="Sex: 'male' or 'female'")
    age: float = Field(..., ge=0, le=120, description="Age in years")
    fare: float = Field(..., ge=0, description="Ticket fare")
    sibsp: int = Field(..., ge=0, description="Number of siblings/spouses aboard")
    parch: int = Field(..., ge=0, description="Number of parents/children aboard")
    embarked: str = Field(..., description="Port of embarkation: 'S', 'C', or 'Q'")


class PredictionResult(BaseModel):
    survived: bool
    survival_probability: float
    message: str


@app.get("/")
def root():
    return {"status": "ok", "message": "Titanic Survival Predictor API is running"}


@app.post("/predict", response_model=PredictionResult)
def predict(passenger: PassengerInput):
    # Encode inputs exactly as done in training
    sex_encoded = 1 if passenger.sex.lower() == "female" else 0
    embarked_map = {"S": 0, "C": 1, "Q": 2}
    embarked_encoded = embarked_map.get(passenger.embarked.upper(), 0)
    family_size = passenger.sibsp + passenger.parch + 1

    features = np.array([[
        passenger.pclass,
        sex_encoded,
        passenger.age,
        passenger.fare,
        family_size,
        embarked_encoded,
    ]])

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]  # probability of survival

    survived = bool(prediction)
    message = (
        "This passenger would likely have survived." if survived
        else "This passenger would likely not have survived."
    )

    return PredictionResult(
        survived=survived,
        survival_probability=round(float(probability), 4),
        message=message,
    )
