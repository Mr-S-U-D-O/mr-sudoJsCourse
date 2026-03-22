"use strict";

function checkPasswordStrength(password) {
  // TODO: Return { strength: "weak"|"fair"|"good"|"strong", score: 0-100, feedback: [...] }
}

function validatePassword(password) {
  // TODO: Throw error if not meeting minimum requirements
}

function getStrengthRules() {
  // TODO: Return array of rule definitions
}

function evaluateRule(password, rule) {
  // TODO: Return true if rule passes
}

function computeScore(password) {
  // TODO: Return score 0-100 based on rules met
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Password Strength Checker",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  checkPasswordStrength,
  validatePassword,
  getStrengthRules,
  evaluateRule,
  computeScore,
  createProject,
};
