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
        </div>
        <!-- Icons -->
        <div class="flex gap-4 mt-6 text-sm text-blue-400 underline">
          <a href="{{ site.baseurl }}/profile" title="Profile">Settings</a>
          <a href="{{ site.baseurl }}/instructions" title="Help">Help</a>
        </div>
      </div>
    </div>

    <!-- Center Panel -->
  <div id="gameContainer" class="flex flex-col justify-center items-center relative bg-black">
      <!-- Game Canvas -->
      <canvas id="gameCanvas" class="w-[100%] h-[100%]"></canvas>

      <!-- Buckets at the bottom -->
   <div id="bucketButtons" class="flex justify-center items-center gap-6 mb-6">
        <button class="w-20 h-20 text-2xl font-bold bg-gray-800 rounded-xl shadow hover:bg-gray-700">A</button>
        <button class="w-20 h-20 text-2xl font-bold bg-gray-800 rounded-xl shadow hover:bg-gray-700">T</button>
        <button class="w-20 h-20 text-2xl font-bold bg-gray-800 rounded-xl shadow hover:bg-gray-700">G</button>
        <button class="w-20 h-20 text-2xl font-bold bg-gray-800 rounded-xl shadow hover:bg-gray-700">C</button>
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
</script>
