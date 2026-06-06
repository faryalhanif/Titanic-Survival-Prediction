import React, { useState } from "react";
import PredictionForm from "./components/PredictionForm";
import ResultCard from "./components/ResultCard";
import "./App.css";

const API_URL = "http://localhost:8000";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handlePredict(formData) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Prediction failed.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-icon">🚢</div>
        <h1>Titanic Survival Predictor</h1>
        <p>Enter passenger details to predict survival using a Random Forest model</p>
      </header>

      <main className="app-main">
        <PredictionForm onSubmit={handlePredict} loading={loading} />

        {error && (
          <div className="error-box">
            <span>⚠️</span> {error}
          </div>
        )}

        {result && <ResultCard result={result} />}
      </main>

      <footer className="app-footer">
        Titanic Dataset · Random Forest Classifier
      </footer>
    </div>
  );
}
