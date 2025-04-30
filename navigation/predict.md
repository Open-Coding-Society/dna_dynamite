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
    :root {
      --navy-background: #050b16; /* almost black */
      --navy-form: #0d1a2e;       /* dark navy */
      --navy-field: #1a2b44;      /* medium navy */
      --accent: #4fa3f7;
      --text-light: #ffffff;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background-color: var(--navy-background);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: var(--text-light);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .container {
      text-align: center;
      width: 100%;
      max-width: 450px;
      padding: 2rem;
    }

    h2 {
      margin-bottom: 2rem;
      font-size: 1.75rem;
      color: var(--accent);
    }

    form {
      background-color: var(--navy-form);
      padding: 2rem;
      border-radius: 14px;
      display: grid;
      gap: 1rem;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
    }

    input {
      padding: 0.75rem;
      border-radius: 8px;
      border: none;
      font-size: 1rem;
      background-color: var(--navy-field);
      color: var(--text-light);
    }

    input::placeholder {
      color: #b0c4de;
    }

    button {
      padding: 0.75rem;
      font-size: 1rem;
      background-color: var(--accent);
      color: var(--text-light);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #3c8fdc;
    }

    #results {
      margin-top: 1.5rem;
      background-color: var(--navy-field);
      padding: 1rem;
      border-radius: 10px;
      font-size: 1.05rem;
      line-height: 1.6;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
    }

    #results.success {
      border-left: 5px solid #4fa3f7;
    }

    #results.error {
      border-left: 5px solid #e74c3c;
    }
  </style>

  <div class="container">
    <h2>💓 Heart Disease & Stroke Risk Predictor</h2>
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
      <button type="submit">🔍 Get Prediction</button>
    </form>

    <div id="results"></div>
  </div>

  <script>
    const form = document.getElementById("riskForm");
    const resultsDiv = document.getElementById("results");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      for (const key in data) {
        data[key] = parseFloat(data[key]);
      }

      resultsDiv.className = ""; // Reset styles

      try {
        const response = await fetch("http://localhost:8887/api/predict_disease", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          resultsDiv.classList.add("success");
          resultsDiv.innerHTML = `
            ✅ <strong>Prediction Successful</strong><br>
            ❤️ Heart Disease Risk: <strong>${(result.data.heart_disease_risk * 100).toFixed(2)}%</strong><br>
            🧠 Stroke Risk: <strong>${(result.data.stroke_risk * 100).toFixed(2)}%</strong>
          `;
        } else {
          resultsDiv.classList.add("error");
          resultsDiv.textContent = `❌ Error: ${result.error}`;
        }

      } catch (error) {
        resultsDiv.classList.add("error");
        resultsDiv.textContent = `⚠️ Request failed: ${error.message}`;
      }
    });
  </script>
</html>
