import GameEnv from "./GameEnv.js";

const GameSetup = {
  start: function (canvas) {
    GameEnv.initialize(canvas);

    // Spawn a box every 1.5 seconds
    setInterval(() => {
      if (!GameEnv.gameOver) {
        const boxHeight = 40;
        const box = new Box(
          0, // x from left edge
          GameEnv.innerHeight, // y from bottom
          GameEnv.innerWidth, // full width of square
          boxHeight,
          -2 // uniform upward speed
        );
        GameEnv.addBox(box);
      }
    }, 1000); // 1 second interval for even spacing
    

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      GameEnv.handleClick(x, y);
    });

    function gameLoop() {
      GameEnv.update();
      requestAnimationFrame(gameLoop);
    }

    gameLoop();
  }
};

// Box class
class Box {
  constructor(x, y, width, height, vy) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.vy = vy;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
  }

  update() {
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default GameSetup;
