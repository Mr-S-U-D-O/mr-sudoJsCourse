# Array-Methods

## Concept
Picture a conveyor belt in a factory. Each transformation should be intentional, measurable, and free of accidental side effects.

## Difficulty
- Level: Lower-Intermediate
- Focus: connect syntax with predictable behavior in production code
- Lesson target: Array Methods

## Learning Efficiency Sprint (20-30 minutes)
1. Read this lesson once and highlight words that feel fuzzy.
2. Sketch 2 tiny examples on paper before touching the keyboard.
3. Implement the function in one pass, then refactor only once.
4. Run tests and write a one-line note on each failed expectation.
5. Re-run after fixes and explain the trap case out loud.

## Challenge
Implement the function in 04-Array-Methods.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with these fields:
  - topic: the exact label "Array-Methods".
  - total: total number of values.
  - truthyCount: number of values where Boolean(value) is true.
  - falsyCount: number of values where Boolean(value) is false.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check 02-Intermediate-Core/04-Array-Methods

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
