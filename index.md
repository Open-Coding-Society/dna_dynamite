---
layout: tailwind
title: DNA Dynamite
search_exclude: true
description: Open Coding Society Project
menu: nav/home.html
---


<script src="https://cdn.tailwindcss.com"></script>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

<style>
  body {
    font-family: 'Inter', sans-serif;
  }

  /* 🎯 Trivia Quiz Modal Styles */
  #quizModal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(30, 41, 59, 0.95); /* dark glass effect */
    backdrop-filter: blur(12px);
    padding: 2rem;
    border-radius: 1rem;
    width: 90%;
    max-width: 480px;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    color: #f1f5f9;
    z-index: 1010;
    
    max-height: 80vh; /* or whatever max height you want */
    overflow-y: auto; /* allow vertical scrolling */

    /* NEW: flex layout to stack content vertically */
    display: flex;
    flex-direction: column;

    animation: fadeInScale 0.3s ease;
    pointer-events: auto;
    font-family: 'Inter', sans-serif;
  }

  .quiz-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: none;
    pointer-events: auto;
  }

  /* Headings */
  #quizModal h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #93c5fd;
    text-align: center;
  }

  /* Questions & Answers */
  #quizModal p {
    font-size: 1rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  #quizModal label {
    display: block;
    background: #1e293b;
    border: 1px solid #334155;
    color: #f8fafc;
    padding: 0.75rem 1rem;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  #quizModal label:hover {
    background: #334155;
  }

  /* Buttons */
  #quizModal button {
    background: linear-gradient(to right, #3b82f6, #6366f1);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    margin-top: auto;      /* pushes button to the bottom */
    align-self: center;    /* centers button horizontally */
    transition: all 0.2s ease;
    cursor: pointer;
  }

  #quizModal button:hover {
    transform: scale(1.05);
    background: linear-gradient(to right, #2563eb, #4f46e5);
  }

  /* Feedback */
  .answer-feedback {
    font-weight: 600;
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }

  .correct {
    color: #86efac; /* green-300 */
  }

  .incorrect {
    color: #ff9999; 
  }

  /* Close Button */
  .quiz-close-button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #cbd5e1;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
    z-index: 1020;
  }

  .quiz-close-button:hover {
    color: #f87171;
    transform: scale(1.1);
  }

  /* Animation */
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9) translate(-50%, -50%);
    }
    to {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
    }
  }


  #popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(30, 41, 59, 0.85); /* dark glass look */
    backdrop-filter: blur(16px);
    border: 1px solid #334155;
    border-radius: 1rem;
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    z-index: 1000;
    color: #f8fafc; /* very light gray */
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    animation: fadeInScale 0.3s ease;
  }

  .popup-page {
    display: none;
    text-align: center;
    animation: fadeSlideIn 0.4s ease;
  }

  .popup-page h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #93c5fd; /* sky blue title */
  }

  .popup-page p,
  .popup-page ul {
    font-size: 0.95rem;
    color: #e2e8f0;
    margin-bottom: 1rem;
  }

  .popup-page ul {
    list-style: none;
    padding: 0;
  }

  .popup-page li::before {
    content: "🔹 ";
  }

  #popup button {
    background: linear-gradient(to right, #3b82f6, #6366f1);
    color: white;
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 8px;
    margin: 0 5px;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  #popup button:hover {
    transform: scale(1.05);
    background: linear-gradient(to right, #2563eb, #4f46e5);
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9) translate(-50%, -50%);
    }
    to {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
    }
  }

  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9) translate(-50%, -50%);
    }
    to {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%);
    }
  }


  #overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    z-index: 999;
  }


  body {
    text-align: center;
    font-family: Arial, sans-serif;
    background-color: #111;
    color: white;
  }

  .dna-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 10px;
  }

  .strand {
    display: flex;
    justify-content: center;
    gap: 16px; /* spacing between each base/gap */
    margin-bottom: 10px;
  }

  .base, .gap {
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    outline: none;
  }

  /* Top bases (blue) */
  .base.left {
    background-color: #0000b3;
    color: white;
  }

  /* Bottom bases (pink) */
  .base.right {
    background-color: #ac3973;
    color: white;
  }

    /* DNA base pair colors */
  .gc-pair {
    background-color: #0000b3 !important; /* deep blue */
    color: white !important;
  }

  .at-pair {
    background-color: #ac3973 !important; /* soft pink */
    color: white !important;
  }


  /* Editable yellow circles */
  .gap.left,
  .gap.right {
    background-color: #e6e600;
    border: 2px dashed black;
    color: black;
  }

  .gap.correct {
    background-color: green;
    color: white;
  }

  .gap.wrong {
    background-color: red;
    color: white;
  }

