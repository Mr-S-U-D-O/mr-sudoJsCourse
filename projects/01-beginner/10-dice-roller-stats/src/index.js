"use strict";

function rollDice(sides = 6, count = 1) {
  // TODO: Roll N dice with S sides each, return array of results
}

function getStats(rolls) {
  // TODO: Return { mean, median, mode, min, max, distribution }
}

function getDistribution(rolls) {
  // TODO: Return object mapping face values to frequencies
}

function getRolls() {
  // TODO: Return history of all rolls
}

function simulateRolls(sides, count, trials) {
  // TODO: Run many roll trials, return aggregate stats
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Dice Roller Stats",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  rollDice,
  getStats,
  getDistribution,
  getRolls,
  simulateRolls,
  createProject,
};
