"use strict";

/**
 * String Parsing & Tokenization - STARTER
 *
 * Goal: Break strings into tokens systematically
 */

/**
 * Tokenize a simple arithmetic expression.
 * Example: "2 + 3 * 4" → ["2", "+", "3", "*", "4"]
 *
 * TODO: Implement character-by-character parsing
 * - Build multi-digit numbers
 * - Recognize operators (+, -, *, /)
 * - Skip whitespace
 * - Throw on invalid characters
 */
function tokenizeExpression(expr) {
  // TODO: Implement
}

/**
 * Validate that tokens follow valid pattern.
 * Pattern: number, operator, number, operator, ..., number
 *
 * TODO: Check length is odd, even positions are numbers, odd positions are operators
 */
function validateTokens(tokens) {
  // TODO: Implement
}

/**
 * Parse CSV line into values.
 * Example: "John,30,NYC" → ["John", "30", "NYC"]
 *
 * TODO: Use appropriate method (split, tokenize, or pattern matching)
 */
function parseCSV(line) {
  // TODO: Implement
}

/**
 * Extract variable names from template string.
 * Example: "Hello {{name}}, you are {{age}} years old"
 * Returns: ["name", "age"]
 *
 * TODO: Find all {{variable}} patterns and extract names
 */
function templateVariables(template) {
  // TODO: Implement
}

module.exports = {
  tokenizeExpression,
  validateTokens,
  parseCSV,
  templateVariables,
};