.dna-box {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
}

.rounded-xl {
  border-radius: 0.75rem;
}
.shadow-lg {
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
}
.hearts {
  font-size: 50px;  /* big hearts */
  user-select: none; /* prevent highlight if you want */
  color: red;
  text-shadow: 1px 1px 2px darkred;
}
 #highScorePopup button {
    padding: 0.5rem 1rem;
    background-color: #10b981;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

  #highScorePopup button:hover {
    background-color: #059669;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>

<div style="height: calc(100vh - 60px);" class="w-screen">
  <!-- ✅ Changed from flex to grid layout -->
  <div class="grid h-full w-screen grid-cols-[20%_60%_20%] bg-black text-white font-sans">  
    <!-- Left Panel -->
    <div class="p-4 flex flex-col justify-between bg-gray-900">
      <div>
        <!-- Username + Login -->
        <div class="flex items-center justify-between mb-4">
          <span id="username" class="text-sm font-bold">User: Guest</span>
        </div>
        <!-- High Score -->
        <div class="mb-4">
          <p class="font-bold">High Score</p>
          <div id="highScore" class="h-10 bg-gray-700 mt-1 rounded flex items-center px-2">0</div>
        </div>
        <!-- Menu -->
        <div class="mb-4">
          <p class="font-bold">Menu</p>
          <ul class="text-sm space-y-2 mt-2">
            <li>
              <button id="startBtn" class="w-full px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                ▶️ Start
              </button>
            </li>
            <li>
              <button id="pauseBtn" class="w-full px-3 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                ⏸️ Pause
              </button>
            </li>
            <li>
              <button id="resumeBtn" class="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                ⏩ Resume
              </button>
            </li>
            <li>
              <button id="restartBtn" class="w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                🔁 Restart
              </button>
            </li>
          </ul>
          <!-- Manual Speed Control -->
          <div class="mt-6">
            <button id="speedUpBtn" class="w-full px-3 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
              ⚡ Increase Speed
            </button>
          </div>
        </div>
        <!-- Icons -->
        <div class="flex gap-4 mt-6 text-sm text-blue-400 underline">
          <a href="{{ site.baseurl }}/profile" title="Profile">Settings</a>
          <a href="javascript:void(0);" onclick="openPopup()" title="Help">Help</a>
        </div>
      </div>
    </div>

    <!-- Center Panel -->
  <div id="gameContainer" class="flex flex-col justify-center items-center relative bg-black">
      <!-- Game Canvas -->
      <canvas id="gameCanvas" class="w-[100%] h-[100%] absolute top-0 left-0 w-full h-full -z-10 opacity-10"></canvas>
    </div>

    <!-- Right Panel -->
  <div class="p-4 bg-gray-900 flex flex-col items-start w-full">
    <!-- Lives (dynamic) -->
    <div id="livesContainer" class="flex justify-center text-3xl space-x-2 w-full mb-4">
      <!-- GameEnv will populate this -->
  <div class="hearts">
    ❤️ ❤️ ❤️
  </div>
    </div>

    <!-- Leaderboard -->
  <div class="w-full px-2 mt-6">
    <h2 class="text-xl font-semibold text-sky-400 mb-2 text-center">🏆 Leaderboard</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full table-auto text-sm rounded-lg shadow-lg overflow-hidden bg-black text-white border border-gray-700">
        <thead>
          <tr class="bg-blue-600 text-white">
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Score</th>
          </tr>
        </thead>
        <tbody id="leaderboardBody">
          <!-- JS will inject rows -->
        </tbody>
      </table>
    </div>
  </div>

  </div>


<!-- Trivia Quiz Modal -->
<div class="quiz-overlay" id="quizOverlay" style="display: none;"></div>

