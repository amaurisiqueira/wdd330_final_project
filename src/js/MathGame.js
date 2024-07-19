// Global instance of MathGame
import MathGame from "./MathGame.mjs";
import { loadHeaderFooter } from "./utils.js";

const game = new MathGame();

// Initialize the game
game.startGame();
loadHeaderFooter();
