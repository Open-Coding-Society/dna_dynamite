import GameEnv from "./GameEnv.js";

let intervalId = null;
let animationFrameId = null;
let canvasRef = null;
let isRunning = false; // ✅ Add this

const GameSetup = {
  start(canvas) {
    if (isRunning) return; // ✅ Prevent multiple starts
    isRunning = true;
  
    canvasRef = canvas;
    GameEnv.initialize(canvas);
  
    this.startSpawning();
    this.startLoop();
  
    canvas.addEventListener("click", this.onClick);
  },

  startSpawning() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (!GameEnv.gameOver) {
        const boxHeight = 40;
        const box = new Box(
          0,
          GameEnv.innerHeight,
          GameEnv.innerWidth,
          boxHeight,
          -2
        );
        GameEnv.addBox(box);
      }
    }, 1000);
  },

  startLoop() {
    const loop = () => {
      GameEnv.update();
      GameEnv.render(GameEnv.ctx); // optional: add a render method if you want separation
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
  },

  pause() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    isRunning = false;
  },

  resume() {
    if (!intervalId) this.startSpawning();
    if (!animationFrameId) this.startLoop();
  },

  restart() {
    this.pause();
    GameEnv.reset(); // You'll need this in GameEnv.js
    this.start(canvasRef);
  },

  onClick(e) {
    const rect = canvasRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    GameEnv.handleClick(x, y);
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
