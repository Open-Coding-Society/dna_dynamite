---
layout: post 
title: Trivia Questions
search_exclude: true
permalink: /trivia/
---
<html lang="en">
<head>
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
        .incorrect { color: red; }
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
</head>
<body>
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
 </div>

<script>
    let selectedQuestions = [];

    async function getRandomQuestionsFromAPI() {
        selectedQuestions = [];
        for (let i = 0; i < 5; i++) {
            try {
                const response = await fetch("http://127.0.0.1:8887/api/geneticstrivia");
                const data = await response.json();

                // Transform to match your previous structure
                const questionObj = {
                    q: data.question,
                    options: Object.entries(data.options).map(([key, val]) => `${key}: ${val}`),
                    answerKey: data.answer,
                    explanation: data.explanation
                };

                selectedQuestions.push(questionObj);
            } catch (error) {
                console.error("Error fetching trivia question:", error);
            }
        }
    }

    async function loadQuiz() {
        await getRandomQuestionsFromAPI();

        const quizContainer = document.getElementById("quiz-container");
        quizContainer.innerHTML = "";
        selectedQuestions.forEach((question, index) => {
            let questionHTML = `<div class='question' id='q${index}'>
                <p>${question.q}</p>`;
            question.options.forEach(option => {
                questionHTML += `<label>
                    <input type='radio' name='q${index}' value='${option.split(":")[0]}'> ${option}
                </label>`;
            });
            questionHTML += `<p class='answer-feedback' id='feedback${index}'></p></div>`;
            quizContainer.innerHTML += questionHTML;
        });
    }

    function submitQuiz() {
        let score = 0;
        selectedQuestions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name='q${index}']:checked`);
            const feedback = document.getElementById(`feedback${index}`);
            feedback.classList.remove("correct", "incorrect");

            if (selectedOption) {
                if (selectedOption.value === question.answerKey) {
                    score++;
                    feedback.innerHTML = "<span class='correct'>Correct!</span>";
                } else {
                    const correctText = question.options.find(opt => opt.startsWith(question.answerKey));
                    feedback.innerHTML = `<span class='incorrect'>Incorrect! The correct answer is: ${correctText}<br>${question.explanation}</span>`;
                }
            } else {
                const correctText = question.options.find(opt => opt.startsWith(question.answerKey));
                feedback.innerHTML = `<span class='incorrect'>Incorrect! The correct answer is: ${correctText}<br>${question.explanation}</span>`;
            }
        });

        document.getElementById("score").textContent = `Your score: ${score}/5`;
    }

    // Wait until all hearts are broken before loading
    let brokenHearts = 0;
    function breakHeart(index) {
        const hearts = document.querySelectorAll('.heart');
        if (!hearts[index].classList.contains('broken')) {
            hearts[index].textContent = '💔';
            hearts[index].classList.add('broken');
            brokenHearts++;
        }
        if (brokenHearts === 3) {
            document.getElementById('quiz').style.display = 'block';
            loadQuiz(); // Load quiz once hearts are broken
        }
    }
</script>
