export class GameEnv {
    static boxes = [];
    static canvas = null;
    static ctx = null;
    static innerWidth = window.innerWidth;
    static innerHeight = window.innerHeight;
    static lives = 3;
    static gameOver = false;
    static heartsContainer = null;

    constructor() {
      throw new Error("GameEnv is a static class and cannot be instantiated.");
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
    }

    static createHeartsDisplay() {
      // Instead of appending a floating div, grab the existing one from the DOM
      this.heartsContainer = document.getElementById("livesContainer");
  
      // Fallback if it's missing (optional)
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
  

    static updateHeartsDisplay() {
        this.heartsContainer.innerHTML = ""; // Clear previous hearts
        for (let i = 0; i < this.lives; i++) {
            const heart = document.createElement("span");
            heart.innerHTML = "❤️"; // Red heart emoji
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
          return;
        }
      }
    }
}

export default GameEnv;
