export class GameEnv {
  static boxes = [];
  static canvas = null;
  static ctx = null;
  static innerWidth = window.innerWidth;
  static innerHeight = window.innerHeight;
  static lives = 3;
  static score = 0; // New score variable
  static gameOver = false;
  static heartsContainer = null;
  static scoreContainer = null; // New element to display score

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

      // Create hearts display when the game starts
      this.createHeartsDisplay();

      // Create or get the score container outside the game area
      this.createScoreDisplay();
  }

  static createHeartsDisplay() {
      this.heartsContainer = document.getElementById("livesContainer");

      if (!this.heartsContainer) {
          console.warn("Hearts container not found. Falling back to body.");
          this.heartsContainer = document.createElement("div");
          this.heartsContainer.style.position = "absolute";
          this.heartsContainer.style.top = "10px";
          this.heartsContainer.style.left = "50%";
          this.heartsContainer.style.transform = "translateX(-50%)";
          this.heartsContainer.style.display = "flex";
          this.heartsContainer.style.gap = "10px";
          document.body.appendChild(this.heartsContainer);
      }

      this.updateHeartsDisplay();
  }

    static createScoreDisplay() {
      // Check if the score container already exists
      this.scoreContainer = document.getElementById("scoreContainer");

      if (!this.scoreContainer) {
          console.warn("Score container not found. Creating new one.");
          // Create the score container div outside the game container
          this.scoreContainer = document.createElement("div");
          this.scoreContainer.id = "scoreContainer"; // Set the ID for future reference
          this.scoreContainer.style.position = "absolute";
          this.scoreContainer.style.top = "50px"; // Position it below the hearts container
          this.scoreContainer.style.left = "50%";
          this.scoreContainer.style.transform = "translateX(-50%)"; // Center it horizontally
          this.scoreContainer.style.fontSize = "24px";
          this.scoreContainer.style.color = "white"; // Set the text color to white
          this.scoreContainer.style.fontFamily = "Arial, sans-serif";
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
      this.heartsContainer.innerHTML = "";
      for (let i = 0; i < this.lives; i++) {
          const heart = document.createElement("span");
          heart.innerHTML = "❤️";
          heart.style.fontSize = "24px";
          this.heartsContainer.appendChild(heart);
      }
  }

  static resize() {
      this.initialize(this.canvas); // recalculate size
  }

  static update() {
      if (this.gameOver) return;

      // Clear canvas
      this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight);

      // Update boxes
      for (let i = this.boxes.length - 1; i >= 0; i--) {
          const box = this.boxes[i];
          box.update();
          box.draw(this.ctx);

          if (box.y + box.height < 0) {
              this.boxes.splice(i, 1);
              this.lives--;
              this.updateHeartsDisplay();
              if (this.lives <= 0) {
                  this.endGame();
              }
          }
      }

      // Update the score display
      this.updateScoreDisplay();
  }

  static endGame() {
      this.gameOver = true;
      alert("Game Over!");
  }

  static addBox(box) {
      this.boxes.push(box);
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
              this.boxes.splice(i, 1); // "blast" the box
              this.score++; // Increase score by 1
              return;
          }
      }
  }

  static reset() {
    this.boxes = [];
    this.lives = 3;
    this.gameOver = false;
    this.updateHeartsDisplay();
  }
  
}

export default GameEnv;