<div id="quizModal" style="display: none;">
  <h2>Trivia Quiz</h2>

  <!-- Close X inside popup -->
 <button id="closeQuizButton" class="quiz-close-button" style="display: none;">✖</button>


  <!-- Dynamic content area -->
  <div id="quiz-container" class="mt-4"></div>

  <!-- Submit Button -->
  <button id="submitQuizButton" class="mt-4 px-4 py-1.5 text-sm bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-md hover:scale-105 hover:shadow-md transition">
    Submit Quiz
  </button>
</div>

<script type="module">
  import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  // Fetch leaderboard data
  fetch(`${pythonURI}/api/score/all_users`, fetchOptions)
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('leaderboardBody');
      data.sort((a, b) => b.score - a.score);
      data.forEach(entry => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-100';

        const userCell = document.createElement('td');
        userCell.className = 'px-4 py-2 text-center font-medium';
        userCell.textContent = entry.name ?? entry.user_id;

        const scoreCell = document.createElement('td');
        scoreCell.className = 'px-4 py-2 text-center';
        scoreCell.textContent = entry.score;

        row.appendChild(userCell);
        row.appendChild(scoreCell);
        tbody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching leaderboard data:', error);
    });
</script>

<script type="module">
  // Correctly importing necessary modules
  import Game from '{{site.baseurl}}/assets/js/dynamite/Game.js';
  import GameEnv from '{{site.baseurl}}/assets/js/dynamite/GameEnv.js';  // Make sure this path is correct
  import GameController from '{{site.baseurl}}/assets/js/dynamite/GameController.js';
  import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  //import { closeHighScorePopup } from '{{site.baseurl}}/assets/js/dynamite/closeHSP.js';

  const environment = {
    path: "{{site.baseurl}}",
    pythonURI: pythonURI,
    javaURI: javaURI,
    fetchOptions: fetchOptions,
    gameContainer: document.getElementById("gameContainer"),
    gameCanvas: document.getElementById("gameCanvas")
  };

  // Ensure GameEnv is available before calling Game.main
  if (GameEnv) {
    Game.main(environment); // Initialize the game with the environment settings
    GameController.init();  // Initialize the game controller
  } else {
    console.error('GameEnv is not defined or not properly imported');
  }

  document.getElementById("speedUpBtn").addEventListener("click", () => {
    GameController.increaseSpeed();
  });


  // Fetch logged-in user info from Flask backend
  function fetchUserInfo() {
    fetch(`${pythonURI}/api/id`, fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error("User not logged in");
        }
        return response.json();
      })
      .then(data => {
        const usernameElement = document.getElementById("username");
        usernameElement.textContent = `User: ${data.uid}`;
      })
      .catch(() => {
        // Do nothing; stays as Guest
      });
  }

  fetchUserInfo();

  function fetchAndDisplayHighScore() {
    fetch(`${pythonURI}/api/score/user`, fetchOptions)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch high score");
        return response.json();
      })
      .then(data => {
        const highScoreEl = document.getElementById("highScore");
        highScoreEl.textContent = data.score ?? 0;
      })
      .catch(err => {
        console.warn("Could not load high score:", err.message);
      });
  }

  fetchAndDisplayHighScore();

  // Handling the submit quiz button
  document.getElementById('submitQuizButton').addEventListener('click', function() {
    // Check if GameEnv is available
    if (typeof GameEnv !== 'undefined') {
      GameEnv.submitQuiz();  // If GameEnv is defined, submit the quiz
    } else {
      console.error('GameEnv is not defined');
    }
  });
/*
   function closeHighScorePopup() {
    document.getElementById('highScoreOverlay').style.display = 'none';
    document.getElementById('highScorePopup').style.display = 'none';
  }
*/
</script>

<div id="overlay"></div>

<div id="highScoreOverlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999;">
  <div id="highScorePopup" class="popup-page" style="display: none; background: #1e293b; color: white; padding: 2rem; border-radius: 1rem; max-width: 400px; margin: 100px auto; text-align: center;">
    <h2>🎉 New High Score!</h2>
    <p>Great job! You just beat your best score.</p>
    <button onclick="closeHighScorePopup()">Awesome!</button>

  </div>
</div>


