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
    </div>

    <!-- Right Panel -->
  <div class="p-4 bg-gray-900 flex flex-col justify-between items-center">
      <!-- Lives (dynamic) -->
      <div id="livesContainer" class="flex justify-center text-3xl space-x-2">
        <!-- GameEnv will populate this -->
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

<div id="popup" style="display: none;">
  <!-- Exit button -->
  <button onclick="closePopup()" style="position: absolute; top: 10px; right: 10px; font-size: 20px; background: none; border: none; cursor: pointer;">✖</button>

  <div class="popup-page" id="page-1">
    <h2>Welcome to DNA Dynamite!</h2>
    <p>
      DNA is made up of four bases—Adenine (A), Thymine (T), Cytosine (C), and Guanine (G)—which pair specifically: A with T, and C with G. This base pairing is the foundation of DNA structure and how it's copied during replication. Illumina uses this exact principle in its DNA sequencing technology. By reading the order of these base pairs, Illumina’s machines can decode entire genomes. This helps scientists and doctors understand genetics better, leading to breakthroughs in research, diagnostics, and personalized medicine.
    </p>
    <p>
      Let's get to know these base pairings more by playing DNA Dynamite!
    </p>
    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
      <button style="visibility: hidden;">Back</button> <!-- Hidden Back button on first page -->
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
      <img src="{{ site.baseurl }}/images/dna-dynamite/quizexample.png" alt="quiz" style="max-width: 50%; height: auto; margin: 0 auto 20px; display: block;" />
      If you fail to complete the strand before the strand moves off the screen, you lose a life. After three lives are lost, you must answer 3 trivia questions to continue playing.
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
  document.getElementById('popup').style.display = 'block';
  nextPage(1); // always jump to page 1 when opening
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

<style>
  #popup {
  position: fixed; /* Keep it fixed on the screen even when scrolling */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center it */
  background: #6A3946;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: none; /* Keeps it hidden initially */
}

.popup-page {
  /* Add any general styling for each page here */
  padding: 20px;
  text-align: center;
}

#popup button {
  padding: 8px 16px;
  font-size: 16px;
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

</style>

<script>
  function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    function openPopup() {
    // Go straight to page 1 when opening
    nextPage(1);
  }

  }

  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }

  // Show popup on page load
  window.onload = openPopup;
</script>

<template id="dna-strand-template">
  <div class="dna-container">
    <div class="strand top-strand">
      <div class="base left">A</div>
      <div class="gap left" data-answer="A" contenteditable="true"></div>
      <div class="base left">G</div>
      <div class="base left">C</div>
      <div class="gap left" data-answer="G" contenteditable="true"></div>
      <div class="base left">T</div>
      <div class="gap left" data-answer="A" contenteditable="true"></div>
      <div class="base left">C</div>
      <div class="gap left" data-answer="T" contenteditable="true"></div>
      <div class="base left">G</div>
    </div>
    <div class="strand bottom-strand">
      <div class="gap right" data-answer="T" contenteditable="true"></div>
      <div class="base right">T</div>
      <div class="base right">C</div>
      <div class="gap right" data-answer="G" contenteditable="true"></div>
      <div class="base right">C</div>
      <div class="base right">A</div>
      <div class="base right">T</div>
      <div class="gap right" data-answer="G" contenteditable="true"></div>
      <div class="base right">A</div>
      <div class="base right">C</div>
    </div>
  </div>
</template>

