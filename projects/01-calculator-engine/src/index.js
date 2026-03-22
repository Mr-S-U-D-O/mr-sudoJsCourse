/**
 * Student starter scaffold.
 * Goal: implement a safe expression evaluator without eval.
 */

function tokenize(expression) {
  // TODO: split expression into tokens (numbers/operators/parentheses)
  if (typeof expression !== "string") {
    throw new TypeError("expression must be a string");
  }

  return [];
}

function toRpn(tokens) {
  // TODO: convert infix tokens to RPN using a stack
  if (!Array.isArray(tokens)) {
    throw new TypeError("tokens must be an array");
  }

  return [];
}

function evaluateRpn(rpnTokens) {
  // TODO: compute result from RPN stack
  if (!Array.isArray(rpnTokens)) {
    throw new TypeError("rpnTokens must be an array");
  }

  return 0;
}

function evaluateExpression(expression) {
  const tokens = tokenize(expression);
  const rpnTokens = toRpn(tokens);
  return evaluateRpn(rpnTokens);
}

module.exports = {
  tokenize,
  toRpn,
  evaluateRpn,
  evaluateExpression,
};