"use strict";

function createGame(min = 1, max = 100, secretNumber = null) {
  // TODO: Initialize game state, use secretNumber if provided else random
}

function makeGuess(game, guess) {
  // TODO: Return { result, message, gameState } after validating guess
}

function isGameWon(game) {
  // TODO: Return true if guess equals secret
}

function isGameLost(game) {
  // TODO: Return true if attempts exceeded
}

function getGameState(game) {
  // TODO: Return readable game state
}

function getHints(game) {
  // TODO: Return array of previous guesses and feedback
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Number Guessing Game",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createGame,
  makeGuess,
  isGameWon,
  isGameLost,
  getGameState,
  getHints,
  createProject,
};
