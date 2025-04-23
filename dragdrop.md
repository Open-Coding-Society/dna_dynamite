---
layout: post
title: Drag and Drop
search_exclude: true
description: Illumina Pilot City Project drag and drop
permalink: /dragdrop
menu: nav/home.html
---

<div style="height: calc(100vh - 60px); width: 100vw; background-color: black; display: flex; justify-content: center; align-items: center;">
  <div id="gameContainer" style="width: 100%; height: 100%; position: relative;">
    <canvas id="gameCanvas" style="width: 100%; height: 100%; display: block;"></canvas>
  </div>
</div>

<script type="module">
  import main from '{{ site.baseurl }}/assets/js/dynamite/dragdroptest.js';

  const environment = {
    path: "{{ site.baseurl }}",
    gameContainer: document.getElementById("gameContainer"),
    gameCanvas: document.getElementById("gameCanvas")
  };

  main(environment);
</script>
