---
layout: base
title: DNA Dynamite
search_exclude: true
description: Illumina Pilot City Project
hide: true
menu: nav/home.html
---

<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #111;
  }

  /* Completely overrides all layout stuff */
  #gameContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vmin; /* Square */
    width: 90vmin;
    margin: 40px auto; /* Push it down and center horizontally */
    background-color: #111;
  }


  #gameContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vmin; /* Square */
    width: 90vmin;
    margin: 40px auto; /* Push it down and center horizontally */
    background-color: #111;
  }


  /* 💀 Kill off blog/post layout elements 
  header, nav, .page-title, .post-meta, .post-header, .post-content, footer {
    display: none !important;
  } */

  .wrapper, .container, main {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
  }
</style>




<div id="gameContainer">
  <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
  import Game from '{{site.baseurl}}/assets/js/dynamite/Game.js';
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
</script>