<div id="popup" style="display: none;">
  <!-- Exit button -->
  <button onclick="closePopup()" style="position: absolute; top: 10px; right: 10px; font-size: 20px; background: none; border: none; cursor: pointer;">✖</button>

  <!-- NEW INTRO PAGE -->
  <div class="popup-page" id="page-0">
    <h2>Welcome to DNA Dynamite!</h2>
    <p>
      DNA is the instruction manual for all living things. It tells cells how to grow, function, and respond to the world. By studying DNA, scientists can understand how traits are passed down, why diseases happen, and how to create better medicines. One of the most important parts of DNA is how its pieces pair up—something called base pairing.
    </p>
    <p>
      <strong>Here we have created a game to help you understand base pairing!</strong>
    </p>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button style="visibility: hidden;">Back</button>
      <button onclick="nextPage(1)">Next</button>
    </div>
  </div>

  <div class="popup-page" id="page-1">
    <div id="dna-info">
      <h2>How DNA Works</h2>
      <p><strong>DNA</strong> is made up of four bases:</p>
      <ul>
        <li><strong>A</strong> (Adenine)</li>
        <li><strong>T</strong> (Thymine)</li>
        <li><strong>C</strong> (Cytosine)</li>
        <li><strong>G</strong> (Guanine)</li>
      </ul>
      <p>These bases always pair the same way:</p>
      <ul>
        <li><strong>A</strong> pairs with <strong>T</strong></li>
        <li><strong>C</strong> pairs with <strong>G</strong></li>
      </ul>
      <p>This pairing forms the structure of DNA and is how DNA copies itself during replication.</p>
    </div>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button onclick="prevPage(0)">Back</button>
      <button onclick="nextPage(2)">Next</button>
    </div>
  </div>
  
  <div class="popup-page" id="page-2" style="display: none;">
    <h2>How to Play</h2>
    <p>
      <img src="{{ site.baseurl }}/images/dna-dynamite/dnaexample.png" alt="DNA Strand" style="max-width: 100%; height: auto; margin-bottom: 20px;" />
      Type in the correct base in the yellow gaps as the strands move off the screen!
    </p>
    <p>
      - Adenine pairs with Thymine<br>
      - Guanine pairs with Cytosine
    </p>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button onclick="prevPage(1)">Back</button>
      <button onclick="nextPage(3)">Next</button>
    </div>
  </div>

  <div class="popup-page" id="page-3" style="display: none;">
    <h2>How to Play</h2>
    <p>
      <img src="{{ site.baseurl }}/images/dna-dynamite/wrongdna.png" alt="wrong DNA Strand" style="max-width: 100%; height: auto; margin-bottom: 20px;" />
      If you type in the correct base, the gap turns green. If the base is wrong, the gap turns red meaning that you have to quickly put the correct base before the strand goes away.
    </p>
    <p>
      - Adenine pairs with Thymine<br>
      - Guanine pairs with Cytosine
    </p>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button onclick="prevPage(2)">Back</button>
      <button onclick="nextPage(4)">Next</button>
    </div>
  </div>

  <div class="popup-page" id="page-4" style="display: none;">
    <h2>Game Rules</h2>
    <p>
<img 
  src="{{site.baseurl}}/images/dna-dynamite/image.png" 
  alt="quiz" 
  style="max-width: 50%; height: auto; margin: 0 auto 20px; display: block; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); border-radius: 8px;" 
/>
      If you fail to complete the strand before the strand moves off the screen, you lose a life. After three lives are lost, you must answer 3 trivia questions to continue playing. After answering the quiz, click restart to continue.
    </p>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button onclick="prevPage(3)">Back</button>
      <button onclick="nextPage(5)">Next</button>
    </div>
  </div>

  <div class="popup-page" id="page-5" style="display: none;">
    <h2>Good Luck!</h2>
    <p>Good luck and have fun!</p>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button onclick="prevPage(4)">Back</button>
      <button onclick="closePopup()">Start Game</button>
    </div>
  </div>
