import GameEnv from "./GameEnv.js";

let intervalId = null;
let animationFrameId = null;
let canvasRef = null;
let isRunning = false; // ✅ Add this
let strandCount = 0;
let hasSpawnedBefore = false;
const DEFAULT_BOX_SPEED = -0.5;
const DEFAULT_INTERVAL = 8000;
let boxSpeed = DEFAULT_BOX_SPEED; // negative because boxes move upward
let currentInterval = DEFAULT_INTERVAL; // starting interval (8 seconds)

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
  
    if (!hasSpawnedBefore) {
      this.spawnStrand(); // ✅ Only spawn immediately the first time
      hasSpawnedBefore = true;
    }
  
    intervalId = setInterval(() => this.spawnStrand(), currentInterval);
  },
  
  spawnStrand() {
    if (GameEnv.gameOver) return;
  
    const boxHeight = 40;
    const canvasHeight = GameEnv.canvas.height; // Get actual canvas height
    const spawnY = canvasHeight - boxHeight; // Spawn it *inside* the canvas at the bottom

    const box = new Box(
      0,
      spawnY,
      GameEnv.innerWidth,
      boxHeight,
      boxSpeed
    );
    GameEnv.addBox(box);
    strandCount++;
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
    GameEnv.reset();
    boxSpeed = DEFAULT_BOX_SPEED;
    currentInterval = DEFAULT_INTERVAL;
    clearInterval(intervalId);
    intervalId = setInterval(() => this.spawnStrand(), currentInterval);
    hasSpawnedBefore = false; // ✅ Allow first spawn again
    this.start(canvasRef);
  },

  onClick(e) {
    const rect = canvasRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    GameEnv.handleClick(x, y);
  }, 
  
  manualSpeedUp() {
    boxSpeed -= 0.5;
  
    // Update speed of all existing boxes
    GameEnv.boxes.forEach(box => {
      box.vy = boxSpeed;
    });
  
    // ✅ Recalculate spawn interval
    const baseGap = 300; // desired pixel spacing between strands
    const fps = 60;
    const msPerFrame = 1000 / fps;
    currentInterval = (baseGap / Math.abs(boxSpeed)) * msPerFrame;
  
    // Reset interval timer
    clearInterval(intervalId);
    intervalId = setInterval(() => this.spawnStrand(), currentInterval);
  
    console.log(`Speed: ${boxSpeed}px/frame | New spawn interval: ${Math.round(currentInterval)}ms`);
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
    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default GameSetup;
