import GameSetup from './GameSetup.js';

const Game = {
  main(env) {
    this.env = env;
    GameSetup.start(env.gameCanvas);
  },

  start() {
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
