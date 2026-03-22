# Classes

## Concept
Treat objects like a family tree where traits are inherited. The challenge is understanding where behavior comes from and who owns each property at runtime.

## Difficulty
- Level: Intermediate
- Focus: reason about architecture, context, and asynchronous composition
- Lesson target: Classes

## Learning Efficiency Sprint (20-30 minutes)
1. Read this lesson once and highlight words that feel fuzzy.
2. Sketch 2 tiny examples on paper before touching the keyboard.
3. Implement the function in one pass, then refactor only once.
4. Run tests and write a one-line note on each failed expectation.
5. Re-run after fixes and explain the trap case out loud.

## Challenge
Implement the function in 04-Classes.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with these fields:
  - topic: the exact label "Classes".
  - total: total number of values.
  - truthyCount: number of values where Boolean(value) is true.
  - falsyCount: number of values where Boolean(value) is false.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check 03-Hard-Architecture/04-Classes

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
