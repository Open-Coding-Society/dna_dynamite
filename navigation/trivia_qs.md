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
            }
        }

        const questions = [
            { q: "What is 2+2?", options: ["3", "4", "5"], answer: "4" },
            { q: "What is the capital of France?", options: ["Berlin", "Paris", "Madrid"], answer: "Paris" },
            { q: "What is 5*6?", options: ["30", "25", "20"], answer: "30" },
            { q: "What color is the sky?", options: ["Blue", "Green", "Red"], answer: "Blue" },
            { q: "Which planet is closest to the sun?", options: ["Earth", "Venus", "Mercury"], answer: "Mercury" }
        ];

        let selectedQuestions = [];

        function getRandomQuestions() {
            selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 5);
        }

        function loadQuiz() {
            getRandomQuestions();
            const quizContainer = document.getElementById("quiz-container");
            quizContainer.innerHTML = "";
            selectedQuestions.forEach((question, index) => {
                let questionHTML = `<div class='question' id='q${index}'>
                    <p>${question.q}</p>`;
                question.options.forEach(option => {
                    questionHTML += `<label>
                        <input type='radio' name='q${index}' value='${option}'> ${option}
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
                    if (selectedOption.value === question.answer) {
                        score++;
                        feedback.innerHTML = "<span class='correct'>Correct!</span>";
                    } else {
                        feedback.innerHTML = `<span class='incorrect'>Incorrect! The correct answer is: ${question.answer}</span>`;
                    }
                } else {
                    feedback.innerHTML = `<span class='incorrect'>Incorrect! The correct answer is: ${question.answer}</span>`;
                }
            });
            document.getElementById("score").textContent = `Your score: ${score}/5`;
        }

        loadQuiz();
</script>
</body>
</html>
