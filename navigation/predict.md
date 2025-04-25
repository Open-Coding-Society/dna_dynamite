---
layout: post 
title: Predict Your Risk
search_exclude: true
permalink: /predict/
---

<html lang="en">
  <meta charset="UTF-8">
  <title>Disease Risk Predictor</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 2rem;
    }
    form {
      display: grid;
      gap: 1rem;
      max-width: 400px;
    }
    input, button {
      padding: 0.5rem;
      font-size: 1rem;
    }
    #results {
      margin-top: 2rem;
      font-weight: bold;
    }
  </style>

  <h2>Heart Disease & Stroke Risk Predictor</h2>
  <form id="riskForm">
    <input type="number" name="age" placeholder="Age" required>
    <input type="number" name="sex" placeholder="Sex (0 = Female, 1 = Male)" required>
    <input type="number" name="bmi" step="0.1" placeholder="BMI" required>
    <input type="number" name="weight" placeholder="Weight (kg)" required>
    <input type="number" name="blood_pressure" placeholder="Blood Pressure" required>
    <input type="number" name="heart_rate" placeholder="Heart Rate" required>
    <input type="number" name="smoking_status" placeholder="Smoking Status (0 = No, 1 = Yes)" required>
    <input type="number" name="cholesterol" placeholder="Cholesterol (mg/dL)" required>
    <input type="number" name="glucose" placeholder="Glucose (mg/dL)" required>
    <button type="submit">Get Prediction</button>
  </form>

  <div id="results"></div>

  <script>
    const form = document.getElementById("riskForm");
    const resultsDiv = document.getElementById("results");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Convert numeric fields to numbers
      for (const key in data) {
        data[key] = parseFloat(data[key]);
      }

      try {
        const response = await fetch("http://localhost:8887/api/predict_disease", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          resultsDiv.innerHTML = `
            Prediction Successful<br>
            Heart Disease Risk: ${(result.data.heart_disease_risk * 100).toFixed(2)}%<br>
            Stroke Risk: ${(result.data.stroke_risk * 100).toFixed(2)}%
        `;

        } else {
          resultsDiv.textContent = `Error: ${result.error}`;
        }

      } catch (error) {
        resultsDiv.textContent = `Request failed: ${error.message}`;
      }
    });
  </script>
</html>