---
layout: post 
title: DNA Unzipping  
search_exclude: true
permalink: /dna_unzip/
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.10.11/interact.min.js"></script>
    <style>
        body { text-align: center; font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .dna-container { display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative; height: 300px; }
        .strand { display: flex; justify-content: center; align-items: center; position: relative; transition: transform 1s ease-in-out; }
        .base { width: 50px; height: 50px; text-align: center; line-height: 50px;
                border-radius: 50%; font-size: 20px; font-weight: bold; margin: 5px; }
        .left { background: lightblue; }
        .right { background: lightcoral; }
        .gap { border: 2px dashed black; background: yellow; cursor: pointer; width: 50px; height: 50px; }
        .draggable { background: lightgreen; cursor: grab; display: inline-block; padding: 10px; margin: 10px; border-radius: 10px; }
    </style>
</head>
<body>
    <h1>Interactive DNA Helix</h1>
    <div class="dna-container">
        <div class="strand" id="top-strand">
            <div class="base left">A</div>
            <div class="gap left" id="gap1"></div>
            <div class="base left">C</div>
            <div class="base left">G</div>
            <div class="gap left" id="gap2"></div>
            <div class="base left">T</div>
        </div>
        <div class="strand" id="bottom-strand">
            <div class="gap right" id="gap3"></div>
            <div class="base right">T</div>
            <div class="gap right" id="gap4"></div>
            <div class="base right">G</div>
            <div class="base right">A</div>
            <div class="gap right" id="gap5"></div>
        </div>
    </div>
    <h3>Drag Bases to Fill the Gaps</h3>
    <div class="draggable" id="T" draggable="true">T</div>
    <div class="draggable" id="A" draggable="true">A</div>
    <div class="draggable" id="C" draggable="true">C</div>
    <div class="draggable" id="G" draggable="true">G</div>
    
    <script>
        // Function to unzip the DNA strands
        function unzipDNA() {
            gsap.to("#top-strand", { y: -50, duration: 1 });
            gsap.to("#bottom-strand", { y: 50, duration: 1 });
        }
        
        // Automatically unzip DNA once the page loads
        window.onload = function() {
            unzipDNA();
        };
        
        interact(".draggable").draggable({
            inertia: true,
            autoScroll: true,
            listeners: {
                move(event) {
                    event.target.style.transform = `translate(${event.pageX - 50}px, ${event.pageY - 50}px)`;
                }
            }
        });
        
        interact(".gap").dropzone({
            accept: ".draggable",
            ondrop(event) {
                let base = event.relatedTarget.innerText;
                let correctPairs = {
                    gap1: "T", gap2: "A", gap3: "A", gap4: "C", gap5: "T"
                };
                if (correctPairs[event.target.id] === base) {
                    event.target.innerText = base;
                    event.relatedTarget.remove();
                }
            }
        });
    </script>
</body>
</html>

