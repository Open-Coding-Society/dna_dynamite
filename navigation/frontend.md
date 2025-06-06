---
layout: template
title: Frontend Documentation
description: Frontend Documentation
permalink: /frontend/
comments: True
categories: ['Frontend']
toc: True
---

<style>
/* Improve code tag readability inside prose */
.prose code {
  background-color: #f3f4f6; /* Tailwind gray-100 */
  color: #1e293b; /* Tailwind slate-800 */
  padding: 0.15rem 0.4rem;
  border-radius: 0.25rem;
  font-weight: 500;
  font-size: 0.875em;
}

/* Dark mode override */
.dark .prose code {
  background-color: #1e293b; /* slate-800 */
  color: #f8fafc; /* slate-50 */
}
</style>

## Overview

**DNA Dynamite** is a browser-based educational game that teaches DNA base-pairing (A–T and G–C) through interactive gameplay.  
This documentation describes the structure of the frontend codebase, including file roles, styling framework, and best practices for development.

---

## File Structure

**Directory:** `assets/js/dynamite/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `BaseMoving.js` | Controls how DNA strands scroll upward during gameplay.                    |
| `GameController.js` | Manages game controls like start, pause, resume, and speed changes.        |
| `GameEnv.js`    | Sets up the canvas, renders elements, and handles scoring and game state.  |
| `GameSetup.js`  | Initializes the game, including strand generation and UI components.       |
| `GameObject.js` | Defines object traits like collision detection and movement.               |
| `ScoreAPI.js`   | Handles high score data storage and retrieval.                             |

### Frontend Diagrams

<img src="{{ site.baseurl }}/images/dna-dynamite/dna_dynamite_architecture.png" alt="Arch" style="margin-left: 10px;">

---

## Entry Point

**`index.md`** acts as the main webpage that hosts the game.  
It integrates the game’s frontend logic and UI into a static site and loads game scripts and the canvas display.

---

## Styling

The project uses [Tailwind CSS](https://tailwindcss.com) for utility-first styling.

- **Layout & spacing:** `flex`, `grid`, `p-4`, `gap-4`
- **Typography:** `text-lg`, `font-bold`, `text-center`
- **Colors:** `bg-pink-500`, `text-black`, `hover:bg-pink-600`
- **Responsive design:** `sm:`, `md:`, `lg:`
