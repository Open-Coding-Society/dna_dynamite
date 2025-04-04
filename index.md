---
layout: base
title: DNA Dynamite
search_exclude: true
description: Illumina Pilot City Project
hide: true
menu: nav/home.html
---

<script src="https://cdn.tailwindcss.com"></script>

<div class="h-screen w-screen flex bg-black text-white font-sans overflow-hidden">
  <!-- Left Panel -->
  <div class="w-1/5 p-4 flex flex-col justify-between bg-gray-900">
    <div>
      <!-- Username + Login -->
      <div class="flex items-center justify-between mb-4">
        <span id="username" class="text-sm font-bold">User: Guest</span>
        <a href="{{ site.baseurl }}/login" class="text-sm text-blue-300 underline">Login</a>
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
      </div>
      <!-- Icons -->
      <div class="flex space-x-4 mt-6">
        <a href="{{ site.baseurl }}/profile" title="Profile"><img src="{{ site.baseurl }}/assets/icons/settings.svg" alt="Settings" class="h-6 w-6" /></a>
        <a href="{{ site.baseurl }}/instructions" title="Help"><img src="{{ site.baseurl }}/assets/icons/help.svg" alt="Help" class="h-6 w-6" /></a>
      </div>
    </div>
    
  </div>

  <div id="gameContainer" class="flex-1 flex flex-col justify-center items-center relative bg-black">


  <!-- Game Canvas -->
  <canvas id="gameCanvas" class="w-[90vmin] h-[90vmin] mb-6"></canvas>

  <!-- Buckets at the bottom -->
  <div id="bucketButtons" class="flex justify-center items-center gap-8 mt-4 mb-6">
    <button class="w-24 h-24 bg-blue-700 text-white text-4xl font-bold rounded-lg shadow-lg hover:bg-blue-600 transition-all">A</button>
    <button class="w-24 h-24 bg-green-700 text-white text-4xl font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all">T</button>
    <button class="w-24 h-24 bg-yellow-500 text-black text-4xl font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition-all">G</button>
    <button class="w-24 h-24 bg-pink-700 text-white text-4xl font-bold rounded-lg shadow-lg hover:bg-pink-600 transition-all">C</button>
  </div>

</div>

  <!-- Right Panel -->
  <div class="w-1/5 p-4 bg-gray-900 flex flex-col justify-between items-center">
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

<script type="module">
  import Game from '{{site.baseurl}}/assets/js/dynamite/Game.js';
  import GameController from '{{site.baseurl}}/assets/js/dynamite/GameController.js';
  // import Background from '{{site.baseurl}}/assets/js/dynamite/Background.js';
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
</script>
