"use strict";

const metadata = {
  project: "Dice Roller Stats",
  level: "Beginner",
  status: "reference",
};

let rollHistory = [];

function rollDice(sides = 6, count = 1) {
  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  rollHistory.push(...rolls);
  return rolls;
}

function getDistribution(rolls) {
  const dist = {};
  for (const roll of rolls) {
    dist[roll] = (dist[roll] || 0) + 1;
  }
  return dist;
}

function getStats(rolls) {
  if (rolls.length === 0) return null;
  const sorted = [...rolls].sort((a, b) => a - b);
  const sum = rolls.reduce((a, b) => a + b, 0);
  const mean = sum / rolls.length;
  const median = rolls.length % 2 === 0
    ? (sorted[rolls.length / 2 - 1] + sorted[rolls.length / 2]) / 2
    : sorted[Math.floor(rolls.length / 2)];
  const dist = getDistribution(rolls);
  const mode = Object.keys(dist).reduce((a, b) => dist[a] > dist[b] ? a : b);
  return { mean, median, mode: parseInt(mode), min: sorted[0], max: sorted[sorted.length - 1], distribution: dist };
}

function getRolls() {
  return rollHistory;
}

function simulateRolls(sides, count, trials) {
  const allRolls = [];
  for (let i = 0; i < trials; i++) {
    allRolls.push(...rollDice(sides, count));
  }
  return getStats(allRolls);
}

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
  rollDice,
  getStats,
  getDistribution,
  getRolls,
  simulateRolls,
  createProject,
};
