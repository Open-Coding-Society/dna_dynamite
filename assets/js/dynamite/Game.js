import GameSetup from './GameSetup.js';

const Game = {
  main: function (env) {
    GameSetup.start(env.gameCanvas);
  }
};

export default Game;
