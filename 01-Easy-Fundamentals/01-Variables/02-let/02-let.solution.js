/**
 * Predict and explain let behavior - Solution Guide
 *
 * This solution shows example answers for let behavior prediction tests.
 * Your answers should match the behavior described below.
 */

function solveLet(question) {
  // Map questions to answers based on let behavior rules:
  // Rule 1: let is BLOCK-scoped (respects if, for, while, {})
  // Rule 2: let cannot be redeclared
  // Rule 3: let has a Temporal Dead Zone (can't use before declaration)
  // Rule 4: let can be reassigned

  const answers = {
    // Bronze: Block scope - let inside block
    "After { let x = 1; }, is x accessible outside?": false,

    // Bronze: let inside if block
    "After if (true) { let x = 1; }, what is result?": "ReferenceError",

    // Silver: let dies at end of for loop
    "After for(let i=0; i<3; i++), can you access i?": false,

    // Silver: You cannot redeclare let
    "Is this allowed? let x = 1; let x = 2;": false,

    // Gold: Temporal Dead Zone
    "What happens? console.log(x); let x = 5;": "ReferenceError",

    // Gold: Block scope fixes the loop bug
    "Why does let i in for loops prevent callback bugs?":
      "Each loop iteration gets its own scope, so the callback captures the correct value of i.",

    // Gold: let vs var main difference
    "In one sentence, why is let safer than var?":
      "let respects block boundaries, preventing accidental scope leaks.",

    // Advanced: Understanding Temporal Dead Zone
    "What is the Temporal Dead Zone?":
      "The space between a function/block start and a let/const declaration where the variable exists but cannot be accessed.",

    // Comparison: When to use let
    "Should you use let instead of var?": "yes",
  };

  return (
    answers[question] || "I'm not sure about that question. Reread the lesson!"
  );
}

module.exports = solveLet;
