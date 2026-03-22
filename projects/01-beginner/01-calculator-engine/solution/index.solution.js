"use strict";

/**
 * CALCULATOR ENGINE - REFERENCE SOLUTION
 *
 * This implementation demonstrates:
 * - Tokenization: breaking a string into meaningful pieces
 * - Validation: ensuring input is well-formed
 * - Evaluation: applying operator precedence (BODMAS/PEMDAS)
 *
 * Key insight: Separating concerns (parsing vs evaluating) makes code testable.
 */

const metadata = {
  project: "Calculator Engine",
  level: "Beginner",
  status: "reference",
};

/**
 * Tokenizes an arithmetic expression into tokens.
 * Handles whitespace and validates characters.
 */
function tokenize(expression) {
  if (typeof expression !== "string") {
    throw new TypeError("expression must be a string");
  }

  if (expression.trim().length === 0) {
    throw new Error("expression cannot be empty");
  }

  const tokens = [];
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    // Skip whitespace
    if (/\s/.test(char)) {
      i++;
      continue;
    }

    // Read number (digits and decimal point)
    if (/\d/.test(char)) {
      let num = "";
      while (i < expression.length && /[\d.]/.test(expression[i])) {
        num += expression[i];
        i++;
      }
      tokens.push(num);
      continue;
    }

    // Read operator
    if (/[+\-*/]/.test(char)) {
      tokens.push(char);
      i++;
      continue;
    }

    // Invalid character
    throw new Error(
      `Invalid character at position ${i}: '${char}'. ` +
        `Only digits, operators (+, -, *, /), and whitespace are allowed.`,
    );
  }

  return tokens;
}

/**
 * Validates that token sequence is correct.
 * Pattern: number operator number operator ... number
 */
function validateTokens(tokens) {
  if (!Array.isArray(tokens)) {
    throw new TypeError("tokens must be an array");
  }

  if (tokens.length === 0) {
    throw new Error("expression cannot be empty");
  }

  // Must have odd number of tokens (number, op, number, op, ... number)
  if (tokens.length % 2 === 0) {
    throw new Error("expression cannot end with an operator");
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isOperator = /^[+\-*/]$/.test(token);
    const isNumber = /^\d+(\.\d+)?$/.test(token);

    if (i % 2 === 0) {
      // Even positions should be numbers
      if (!isNumber) {
        throw new Error(`Expected number at position ${i}, got '${token}'`);
      }
    } else {
      // Odd positions should be operators
      if (!isOperator) {
        throw new Error(`Expected operator at position ${i}, got '${token}'`);
      }
    }
  }
}

/**
 * Evaluates tokens with correct precedence.
 * Uses two-pass approach:
 * 1. Apply all * and / operations (left to right)
 * 2. Apply all + and - operations (left to right)
 */
function evaluate(tokens) {
  validateTokens(tokens);

  // Convert string numbers to actual numbers
  const processed = tokens.map((token) => {
    if (/^\d/.test(token)) {
      return parseFloat(token);
    }
    return token;
  });

  // First pass: handle * and /
  for (let i = 1; i < processed.length; i += 2) {
    const operator = processed[i];
    const left = processed[i - 1];
    const right = processed[i + 1];

    if (operator === "*") {
      const result = left * right;
      processed.splice(i - 1, 3, result);
      i -= 2; // Back up to check next operator
    } else if (operator === "/") {
      if (right === 0) {
        throw new Error("Division by zero is not allowed");
      }
      const result = left / right;
      processed.splice(i - 1, 3, result);
      i -= 2;
    }
  }

  // Second pass: handle + and -
  for (let i = 1; i < processed.length; i += 2) {
    const operator = processed[i];
    const left = processed[i - 1];
    const right = processed[i + 1];

    const result = operator === "+" ? left + right : left - right;

    processed.splice(i - 1, 3, result);
    i -= 2;
  }

  // After both passes, should have single number left
  if (processed.length !== 1) {
    throw new Error("Failed to evaluate expression correctly");
  }

  return processed[0];
}

/**
 * Main entry point: parse and evaluate an expression.
 */
function calculate(expression) {
  const tokens = tokenize(expression);
  const result = evaluate(tokens);
  return result;
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
  tokenize,
  validateTokens,
  evaluate,
  calculate,
  createProject,
};
