"use strict";

/**
 * PASSWORD STRENGTH CHECKER STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * data modeling, input validation, and deterministic functions
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

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
