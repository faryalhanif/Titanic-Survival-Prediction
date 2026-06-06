import React from "react";
import "./ResultCard.css";

export default function ResultCard({ result }) {
  const { survived, survival_probability, message } = result;
  const pct = Math.round(survival_probability * 100);

  return (
    <div className={`result-card ${survived ? "survived" : "not-survived"}`} role="region" aria-label="Prediction Result">
      <div className="result-icon">{survived ? "🟢" : "🔴"}</div>
      <div className="result-label">{survived ? "Survived" : "Did Not Survive"}</div>
      <p className="result-message">{message}</p>

      <div className="probability-section">
        <div className="prob-header">
          <span>Survival Probability</span>
          <span className="prob-value">{pct}%</span>
        </div>
        <div className="prob-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
          <div
            className="prob-bar-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="result-chips">
        <span className="chip">Model: Random Forest</span>
        <span className={`chip ${survived ? "chip-green" : "chip-red"}`}>
          {survived ? "Survived" : "Not Survived"}
        </span>
      </div>
    </div>
  );
}
