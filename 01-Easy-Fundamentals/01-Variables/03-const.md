# const

## Why This Matters
const is one of the most frequent sources of scope bugs in JavaScript interviews and production incidents.
This lesson focuses on reading runtime truthiness correctly while reinforcing declaration behavior.

## Learning Sprint (20-30 minutes)
1. Read the lesson and define the declaration rules in one sentence.
2. Implement the solution with input validation first.
3. Run tests and fix failures one-by-one.
4. Explain the trap test in plain English.

## Challenge
Implement the function in 03-const.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with fields topic, total, truthyCount, and falsyCount.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check 01-Easy-Fundamentals/01-Variables/03-const

## Learning Resources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Invalid_const_assignment
- https://javascript.info/object-copy
