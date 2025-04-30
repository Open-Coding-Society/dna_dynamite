---
layout: post 
title: Predict Your Risk
search_exclude: true
permalink: /predict/
---

<html lang="en">
  <meta charset="UTF-8">
  <title>Disease Risk Predictor</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Merriweather:wght@700&family=Poppins:wght@600&display=swap" rel="stylesheet">
  <style>
    html, body {
      height: 100%;
      margin: 0;
      font-family: 'Inter', sans-serif;
      background: linear-gradient(to right, #1e1b3a, #2a2644);
      color: #f5f5f5;
    }

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 2rem;
    }

    h2 {
      font-family: 'Poppins', sans-serif;
      color: #ff8c42;
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    form {
      display: grid;
      gap: 1rem;
      max-width: 420px;
      background-color: #2d2a4f;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
      width: 100%;
    }

    input, select {
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #444;
      border-radius: 8px;
      background-color: #1e1b3a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      transition: border 0.3s, box-shadow 0.3s;
    }

    input:focus, select:focus {
      border-color: #ff8c42;
      box-shadow: 0 0 8px rgba(255, 140, 66, 0.6);
      outline: none;
    }

    input::placeholder {
      color: #aaa;
    }

    button {
      padding: 0.9rem;
      font-size: 1rem;
      background: linear-gradient(to right, #ff8c42, #ff6600);
      color: #1e1b3a;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s ease, background 0.3s ease;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
    }

    button:hover {
      transform: scale(1.03);
      background: linear-gradient(to right, #ffa65c, #ff7f33);
    }

    #results {
      margin-top: 2rem;
      font-weight: bold;
      background-color: #302c55;
      padding: 1.2rem;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(255, 140, 66, 0.5);
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      max-width: 420px;
      text-align: center;
    }

    .low-risk {
      color: #00bfff;
    }

    .medium-risk {
      color: #c77dff;
    }

    .high-risk {
      color: #ff8c42;
    }
  </style>

  <body>
    <div class="container">
      <h2>Heart Disease & Stroke Risk Predictor</h2>
      <form id="riskForm">
        <input type="number" name="age" placeholder="Age" required>
        <select name="sex" required>
          <option value="">Select Sex</option>
          <option value="0">Female</option>
          <option value="1">Male</option>
        </select>
        <input type="number" name="bmi" step="0.1" placeholder="BMI" required>
        <input type="number" name="weight" placeholder="Weight (kg)" required>
        <input type="number" name="blood_pressure" placeholder="Blood Pressure" required>
        <input type="number" name="heart_rate" placeholder="Heart Rate" required>
        <select name="smoking_status" required>
          <option value="">Smoking Status</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        <input type="number" name="cholesterol" placeholder="Cholesterol (mg/dL)" required>
        <input type="number" name="glucose" placeholder="Glucose (mg/dL)" required>
        <button type="submit">Get Prediction</button>
      </form>

      <div id="results"></div>
    </div>

    <script>
      const form = document.getElementById("riskForm");
      const resultsDiv = document.getElementById("results");

      function getRiskLabel(value) {
        if (value < 0.33) return `<span class="low-risk">Low Risk</span>`;
        if (value < 0.66) return `<span class="medium-risk">Medium Risk</span>`;
        return `<span class="high-risk">High Risk</span>`;
      }

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

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
            const heartRisk = result.data.heart_disease_risk;
            const strokeRisk = result.data.stroke_risk;

            resultsDiv.innerHTML = `
              Prediction Successful<br><br>
              Heart Disease Risk: ${(heartRisk * 100).toFixed(2)}%<br>
              Interpretation: ${getRiskLabel(heartRisk)}<br><br>
              Stroke Risk: ${(strokeRisk * 100).toFixed(2)}%<br>
              Interpretation: ${getRiskLabel(strokeRisk)}
            `;
          } else {
            resultsDiv.textContent = `Error: ${result.error}`;
          }

        } catch (error) {
          resultsDiv.textContent = `Request failed: ${error.message}`;
        }
      });
    </script>
  </body>
</html>
