# Type-Coercion

## Concept
Think like an electrical engineer reading control signals: tiny representation details can flip the behavior of an entire circuit.

## Difficulty
- Level: Lower-Intermediate
- Focus: connect syntax with predictable behavior in production code
- Lesson target: Type Coercion

## Learning Efficiency Sprint (20-30 minutes)
1. Read this lesson once and highlight words that feel fuzzy.
2. Sketch 2 tiny examples on paper before touching the keyboard.
3. Implement the function in one pass, then refactor only once.
4. Run tests and write a one-line note on each failed expectation.
5. Re-run after fixes and explain the trap case out loud.

## Challenge
Implement the function in 09-Type-Coercion.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with these fields:
  - topic: the exact label "Type-Coercion".
  - total: total number of values.
  - truthyCount: number of values where Boolean(value) is true.
  - falsyCount: number of values where Boolean(value) is false.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check 02-Intermediate-Core/09-Type-Coercion

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion
