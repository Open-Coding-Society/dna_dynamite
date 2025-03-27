---
layout: post
title: DNA Dynamite
search_exclude: true
description: Illumina Pilot City Project
hide: true
menu: nav/home.html
---


<style>
    .game-container {
        position: relative;
        margin: 60px auto; /* Centers the box horizontally */
        width: 400px;
        height: 400px;
        background-color: #3498db;
        overflow: hidden;
        border-radius: 10px;
    }
    .hearts {
        position: absolute;
        top: -20px; /* Moves hearts right above the game box */
        left: 5px;
        font-size: 24px;
        color: red;
        text-align: left;
        z-index: 10; /* Ensures the hearts are above the game box */
    }
    .block {
        position: absolute;
        width: 100%;
        height: 60px;
        background-color: #e74c3c;
        animation: scrollUp 6s linear infinite; /* Slowed down animation */
    }
    @keyframes scrollUp {
        from {
            top: 100%;
        }
        to {
            top: -30px;
        }
    }
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #333;
        color: white;
        padding: 10px;
    }
</style>


<div class="hearts">❤️❤️❤️</div>
<div class="game-container"></div>
<script>
    function createBlock() {
        const block = document.createElement("div");
        block.classList.add("block");
        document.querySelector(".game-container").appendChild(block);
        setTimeout(() => {
            block.remove();
        }, 10000); // Increased duration to match slower scroll
    }
    setInterval(createBlock, 2000);
</script>
