"use strict";

/**
 * CALCULATOR ENGINE STARTER
 * 
 * Goal: Parse and evaluate arithmetic expressions with correct operator precedence.
 * 
 * Example: "2 + 3 * 4" should return 14 (not 20)
 * 
 * Key Pattern:
 * Step 1: Tokenize - break string into tokens ['2', '+', '3', '*', '4']
 * Step 2: Validate - ensure tokens follow correct pattern
 * Step 3: Evaluate - apply precedence rules (* and / before + and -)
 */

/**
 * Tokenizes an arithmetic expression into an array of tokens.
 * 
 * TODO: Split expression by whitespace, operators, and numbers.
 * 
 * Example Input:  "2 + 3 * 4"
 * Expected Output: ['2', '+', '3', '*', '4']
 * 
 * @param {string} expression - The arithmetic expression to tokenize
 * @returns {string[]} Array of tokens (numbers and operators)
 * @throws {Error} if expression contains invalid characters
 */
function tokenize(expression) {
  // TODO: Implement tokenization
  // Hint: Loop through expression character by character
  // Hint: Build up number tokens digit by digit
  // Hint: Collect operators as single characters
  // Hint: Skip whitespace
}

/**
 * Validates that tokens form a valid expression.
 * 
 * TODO: Check that tokens alternate between number and operator.
 * 
 * Example Valid:   ['2', '+', '3'] ✓
 * Example Invalid: ['2', '+'] ✗ (missing final number)
 * Example Invalid: ['+', '2'] ✗ (starts with operator)
 * 
 * @param {string[]} tokens - Array of tokens to validate
 * @throws {Error} if token sequence is invalid
 */
function validateTokens(tokens) {
  // TODO: Implement validation
  // Hint: Ensure tokens.length is odd
  // Hint: Check that even indices (0, 2, 4...) are numbers
  // Hint: Check that odd indices (1, 3, 5...) are operators
}

/**
 * Evaluates tokens with correct operator precedence.
 * 
 * TODO: Apply * and / first (left-to-right), then + and -.
 * 
 * Example:
 * Input:  ['2', '+', '3', '*', '4']
 * Step 1: Apply * → ['2', '+', '12']
 * Step 2: Apply + → ['14']
 * Output: 14
 * 
 * @param {string[]} tokens - Array of tokens to evaluate
 * @returns {number} The calculated result
 * @throws {Error} if tokens are invalid or operation fails (e.g., division by zero)
 */
function evaluate(tokens) {
  // TODO: Implement evaluation
  // Hint: First pass: find all * and / operators, apply them
  // Hint: Second pass: find all + and - operators, apply them
  // Hint: Use splice() to remove processed elements
  // Hint: After each operation, you should have fewer tokens
}

/**
 * Main calculator function: tokenize, validate, and evaluate an expression.
 * 
 * TODO: Call the three helper functions in order.
 * 
 * Example Usage:
 * calculate("2 + 3 * 4") // returns 14
 * calculate("10 / 2 - 3") // returns 2
 * 
 * @param {string} expression - The arithmetic expression to calculate
 * @returns {number} The result of evaluating the expression
 * @throws {Error} if expression is invalid
 */
function calculate(expression) {
  // TODO: Implement main calculation
  // Hint: Tokenize first
  // Hint: Validate the tokens
  // Hint: Evaluate and return result
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Calculator Engine",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  tokenize,
  validateTokens,
  evaluate,
  calculate,
  createProject,
};