</div>
<script>
function openPopup() {
  document.getElementById("popup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
  // Show only page 0 initially
  document.querySelectorAll(".popup-page").forEach(page => {
    page.style.display = "none";
  });
  document.getElementById("page-0").style.display = "block";
}
function nextPage(pageNumber) {
  document.querySelectorAll('.popup-page').forEach(page => page.style.display = 'none');
  document.getElementById('page-' + pageNumber).style.display = 'block';
}
function prevPage(pageNumber) {
  document.querySelectorAll('.popup-page').forEach(page => page.style.display = 'none');
  document.getElementById('page-' + pageNumber).style.display = 'block';
}
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
</script>



<script>
  function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    nextPage(0); // Show the first actual page
  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }

  function closeHighScorePopup() {
    document.getElementById('highScoreOverlay').style.display = 'none';
    document.getElementById('highScorePopup').style.display = 'none';
  }

  // Show popup on page load
  window.onload = openPopup;

</script>


<template id="dna-strand-template-1">
  <div class="dna-container">
    <div class="strand top-strand">
      <div class="base left gc-pair">G</div>
      <div class="gap left" data-answer="C" contenteditable="true"></div>
      <div class="base left at-pair">A</div>
      <div class="base left at-pair">T</div>
      <div class="gap left" data-answer="C" contenteditable="true"></div>
      <div class="base left gc-pair">G</div>
      <div class="gap left" data-answer="T" contenteditable="true"></div>
      <div class="base left at-pair">T</div>
      <div class="gap left" data-answer="A" contenteditable="true"></div>
      <div class="base left at-pair">A</div>
    </div>
    <div class="strand bottom-strand">
      <div class="gap right" data-answer="C" contenteditable="true"></div>
      <div class="base right gc-pair">G</div>
      <div class="base right at-pair">T</div>
      <div class="gap right" data-answer="A" contenteditable="true"></div>
      <div class="base right gc-pair">G</div>
      <div class="base right gc-pair">C</div>
      <div class="base right at-pair">A</div>
      <div class="gap right" data-answer="A" contenteditable="true"></div>
      <div class="base right at-pair">T</div>
      <div class="base right at-pair">T</div>
    </div>
  </div>
</template>



<template id="dna-strand-template-2">
  <div class="dna-container">
    <div class="strand top-strand">
      <div class="base left at-pair">A</div>
      <div class="gap left" data-answer="A" contenteditable="true"></div>
      <div class="base left gc-pair">G</div>
      <div class="base left gc-pair">C</div>
      <div class="gap left" data-answer="G" contenteditable="true"></div>
      <div class="base left at-pair">T</div>
      <div class="gap left" data-answer="A" contenteditable="true"></div>
      <div class="base left gc-pair">C</div>
      <div class="gap left" data-answer="T" contenteditable="true"></div>
      <div class="base left gc-pair">G</div>
    </div>
    <div class="strand bottom-strand">
      <div class="gap right" data-answer="T" contenteditable="true"></div>
      <div class="base right at-pair">T</div>
      <div class="base right gc-pair">C</div>
      <div class="gap right" data-answer="G" contenteditable="true"></div>
      <div class="base right gc-pair">C</div>
      <div class="base right at-pair">A</div>
      <div class="base right at-pair">T</div>
      <div class="gap right" data-answer="G" contenteditable="true"></div>
      <div class="base right at-pair">A</div>
      <div class="base right gc-pair">C</div>
    </div>
  </div>
</template>


<template id="dna-strand-template-3">
  <div class="dna-container">
    <div class="strand top-strand">
      <div class="base left gc-pair">C</div>
      <div class="gap left" data-answer="T" contenteditable="true"></div>
      <div class="base left at-pair">A</div>
      <div class="base left gc-pair">G</div>
      <div class="gap left" data-answer="T" contenteditable="true"></div>
      <div class="base left gc-pair">C</div>
      <div class="gap left" data-answer="C" contenteditable="true"></div>
      <div class="base left gc-pair">G</div>
      <div class="gap left" data-answer="A" contenteditable="true"></div>
      <div class="base left at-pair">T</div>
    </div>
    <div class="strand bottom-strand">
      <div class="gap right" data-answer="G" contenteditable="true"></div>
      <div class="base right at-pair">A</div>
      <div class="base right at-pair">T</div>
      <div class="gap right" data-answer="C" contenteditable="true"></div>
      <div class="base right at-pair">A</div>
      <div class="base right gc-pair">G</div>
      <div class="base right gc-pair">G</div>
      <div class="gap right" data-answer="C" contenteditable="true"></div>
      <div class="base right at-pair">T</div>
      <div class="base right at-pair">A</div>
    </div>
  </div>
</template>
