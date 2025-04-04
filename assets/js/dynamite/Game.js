import GameSetup from './GameSetup.js';

const Game = {
  env: null,

  main(env) {
    this.env = env; // Store the environment, but don't start yet
  },

  start() {
    if (!this.env) {
      console.warn("Game environment not initialized.");
      return;
    }
    GameSetup.start(this.env.gameCanvas);
  },

  pause() {
    GameSetup.pause();
  },

  resume() {
    GameSetup.resume();
  },

  restart() {
    GameSetup.restart();
  }
};

export default Game;
