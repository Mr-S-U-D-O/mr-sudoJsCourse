"use strict";

/**
 * String Parsing & Tokenization - SOLUTION
 * Reference implementation showing parsing patterns
 */

function tokenizeExpression(expr) {
  if (typeof expr !== "string") throw new TypeError("expr must be string");

  const tokens = [];
  let i = 0;
  let currentNumber = "";

  while (i < expr.length) {
    const char = expr[i];

    if (/\d/.test(char)) {
      currentNumber += char;
    } else if (/[+\-*/]/.test(char)) {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = "";
      }
      tokens.push(char);
    } else if (char === " ") {
      // Skip whitespace
    } else {
      throw new Error(`Invalid character: ${char}`);
    }

    i++;
  }

  // Don't forget remaining number
  if (currentNumber) {
    tokens.push(currentNumber);
  }

  return tokens;
}

function validateTokens(tokens) {
  if (!Array.isArray(tokens)) throw new TypeError("tokens must be array");
  if (tokens.length === 0) throw new Error("empty tokens");

  // Must have odd length
  if (tokens.length % 2 === 0) {
    throw new Error("Invalid: expected to end with number");
  }

  for (let i = 0; i < tokens.length; i++) {
    const isNumber = /^\d+$/.test(tokens[i]);
    const isOperator = /^[+\-*/]$/.test(tokens[i]);

    if (i % 2 === 0 && !isNumber) {
      throw new Error(`Position ${i}: expected number, got ${tokens[i]}`);
    }
    if (i % 2 === 1 && !isOperator) {
      throw new Error(`Position ${i}: expected operator, got ${tokens[i]}`);
    }
  }
}

function parseCSV(line) {
  if (typeof line !== "string") throw new TypeError("line must be string");
  return line.split(",").map((v) => v.trim());
}

function templateVariables(template) {
  if (typeof template !== "string")
    throw new TypeError("template must be string");
  const matches = template.match(/\{\{(\w+)\}\}/g) || [];
  return matches.map((m) => m.replace(/\{\{|\}\}/g, ""));
}

module.exports = {
  tokenizeExpression,
  validateTokens,
  parseCSV,
  templateVariables,
};
