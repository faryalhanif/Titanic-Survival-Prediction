import React, { useState } from "react";
import "./PredictionForm.css";

const defaultValues = {
  pclass: "3",
  sex: "male",
  age: "",
  fare: "",
  sibsp: "0",
  parch: "0",
  embarked: "S",
};

export default function PredictionForm({ onSubmit, loading }) {
  const [form, setForm] = useState(defaultValues);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      pclass: parseInt(form.pclass),
      sex: form.sex,
      age: parseFloat(form.age),
      fare: parseFloat(form.fare),
      sibsp: parseInt(form.sibsp),
      parch: parseInt(form.parch),
      embarked: form.embarked,
    });
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>🧑‍✈️ Passenger Details</h2>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="pclass">Passenger Class</label>
          <select
            id="pclass"
            name="pclass"
            value={form.pclass}
            onChange={handleChange}
            required
            aria-label="Passenger Class"
          >
            <option value="1">1st Class</option>
            <option value="2">2nd Class</option>
            <option value="3">3rd Class</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sex">Sex</label>
          <select
            id="sex"
            name="sex"
            value={form.sex}
            onChange={handleChange}
            required
            aria-label="Sex"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="e.g. 29"
            min="0"
            max="120"
            step="0.5"
            required
            aria-label="Age in years"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fare">Fare ($)</label>
          <input
            id="fare"
            type="number"
            name="fare"
            value={form.fare}
            onChange={handleChange}
            placeholder="e.g. 32.50"
            min="0"
            step="0.01"
            required
            aria-label="Ticket fare in dollars"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sibsp">Siblings / Spouses</label>
          <input
            id="sibsp"
            type="number"
            name="sibsp"
            value={form.sibsp}
            onChange={handleChange}
            placeholder="e.g. 1"
            min="0"
            required
            aria-label="Number of siblings or spouses aboard"
          />
        </div>

        <div className="form-group">
          <label htmlFor="parch">Parents / Children</label>
          <input
            id="parch"
            type="number"
            name="parch"
            value={form.parch}
            onChange={handleChange}
            placeholder="e.g. 0"
            min="0"
            required
            aria-label="Number of parents or children aboard"
          />
        </div>

        <div className="form-group">
          <label htmlFor="embarked">Port of Embarkation</label>
          <select
            id="embarked"
            name="embarked"
            value={form.embarked}
            onChange={handleChange}
            required
            aria-label="Port of Embarkation"
          >
            <option value="S">Southampton (S)</option>
            <option value="C">Cherbourg (C)</option>
            <option value="Q">Queenstown (Q)</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Predicting…
          </>
        ) : (
          "Predict Survival"
        )}
      </button>
    </form>
  );
}
