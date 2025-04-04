// GameController.js
import Game from './Game.js';
import GameEnv from './GameEnv.js';

export default class GameController {
  static initialized = false;

  static init() {
    if (this.initialized) return;
    this.initialized = true;

    this.bindUIEvents();
  }

  static bindUIEvents() {
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resumeBtn = document.getElementById("resumeBtn");
    const restartBtn = document.getElementById("restartBtn");

    if (startBtn) {
      startBtn.addEventListener("click", () => GameController.startGame());
    }
    if (pauseBtn) {
      pauseBtn.addEventListener("click", () => GameController.pauseGame());
    }
    if (resumeBtn) {
      resumeBtn.addEventListener("click", () => GameController.resumeGame());
    }
    if (restartBtn) {
      restartBtn.addEventListener("click", () => GameController.restartGame());
    }
    console.log("Binding button events...");
    console.log("Start Button:", document.getElementById("startBtn"));

  }

  static startGame() {
    console.log("Starting game...");
    Game.start();
  }

  static pauseGame() {
    console.log("Pausing game...");
    Game.pause();
  }

  static resumeGame() {
    console.log("Resuming game...");
    Game.resume();
  }

  static restartGame() {
    console.log("Restarting game...");
    Game.restart();
  }
}
