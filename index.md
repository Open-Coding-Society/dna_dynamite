---
layout: tailwind
title: DNA Dynamite
search_exclude: true
description: Illumina Pilot City Project
menu: nav/home.html
---

<script src="https://cdn.tailwindcss.com"></script>

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
          <ul class="text-sm space-y-1 mt-1">
            <li><button id="startBtn" class="hover:underline">▶️ Start</button></li>
            <li><button id="pauseBtn" class="hover:underline">⏸️ Pause</button></li>
            <li><button id="resumeBtn" class="hover:underline">⏩ Resume</button></li>
            <li><button id="restartBtn" class="hover:underline">🔁 Restart</button></li>
          </ul>
          <li id="deleteScoreLi" style="display: none;">
            <button id="deleteScoreBtn" class="hover:underline text-red-400">🗑️ Delete Score</button>
          </li>
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
      <canvas id="gameCanvas" class="w-[100%] h-[100%]"></canvas>
      <!-- Buckets at the bottom -->
      <div id="bucketButtons" class="flex justify-center items-center gap-6 mb-6 flex-wrap">
      <!-- Button A -->
      <button class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl font-bold bg-gray-800 rounded-xl shadow hover:bg-gray-700">
        A
      </button>
      <!-- Button T -->
      <button class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl font-bold bg-gray-800 rounded-xl shadow hover:bg-gray-700">
        T
      </button>
      <!-- Button G -->
      <button class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl font-bold bg-gray-800 rounded-xl shadow hover:bg-gray-700">
        G
      </button>
      <!-- Button C -->
      <button class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-2xl font-bold bg-gray-800 rounded-xl shadow hover:bg-gray-700">
        C
      </button>
      </div>
    </div>

    <!-- Right Panel -->
  <div class="p-4 bg-gray-900 flex flex-col justify-between items-center">
      <!-- Lives (dynamic) -->
      <div id="livesContainer" class="flex justify-center text-3xl space-x-2">
        <!-- GameEnv will populate this -->
      </div>

  <div class="text-center">
        <p class="font-bold">Trivia Accuracy</p>
        <p class="text-2xl mt-2" id="accuracy">✅ 90%</p>
      </div>
    </div>

  </div>
</div>

<script type="module">
  import Game from '{{site.baseurl}}/assets/js/dynamite/Game.js';
  import GameController from '{{site.baseurl}}/assets/js/dynamite/GameController.js';
  import { pythonURI, javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

  const environment = {
    path: "{{site.baseurl}}",
    pythonURI: pythonURI,
    javaURI: javaURI,
    fetchOptions: fetchOptions,
    gameContainer: document.getElementById("gameContainer"),
    gameCanvas: document.getElementById("gameCanvas")
  };

  Game.main(environment);
  GameController.init();

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

</script>

<div id="overlay"></div>

<div id="popup">
  <h2>Welcome to DNA Dynamite</h2>
  <p>
    Here are the instructions to play:<br><br>
    Type the base pairs in the Bank of Bases to their corresponding spots on DNA to complete the strands.
    If the strand disappears before it's completed, you lose one life.
    If you lose three lives, you must answer 3 trivia questions to revive and keep playing.<br><br>

    <B>Base Pair Rules/Key:</B><br>
    - Adenine pairs with Thymine <br>
    - Guanine pairs with Cytosine
  </p>
  <button onclick="closePopup()">OK</button>
</div>

<style>
  #popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #6A3946;
    padding: 20px;
    border: 2px solid black;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 1000;
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

  #popup button {
    margin-top: 10px;
    padding: 5px 10px;
  }

   #showPopup:hover {
    background-color: #6A3946; /* Darker pink on hover */
  }


  #showPopup {
    background-color: #007bff;
    color: #6A3946;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>

<script>
  function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }

  // Show popup on page load
  window.onload = openPopup;
</script>
