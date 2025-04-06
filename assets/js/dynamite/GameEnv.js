export class GameEnv {
    static boxes = [];
    static canvas = null;
    static ctx = null;
    static innerWidth = window.innerWidth;
    static innerHeight = window.innerHeight;
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
        this.scoreContainer.style.top = "170px"; // Position it below the hearts container
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
        heart.innerHTML = "💔"; // Broken heart when lives are lost
        }
      
        heart.style.fontSize = "24px"; // Adjust the size of the hearts
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
          this.boxes.splice(i, 1);
          this.score++;
          return;
        }
      }
    }
  
    static reset() {
      this.boxes = [];
      this.lives = 3;
      this.score = 0; // Reset score
      this.gameOver = false;

      this.updateHeartsDisplay(); // Reset heart UI

    // ✅ Reset score (assumes you store it here)
    this.score = 0;
    const scoreElement = document.getElementById("score");
    if (scoreElement) scoreElement.textContent = "0";
    }

  }
  
  export default GameEnv;
  