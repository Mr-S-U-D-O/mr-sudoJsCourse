"use strict";

const metadata = {
  project: "Number Guessing Game",
  level: "Beginner",
  status: "reference",
};

function createGame(min = 1, max = 100, secretNumber = null) {
  return {
    min, max,
    secret: secretNumber !== null ? secretNumber : Math.floor(Math.random() * (max - min + 1)) + min,
    attempts: 0, maxAttempts: 10, won: false, guesses: []
  };
}

function makeGuess(game, guess) {
  if (game.won || game.attempts >= game.maxAttempts) throw new Error("Game over");
  const guessNum = parseInt(guess);
  if (isNaN(guessNum) || guessNum < game.min || guessNum > game.max) {
    throw new Error(`Guess must be ${game.min}-${game.max}`);
  }
  game.attempts++;
  const correct = guessNum === game.secret;
  if (correct) game.won = true;
  const result = correct ? "correct" : guessNum < game.secret ? "too-low" : "too-high";
  return { result, message: correct ? "Won!" : result };
}

function isGameWon(game) { return game.won; }
function isGameLost(game) { return !game.won && game.attempts >= game.maxAttempts; }
function getGameState(game) { return { attempts: game.attempts, won: game.won, lost: isGameLost(game) }; }
function getHints(game) { return game.guesses; }

function createProject(initialState = {}) {
  const state = {
    createdAt: new Date().toISOString(),
    ...initialState,
  };

  return {
    title: metadata.project,
    getState() {
      return { ...state };
    },
    describe() {
      return metadata.project + " (" + metadata.level + ")";
    },
  };
}

module.exports = {
  metadata,
  createGame,
  makeGuess,
  isGameWon,
  isGameLost,
  getGameState,
  getHints,
  createProject,
};
