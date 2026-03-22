"use strict";

const metadata = {
  project: "Password Strength Checker",
  level: "Beginner",
  status: "reference",
};

function getStrengthRules() {
  return [
    {
      id: "length8",
      test: (p) => p.length >= 8,
      weight: 20,
      message: "At least 8 characters",
    },
    {
      id: "uppercase",
      test: (p) => /[A-Z]/.test(p),
      weight: 15,
      message: "Contains uppercase letter",
    },
    {
      id: "lowercase",
      test: (p) => /[a-z]/.test(p),
      weight: 15,
      message: "Contains lowercase letter",
    },
    {
      id: "numbers",
      test: (p) => /\d/.test(p),
      weight: 20,
      message: "Contains number",
    },
    {
      id: "special",
      test: (p) => /[!@#$%^&*]/.test(p),
      weight: 30,
      message: "Contains special character",
    },
  ];
}

function evaluateRule(password, rule) {
  return rule.test(password);
}

function computeScore(password) {
  const rules = getStrengthRules();
  let score = 0;
  for (const rule of rules) {
    if (evaluateRule(password, rule)) {
      score += rule.weight;
    }
  }
  return Math.min(100, score);
}

function checkPasswordStrength(password) {
  if (typeof password !== "string") {
    throw new TypeError("Password must be a string");
  }

  const score = computeScore(password);
  const rules = getStrengthRules();

  let strength;
  if (score < 25) strength = "weak";
  else if (score < 50) strength = "fair";
  else if (score < 75) strength = "good";
  else strength = "strong";

  const feedback = [];
  for (const rule of rules) {
    if (!evaluateRule(password, rule)) {
      feedback.push(rule.message);
    }
  }

  return { strength, score, feedback };
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    throw new Error("Password must contain uppercase, lowercase, and number");
  }
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
  checkPasswordStrength,
  validatePassword,
  getStrengthRules,
  evaluateRule,
  computeScore,
  createProject,
};
