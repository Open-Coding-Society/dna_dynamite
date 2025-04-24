---
layout: post 
title: Trivia Questions
search_exclude: true
permalink: /trivia/
---
<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trivia Questions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fce4ec;
            text-align: center;
        }
        .heart-container {
            display: flex;
            gap: 15px;
            justify-content: center;
            margin-bottom: 20px;
        }
        .heart {
            font-size: 50px;
            cursor: pointer;
            transition: transform 0.3s, color 0.3s;
        }
        .heart:hover {
            transform: scale(1.2);
        }
        .heart.broken {
            color: red;
            transform: scale(1.2);
        }
        .quiz-container {
            display: none;
            padding: 20px;
            border-radius: 15px;
            background: #d81b60;
            width: 80%;
            max-width: 400px;
            margin: 20px auto;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            color: white;
        }
        .question { margin-bottom: 15px; }
        .answer-feedback { font-weight: bold; margin-top: 5px; }
        .correct { color: green; }
        .incorrect { color: white; }
        h2 {
            color: white;
            margin-bottom: 10px;
        }
        p {
            font-size: 16px;
            margin-bottom: 10px;
        }
        label {
            display: block;
            text-align: left;
            margin: 5px 0;
        }
        button {
            background-color: white;
            color: #d81b60;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
        }
        button:hover {
            background-color: #f8bbd0;
        }
    </style>
    <div class="heart-container">
        <span class="heart" onclick="breakHeart(0)">❤️</span>
        <span class="heart" onclick="breakHeart(1)">❤️</span>
        <span class="heart" onclick="breakHeart(2)">❤️</span>
    </div>
    <div class="quiz-container" id="quiz">
        <h2>Quiz</h2>
        <div id="quiz-container"></div>
        <button onclick="submitQuiz()">Submit</button>
        <p id="score"></p>
        <p id="accuracy"></p> <!-- Accuracy -->
    </div>
    <script>
        const pythonURI = "http://127.0.0.1:8887"; // Replace with your actual backend URI
        const fetchOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };
        let brokenHearts = 0;
        let selectedQuestions = [];
        window.onload = function() {
            // Retrieve correct and total answers from localStorage
            const correctAnswers = localStorage.getItem("correctAnswers") || 0;
            const totalAnswers = localStorage.getItem("totalAnswers") || 0;
            if (totalAnswers > 0) {
                const accuracyPercent = ((correctAnswers / totalAnswers) * 100).toFixed(1);
                document.getElementById("accuracy").textContent = `Accuracy: ${accuracyPercent}%`;
            }
            // Check for a stored trivia question if needed (not implemented yet, but could be stored in localStorage)
        };
        function breakHeart(index) {
            const hearts = document.querySelectorAll('.heart');
            if (!hearts[index].classList.contains('broken')) {
                hearts[index].textContent = '💔';
                hearts[index].classList.add('broken');
                brokenHearts++;
            }
            if (brokenHearts === 3) {
                document.getElementById('quiz').style.display = 'block';
                fetchRandomQuestion();
            }
        }
        function fetchRandomQuestion() {
            fetch(`${pythonURI}/api/geneticstrivia`, fetchOptions)
                .then(response => response.json())
                .then(data => {
                    if (data && data.question && data.answer_options && data.correct_answer && data.id) {
                        selectedQuestions = [{
                            id: data.id,
                            q: data.question,
                            options: data.answer_options,
                            answer: data.correct_answer,
                            explanation: data.explanation
                        }];
                        loadQuiz();
                    } else {
                        alert("Failed to fetch a valid trivia question.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching trivia question:", error);
                    alert("Error loading question.");
                });
        }
        function loadQuiz() {
            const quizContainer = document.getElementById("quiz-container");
            quizContainer.innerHTML = "";
            selectedQuestions.forEach((question, index) => {
                let questionHTML = `<div class='question' id='q${index}'>
                    <p>${question.q}</p>`;
                for (const [letter, text] of Object.entries(question.options)) {
                    questionHTML += `<label>
                        <input type='radio' name='q${index}' value='${letter}'> ${letter}: ${text}
                    </label>`;
                }
                questionHTML += `<p class='answer-feedback' id='feedback${index}'></p></div>`;
                quizContainer.innerHTML += questionHTML;
            });
        }
        function submitQuiz() {
            selectedQuestions.forEach((question, index) => {
                const selectedOption = document.querySelector(`input[name='q${index}']:checked`);
                const feedback = document.getElementById(`feedback${index}`);
                feedback.classList.remove("correct", "incorrect");
                if (selectedOption) {
                    const payload = {
                        question_id: question.id,
                        selected_answer: selectedOption.value
                    };
                    fetch(`${pythonURI}/api/submit_answer`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(payload)
                    })
                    .then(res => res.json())
                    .then(data => {
                        let correctAnswers = parseInt(localStorage.getItem("correctAnswers") || 0);
                        let totalAnswers = parseInt(localStorage.getItem("totalAnswers") || 0);
                        totalAnswers++;
                        // If correct, increment correct answers
                        if (data.is_correct) {
                            correctAnswers++;
                            feedback.innerHTML = "<span class='correct'>Correct!</span>";
                        } else {
                            feedback.innerHTML = `<span class='incorrect'>Incorrect! The correct answer is: ${data.correct_answer}. Explanation: ${data.explanation}</span>`;
                        }
                        // Store updated values in localStorage
                        localStorage.setItem("correctAnswers", correctAnswers);
                        localStorage.setItem("totalAnswers", totalAnswers);
                        // Calculate and display updated accuracy
                        const accuracyPercent = ((correctAnswers / totalAnswers) * 100).toFixed(1);
                        document.getElementById("accuracy").textContent = `Accuracy: ${accuracyPercent}%`;
                        // Display updated score
                        document.getElementById("score").textContent = `Your score: ${correctAnswers}/${totalAnswers}`;
                    })
                    .catch(err => {
                        feedback.innerHTML = "<span class='incorrect'>Error submitting answer.</span>";
                        console.error("Submit error:", err);
                    });
                } else {
                    feedback.innerHTML = `<span class='incorrect'>No answer choice selected. The answer is: ${question.answer}</span>`;
                }
            });
        }
    </script>
</html>

