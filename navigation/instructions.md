---
layout: post 
title: Instructions
search_exclude: true
permalink: /instructions/
---

# DNA Dynamite

Welcome to DNA Dynamite! Click the button below to view the instructions.

<button id="showPopup" onclick="openPopup()">Show Instructions</button>

<div id="overlay"></div>

<div id="popup">
  <h2>Welcome to DNA Dynamite</h2>
  <p>
    Here are the instructions to play:<br><br>
    Drag and drop the base pairs in the Bank of Bases to their corresponding spots on DNA to complete the strands.
    If the strand disappears before it's completed, you lose one life.
    If you lose three lives, you must answer 3 trivia questions to revive and keep playing.<br><br>
    **Base Pair Rules/Key:**<br>
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
    background-color: #d81b60;
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
    background-color: #ff1493; /* Darker pink on hover */
  }


  #showPopup {
    background-color: #007bff;
    color: #d81b60;
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
