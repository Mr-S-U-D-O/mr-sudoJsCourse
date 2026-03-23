"use strict";

/**
 * PASSWORD STRENGTH CHECKER
 *
 * Goal: Evaluate password security using weighted rules and provide feedback.
 *
 * Key Insight:
 * Rules are DATA, not logic. Define rules once, apply them dynamically.
 * This lets you change security policy without rewriting code.
 *
 * Rule Object Structure:
 * {
 *   id: "rule_id",
 *   test: (password) => boolean,  // Function that tests if rule passes
 *   weight: number,                // Points if this rule passes (0-100 total)
 *   message: "Human-readable message about what's missing"
 * }
 *
 * Pipeline:
 * password → evaluate each rule → sum weights → score (0-100)
 *          → determine strength (weak/fair/good/strong)
 *          → list failed rules as feedback
 */

/**
 * Returns the array of password strength rules to check against.
 *
 * @returns {object[]} Array of rule objects
 *
 * Each rule has:
 *   - id: unique identifier for the rule
 *   - test: function that returns true if password passes this rule
 *   - weight: points awarded if rule passes (sum should exceed 100 for flexibility)
 *   - message: human-readable message if rule fails
 *
 * TODO: Define at least 5 rules:
 * Rule 1: Length >= 8 characters (weight: 20)
 *         Pattern: /^.{8,}$/ or p.length >= 8
 * Rule 2: Contains uppercase letter (weight: 15)
 *         Pattern: /[A-Z]/
 * Rule 3: Contains lowercase letter (weight: 15)
 *         Pattern: /[a-z]/
 * Rule 4: Contains number (weight: 20)
 *         Pattern: /\d/ or /[0-9]/
 * Rule 5: Contains special character (weight: 30)
 *         Pattern: /[!@#$%^&*]/ or similar
 *
 * Structure example:
 * {
 *   id: "length8",
 *   test: (p) => p.length >= 8,
 *   weight: 20,
 *   message: "At least 8 characters"
 * }
 */
function getStrengthRules() {
  // TODO: Return array of rule objects
}

/**
 * Tests if a password passes a specific rule.
 *
 * @param {string} password - The password to test
 * @param {object} rule - The rule object with test function
 * @returns {boolean} True if password passes the rule
 *
 * Example:
 *   const rule = { test: (p) => p.length >= 8, ... };
 *   evaluateRule("short", rule);      // false
 *   evaluateRule("longpassword", rule);  // true
 *
 * TODO: Implement with one line:
 * Hint: Call rule.test(password) and return the result
 */
function evaluateRule(password, rule) {
  // TODO: Evaluate rule against password
}

/**
 * Computes an overall strength score from 0-100.
 *
 * @param {string} password - The password to score
 * @returns {number} Score from 0-100
 *
 * Example:
 *   computeScore("weak")     // 0 (fails all rules)
 *   computeScore("MyPassword")  // ~50
 *   computeScore("MyP@ssw0rd!") // 100
 *
 * TODO: Implement scoring:
 * Step 1: Get the rules from getStrengthRules()
 * Step 2: Initialize score = 0
 * Step 3: Loop through each rule
 *         If password passes rule (use evaluateRule):
 *           score += rule.weight
 * Step 4: Cap score at 100 using Math.min(100, score)
 * Step 5: Return the capped score
 *
 * Hint: Use for loop to iterate through rules
 * Hint: Sum weights of passing rules only
 */
function computeScore(password) {
  // TODO: Implement score calculation
}

/**
 * Checks password strength and returns detailed feedback.
 *
 * Main API function. Validates input, scores password, categorizes strength,
 * and lists failed rules as actionable feedback.
 *
 * @param {string} password - The password to check
 * @returns {object} { strength, score, feedback }
 *   - strength: "weak" | "fair" | "good" | "strong"
 *   - score: 0-100
 *   - feedback: array of reasons password could be stronger
 *
 * @throws {TypeError} if password is not a string
 *
 * Example:
 *   checkPasswordStrength("weak")
 *   → { strength: "weak", score: 0, feedback: ["At least 8 characters", "Contains uppercase letter", ...] }
 *
 *   checkPasswordStrength("MyP@ssw0rd!")
 *   → { strength: "strong", score: 100, feedback: [] }
 *
 * TODO: Implement with these steps:
 * Step 1: Type-check: if password is not a string, throw TypeError
 *         Hint: if (typeof password !== "string") throw new TypeError(...)
 * Step 2: Get rules: const rules = getStrengthRules()
 * Step 3: Compute score: const score = computeScore(password)
 * Step 4: Map score to strength level:
 *         if (score < 25) strength = "weak"
 *         else if (score < 50) strength = "fair"
 *         else if (score < 75) strength = "good"
 *         else strength = "strong"
 * Step 5: Generate feedback (list failed rules):
 *         const feedback = []
 *         for (const rule of rules) {
 *           if (!evaluateRule(password, rule)) {  // If rule FAILS
 *             feedback.push(rule.message)
 *           }
 *         }
 * Step 6: Return { strength, score, feedback }
 *
 * Hint: feedback array should be empty if password is strong
 * Hint: Feedback tells user what's missing, not what's correct
 */
function checkPasswordStrength(password) {
  // TODO: Implement password evaluation
}

/**
 * (Optional) Validates password against minimum requirements and throws if invalid.
 *
 * This is separate from checkPasswordStrength() which returns FEEDBACK.
 * validatePassword() is stricter—it FAILS if minimum bar isn't met.
 *
 * @param {string} password - The password to validate
 * @throws {Error} if password fails minimum validation
 *
 * Example:
 *   validatePassword("weak");     // Throws error
 *   validatePassword("Strong123!"); // Returns undefined (passes)
 *
 * TODO: Implement by:
 * Step 1: Call checkPasswordStrength(password)
 * Step 2: If strength is "weak", throw Error
 *         Hint: if (result.strength === "weak") throw new Error(...)
 * Step 3: Otherwise return silently (no return statement needed)
 *
 * Hint: This is stricter than checkPasswordStrength (for form submission)
 */
function validatePassword(password) {
  // TODO: Implement password validation (optional)
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
