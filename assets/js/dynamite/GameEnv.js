import { submitHighScore } from './ScoreAPI.js';
import { pythonURI, javaURI, fetchOptions } from '../api/config.js';

export class GameEnv {
    static boxes = [];
    static canvas = null;
    static ctx = null;
    static lives = 3;
    static score = 0;
    static gameOver = false;
    static heartsContainer = null;
    static scoreContainer = null;
  
    constructor() {
      throw new Error("GameEnv is a static class and cannot be instantiated.");
    }

    static render(ctx) {
      for (let box of this.boxes) {
        box.draw(ctx);
      } 
    }
  
    static initialize(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
  
      const rect = canvas.getBoundingClientRect();
      this.innerWidth = rect.width;
      this.innerHeight = rect.height;
  
      canvas.width = this.innerWidth;
      canvas.height = this.innerHeight;
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
  
      this.createHeartsDisplay();
      this.createScoreDisplay();
    }
  
    static createHeartsDisplay() {
      this.heartsContainer = document.getElementById("livesContainer");
  
      if (!this.heartsContainer) {
        console.warn("Hearts container not found. Creating new one.");
        this.heartsContainer = document.createElement("div");
        this.heartsContainer.id = "livesContainer";
        this.heartsContainer.style.position = "absolute";
        this.heartsContainer.style.top = "10px";
        this.heartsContainer.style.right = "20px";
        this.heartsContainer.style.display = "flex";
        this.heartsContainer.style.flexDirection = "column"; // Stack hearts vertically
        this.heartsContainer.style.gap = "10px";
        document.body.appendChild(this.heartsContainer);
      }
  
      this.updateHeartsDisplay();
    }
  
    static createScoreDisplay() {
      this.scoreContainer = document.getElementById("scoreContainer");
  
      if (!this.scoreContainer) {
        console.warn("Score container not found. Creating new one.");
        this.scoreContainer = document.createElement("div");
        this.scoreContainer.id = "scoreContainer";
        this.scoreContainer.style.position = "absolute";
        this.scoreContainer.style.top = "200px"; // Position it below the hearts container
        this.scoreContainer.style.left = "90%"; // Center horizontally
        this.scoreContainer.style.transform = "translateX(-50%)"; // Center horizontally with offset
        this.scoreContainer.style.fontSize = "24px";
        this.scoreContainer.style.color = "white";
        this.scoreContainer.style.fontFamily = "Arial, sans-serif";
        this.scoreContainer.style.textAlign = "center"; // Ensure text is centered
        document.body.appendChild(this.scoreContainer);
      }
  
      this.updateScoreDisplay();
    }
  
    static updateScoreDisplay() {
      if (this.scoreContainer) {
        this.scoreContainer.innerHTML = "Score: " + this.score;
      }
    }
  
    static updateHeartsDisplay() {
      this.heartsContainer.innerHTML = ""; // Clear the current hearts display
      
        // Display the hearts
      for (let i = 0; i < 3; i++) {
        const heart = document.createElement("span");
      
          // If the life is lost, use the broken heart emoji
          if (i < this.lives) {
            heart.innerHTML = "❤️"; // Healthy heart
          } else {
            heart.innerHTML = ""; // No heart shown
          }
          
      
        heart.style.fontSize = "50px"; // Adjust the size of the hearts
        this.heartsContainer.appendChild(heart);
      }
    }
      
  
    static resize() {
      this.initialize(this.canvas);
    }
  
    static update() {
      if (this.gameOver) return;
  
      this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);
  
      for (let i = this.boxes.length - 1; i >= 0; i--) {
        const box = this.boxes[i];
        box.y += box.vy; // adjust speed here
      
        // Move the DOM element
        if (box.element) {
          box.element.style.top = box.y + "px";
          const strand = box.element.querySelector(".dna-container");
          if (strand && strand.isComplete && strand.isComplete()) {
            // ✅ COMPLETED
            box.element.remove();         // remove from screen
            this.boxes.splice(i, 1);      // remove from tracking array
            this.score++;                 // update score
            this.updateScoreDisplay();    // refresh UI
            continue;                     // skip further processing for this box
          }
        }
      
        // Remove if off-screen
        const gameContainer = document.getElementById("gameContainer");
        const containerTop = gameContainer.getBoundingClientRect().top + window.scrollY;
        const removalThreshold = containerTop + 50; // adjust 50px based on how tall your nav bar is
        
        if (box.y + box.element.offsetHeight < removalThreshold) {        

          this.boxes.splice(i, 1);
          if (box.element) box.element.remove();
      
          this.lives--;
          this.updateHeartsDisplay();
          if (this.lives <= 0) {
            this.endGame();
          }
        }
      }      
  
