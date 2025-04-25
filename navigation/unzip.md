---
layout: post 
title: DNA Unzipping  
search_exclude: true
permalink: /dna_unzip/
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Interactive DNA Helix</title>
  <style>
    body {
      text-align: center;
      font-family: Arial, sans-serif;
      background-color: #111;
      color: white;
    }

    .dna-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 300px;
    }

    .strand {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-bottom: 10px;
    }

    .base, .gap {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 50%;
      font-size: 20px;
      font-weight: bold;
      margin: 5px;
      outline: none;
    }

    .base.left { background: lightblue; }
    .base.right { background: lightcoral; }
    .gap.left { background: yellow; border: 2px dashed black; }
    .gap.right { background: yellow; border: 2px dashed black; }
  </style>
</head>
<body>
  <h1>Interactive DNA Helix</h1>

  <div class="dna-container">
    <div class="strand" id="top-strand">
      <div class="base left">A</div>
      <div class="gap left" id="gap1" contenteditable="true"></div>
      <div class="base left">C</div>
      <div class="base left">G</div>
      <div class="gap left" id="gap2" contenteditable="true"></div>
      <div class="base left">T</div>
    </div>

    <div class="strand" id="bottom-strand">
      <div class="gap right" id="gap3" contenteditable="true"></div>
      <div class="base right">T</div>
      <div class="gap right" id="gap4" contenteditable="true"></div>
      <div class="base right">C</div>
      <div class="base right">A</div>
      <div class="gap right" id="gap5" contenteditable="true"></div>
    </div>
  </div>

  <h3>Type Bases Into the Gaps</h3>

  <script>
   const correctPairs = {
    gap1: "A", // T on bottom, so top must be A
    gap2: "T", // A on bottom, so top must be T
    gap3: "T", // A on top, so bottom must be T
    gap4: "G", // C on top, so bottom must be G
    gap5: "A"  // T on top, so bottom must be A
    };

    

    let complete = 0;

    function checkCompletion() {
      let isComplete = true;

      for (let gapId in correctPairs) {
        let gap = document.getElementById(gapId);
        let userInput = gap.textContent.trim().toUpperCase();

        // Clean and restrict to 1 capital letter
        if (userInput.length > 1) userInput = userInput[0];
        gap.textContent = userInput;

        if (userInput !== correctPairs[gapId]) {
          isComplete = false;
        }
      }

      complete = isComplete ? 1 : 0;
      console.log("Complete:", complete);
    }

    // Update validation on every keystroke
    Object.keys(correctPairs).forEach(id => {
      const gap = document.getElementById(id);
      
      gap.addEventListener("input", () => {
        // Delay so DOM finishes rendering input
        setTimeout(() => checkCompletion(), 0);
      });

      gap.addEventListener("keydown", (e) => {
        // Allow only A, T, C, G, and basic keys
        if (!["A", "T", "C", "G"].includes(e.key.toUpperCase()) && e.key.length === 1) {
          e.preventDefault();
        }
      });
    });

    // Optional animation on load
    window.onload = () => {
      document.getElementById("top-strand").style.transform = "translateY(-30px)";
      document.getElementById("bottom-strand").style.transform = "translateY(30px)";
    };
  </script>
</body>
</html>
