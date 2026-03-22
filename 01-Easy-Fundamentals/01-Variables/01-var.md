# var

## Why This Matters
var is one of the most frequent sources of scope bugs in JavaScript interviews and production incidents.
This lesson focuses on reading runtime truthiness correctly while reinforcing declaration behavior.

## Learning Sprint (20-30 minutes)
1. Read the lesson and define the declaration rules in one sentence.
2. Implement the solution with input validation first.
3. Run tests and fix failures one-by-one.
4. Explain the trap test in plain English.

## Challenge
Implement the function in 01-var.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with fields topic, total, truthyCount, and falsyCount.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check 01-Easy-Fundamentals/01-Variables/01-var

## Learning Resources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
- https://javascript.info/var
- https://developer.mozilla.org/en-US/docs/Glossary/Hoisting
