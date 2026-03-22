/**
 * Predict and explain var behavior - Solution Guide
 *
 * This solution shows example answers for var behavior prediction tests.
 * Your answers should match the behavior described below.
 */

function solveVar(question) {
  // Map questions to answers based on var behavior rules:
  // Rule 1: var is FUNCTION-scoped, not block-scoped
  // Rule 2: var declarations are hoisted and initialized as undefined
  // Rule 3: var can be redeclared (no error)
  // Rule 4: var can be reassigned

  const answers = {
    // Bronze: Hoisting - var is undefined before assignment
    "What prints: console.log(x) before var x = 5;": "undefined",

    // Bronze: var ignores block scope (if block)
    "After if block with var x = 1, what is x?": 1,

    // Silver: var ignores block scope (for loop)
    "After for(var i=0; i<3; i++), what is i?": 3,

    // Silver: var allows redeclaration
    "Is redeclaration allowed? var x=1; var x=2;": true,

    // Gold: Why is var function-scoped?
    "Why: var ignores if/for/while blocks?":
      "var is function-scoped, so it ignores block boundaries like if, for, and while.",

    // Gold: Explain the difference
    "Explain in one sentence why let is safer than var":
      "let respects block boundaries, preventing accidental scope leaks outside if/for/while blocks.",
  };

  return (
    answers[question] || "I'm not sure about that question. Reread the lesson!"
  );
}

module.exports = solveVar;
