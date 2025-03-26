---
layout: post 
title: Trivia Questions
search_exclude: true
permalink: /trivia/
---

# Hello
<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #fce4ec;
    text-align: center;
  }
  .heart-container {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;
  }
  .heart {
    font-size: 50px;
    cursor: pointer;
    transition: transform 0.3s, color 0.3s;
  }
  .heart:hover {
    transform: scale(1.2);
  }
  .heart.broken {
    color: red;
    transform: scale(1.2);
  }
  .quiz-container {
    display: none;
    padding: 20px;
    border-radius: 15px;
    background: #d81b60;
    width: 80%;
    max-width: 400px;
    margin: 20px auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
  h2 {
    color: #d81b60;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    margin-bottom: 10px;
  }
  label {
    display: block;
    text-align: left;
    margin: 5px 0;
  }
  button {
    background-color: #d81b60;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }
  button:hover {
    background-color: #ad1457;
  }
</style>

<div class="heart-container">
  <span class="heart" onclick="breakHeart(0)">❤️</span>
  <span class="heart" onclick="breakHeart(1)">❤️</span>
  <span class="heart" onclick="breakHeart(2)">❤️</span>
</div>

<div class="quiz-container" id="quiz">
  <h2>Sample Question</h2>
  <p>Which of the following is TRUE about mutation?</p>
  <form>
    <label><input type="radio" name="mutation"> A) Acceptable variations in the ‘normal’ DNA and protein sequences</label>
    <label><input type="radio" name="mutation"> B) The exchange of DNA between chromosomes during meiosis.</label>
    <label><input type="radio" name="mutation"> C) The movement of a ribosome from one reading frame to another at an internal position within a gene</label>
    <label><input type="radio" name="mutation"> D) A DNA repair process that corrects various types of DNA damage by excising and resynthesizing a region of polynucleotide</label>
    <label><input type="radio" name="mutation"> E) Permanent, heritable alterations in the base sequence of the DNA.</label>
    <button type="button">Submit</button>
  </form>
</div>

<script>
  let brokenHearts = 0;

  function breakHeart(index) {
    const hearts = document.querySelectorAll('.heart');
    if (!hearts[index].classList.contains('broken')) {
      hearts[index].textContent = '💔';
      hearts[index].classList.add('broken');
      brokenHearts++;
    }
    if (brokenHearts === 3) {
      document.getElementById('quiz').style.display = 'block';
    }
  }
</script>