---
layout: template
title: Backend Documentation
description: Backend Documentation
permalink: /backend/
comments: True
categories: ['Backend']
toc: True
---

# Backend Documentation
<img src="{{ site.baseurl }}/images/dna-dynamite/backend-diagram.png" alt="My Image">

## APIs

**High Score API:** 
- Stores user high score into database
- Displayed on Leaderboard in game

**Gemini Quiz:**
- Gemini sourced DNA quiz questions
- Explaination on questions also sourced from Gemini
- Displayed on trivia quiz after losing three lives 

**Predict Risk Model:**
- Predicts risk of heart disease and stroke
- Takes risk factors as input
- Model trained based on risk factors 
- Equation for risk computed using coefficience from health studies data
- Average risk computed based on model and equation
- Displayed on Predict page

**Feedback Review Posts:**
- Creates posts under backend group Reviews
- Channels are Report a Bug, Suggestions, and Reviews
- Posts are filtered based on channel selected 
- Reviews are in backend under posts
- Displayed on Feedback page 



## Gemini API Integration for Trivia Quiz:
<br>
Our team is currently using a Gemini API to dynamically source trivia questions for the pop-up feature that appears when a player loses all three lives (the 3 hearts at the top right of the screen break). The gemini API ensures that the questions are random but also closely related to DNA and genetics, maintaining relevance to the game theme.
<br>
When a user loses their third life (the last heart breaks), the frontend fetches a trivia pop-up with a genetics-related question. To avoid any bias in question selection, the backend sends a custom prompt to the Gemini API, which responds with:
<br>
 - A trivia question<br>

 - Four answer choices<br>

 - The correct answer<br>

 - An explanation<br>

This information is then displayed on the frontend. If the user answers incorrectly, the explanation is shown to help reinforce genetics knowledge before the next attempt.<br>


<style>
    p {
        color: black
    }
    li {
        color: black
    }
</style>

<style>
    p {
        color: #000000
    }
</style>
