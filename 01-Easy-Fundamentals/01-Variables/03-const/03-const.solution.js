/**
 * Predict and explain const behavior - Solution Guide
 *
 * This solution shows example answers for const behavior prediction tests.
 * Your answers should match the behavior described below.
 */

function solveConst(question) {
  // Map questions to answers based on const behavior rules:
  // Rule 1: const binding cannot be reassigned (TypeError)
  // Rule 2: const DOES NOT prevent mutation of objects/arrays
  // Rule 3: const requires initialization
  // Rule 4: const is BLOCK-scoped like let

  const answers = {
    // Bronze: Cannot reassign const primitive
    "Can you reassign const x = 5 to x = 10?": false,

    // Bronze: const requires initialization
    "Is this allowed? const x; x = 5;": false,

    // Silver: Can modify object properties with const
    "Can object properties change? const obj = {name: 'Alice'}; obj.name = 'Bob';": true,

    // Silver: Cannot reassign const object reference
    "Can you reassign the object? const obj = {}; obj = {};": false,

    // Gold: Can modify array contents with const
    "Can array elements change? const arr = [1,2,3]; arr[0] = 99;": true,

    // Gold: Cannot reassign const array reference
    "Can you reassign the array? const arr = []; arr = [1,2,3];": false,

    // Gold: Explain const protection scope
    "What does const protect: the binding or the contents?":
      "const protects the binding (you can't reassign the variable), but not the contents (you can mutate objects/arrays).",

    // Throwback: const block scope
    "After block { const x = 1; }, is x accessible?": "no",

    // Comparison: Why prefer const
    "Why should you use const by default?":
      "const signals intent that the variable won't be reassigned, which prevents accidental mutations and makes code easier to understand.",
  };

  return (
    answers[question] || "I'm not sure about that question. Reread the lesson!"
  );
}

module.exports = solveConst;