      this.updateScoreDisplay();
    }
  
    static endGame() {
  this.gameOver = true;
  showQuizModal();

  submitHighScore(this.score, fetchOptions, pythonURI);
}
  
    static addBox(box) {
      this.boxes.push(box);
      const container = document.getElementById("gameContainer");
      const containerRect = container.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const containerTop = containerRect.top + scrollTop;
      const containerHeight = container.offsetHeight;
      
      const dnaBoxHeight = 220; // or however tall your box actually is
      box.y = containerTop + containerHeight - dnaBoxHeight; // place the bottom row at the line
      // ✅ Set initial Y position to the bottom of the container relative to the page
      //box.y = containerTop + containerHeight - 60; // 130 = height of DNA box
      
      box.x = Math.random() * 60; // for variability

      // Create visual representation on screen
      const visualBox = document.createElement("div");
      // Example visual box creation
      visualBox.classList.add("dna-box");
      visualBox.style.position = "absolute";
      visualBox.style.top = "0px"; // will be updated by GameEnv.update()
      visualBox.style.left = "50%"; // center horizontally
      visualBox.style.transform = "translateX(-50%)"; // fix true centering
      visualBox.style.zIndex = "10"; // make sure it's above canvas      
      visualBox.style.width = "220px";
      visualBox.style.height = "130px";
      visualBox.style.backgroundColor = "transparent";
      visualBox.style.border = "none";
      visualBox.style.padding = "0";      
      visualBox.style.borderRadius = "8px";
      visualBox.style.display = "flex";
      visualBox.style.justifyContent = "center";

      // Add DNA strand
      const dnaPuzzle = createDnaPuzzleElement();
      visualBox.appendChild(dnaPuzzle);

      // Append to game container
      document.getElementById("gameContainer").appendChild(visualBox);

      // Optional: link to the box object if needed
      box.element = visualBox;
    }

  
    static handleClick(x, y) {
      for (let i = this.boxes.length - 1; i >= 0; i--) {
        const box = this.boxes[i];
        if (
          x >= box.x &&
          x <= box.x + box.width &&
          y >= box.y &&
          y <= box.y + box.height
        ) {
          this.boxes.splice(i, 1);
          this.score++;
          return;
        }
      }
    }
        // Inside GameEnv.js or relevant file
        static submitQuiz() {
          const quizContainer = document.getElementById("quiz-container");
          const feedbackContainer = document.querySelectorAll(".answer-feedback");
        
          let correctAnswers = 0;
        
          // Check the answers
          quizContainer.querySelectorAll(".question").forEach((question, index) => {
            const selectedAnswer = question.querySelector("input[type='radio']:checked");
            const feedback = document.getElementById("feedback" + index);
        
            if (selectedAnswer) {
              const answerLetter = selectedAnswer.value;
              const correctAnswer = selectedQuestions[index].answer;
        
              if (answerLetter === correctAnswer) {
                correctAnswers++;
                feedback.textContent = "Correct!";
                feedback.style.color = "green";
              } else {
                const explanation = selectedQuestions[index].explanation || "";
                feedback.textContent = `Incorrect! The correct answer was ${correctAnswer}. ${explanation}`;
                feedback.style.color = "pink";
              }
            } else {
              const explanation = selectedQuestions[index].explanation || "";
              feedback.textContent = `Please select an answer. ${explanation}`;
              feedback.style.color = "orange";
            }
          });
        
          // Provide feedback based on the number of correct answers
          alert(`You got ${correctAnswers} out of ${selectedQuestions.length} questions correct.`);
        
          // Close the quiz modal
          document.getElementById("closeQuizButton").addEventListener("click", () => {
            const modal = document.getElementById("quizModal");
            const overlay = document.querySelector(".quiz-overlay");
            modal.style.display = "none";
            if (overlay) overlay.style.display = "none";
          });
        }
        
  
    static reset() {
      // Remove all DNA elements from DOM
      for (let box of this.boxes) {
        if (box.element && box.element.parentNode) {
          box.element.parentNode.removeChild(box.element);
        }
      }
    
      // Clear box tracking
      this.boxes = [];
    
      // Reset game state
      this.lives = 3;
      this.score = 0;
      this.gameOver = false;
    
      // Reset visuals
      this.updateHeartsDisplay();
      this.updateScoreDisplay();
    
      const scoreElement = document.getElementById("score");
      if (scoreElement) scoreElement.textContent = "0";
    }
    
  }
  
  function createDnaPuzzleElement() {
    const templateIds = [
      "dna-strand-template-1",
      "dna-strand-template-2",
      "dna-strand-template-3"
    ];
    
    const randomId = templateIds[Math.floor(Math.random() * templateIds.length)];
    const template = document.getElementById(randomId);
    const clone = template.content.cloneNode(true);
    
    // const template = document.getElementById("dna-strand-template");
    // const clone = template.content.cloneNode(true);
  
    // Store a reference to this specific strand element
    const strandElement = clone.querySelector(".dna-container");

    // Attach custom function to the element
    strandElement.isComplete = function () {
      const gaps = this.querySelectorAll(".gap");
      for (const gap of gaps) {
        const val = gap.textContent.trim().toUpperCase();
        const answer = gap.getAttribute("data-answer");
        if (val !== answer) return false;
      }
      return true;
    };

    clone.querySelectorAll(".gap").forEach(gap => {
      gap.addEventListener("input", () => {
        setTimeout(() => {
          const input = gap.textContent.trim().toUpperCase().slice(0, 1);
          gap.textContent = input;
  
          const correct = gap.getAttribute("data-answer");
          if (input === correct) {
            gap.style.backgroundColor = "green";
            gap.style.color = "white";
          } else if (input.length === 0) {
            gap.style.backgroundColor = "#e6e600"; // yellow
            gap.style.color = "black";
          } else {
            gap.style.backgroundColor = "red";
            gap.style.color = "white";
          }
        }, 0);
      });
  
      gap.addEventListener("keydown", (e) => {
        if (!["A", "T", "C", "G"].includes(e.key.toUpperCase()) && e.key.length === 1) {
          e.preventDefault();
        }
      });
    });
  
    return clone;
  }

  let selectedQuestions = [];
  
  function showQuizModal() {
    console.log("Showing quiz modal..."); 
    const modal = document.getElementById("quizModal");
    const overlay = document.querySelector(".quiz-overlay");
  
    if (modal && overlay) {
      modal.style.display = "flex";  // Show the quiz modal
      overlay.style.display = "block";  // Show the overlay
      
      // You can fetch the question here if needed
      fetchRandomQuestion();  // Or load the trivia question
    }
  }
  
  
  function fetchRandomQuestion() {
    fetch(`${pythonURI}/api/geneticstrivia`, fetchOptions)
      .then(response => response.json())
      .then(data => {
        if (data && data.question && data.answer_options && data.correct_answer) {
          selectedQuestions = [{
            q: data.question,
            options: data.answer_options,
            answer: data.correct_answer,
            explanation: data.explanation
          }];

          GameEnv.currentQuestionData = data;  // Store full data, including explanation

          loadQuiz();
        } else {
          alert("Failed to fetch trivia question.");
        }
      })
      .catch(error => {
        console.error("Trivia error:", error);
        alert("Error loading question.");
      });
  }
  
  function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";
  
    selectedQuestions.forEach((question, index) => {
      let questionHTML = `<div class='question' id='q${index}'>
        <p>${question.q}</p>`;
  
      for (const [letter, text] of Object.entries(question.options)) {
        questionHTML += `<label><input type='radio' name='q${index}' value='${letter}'> ${letter}: ${text}</label>`;
      }
  
      questionHTML += `<p class='answer-feedback' id='feedback${index}'></p>`;
      questionHTML += `</div>`;
  
      quizContainer.innerHTML += questionHTML;
    });
  }

  

  
  export default GameEnv;
  