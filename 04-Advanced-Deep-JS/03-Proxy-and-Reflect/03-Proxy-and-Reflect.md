# Proxy-and-Reflect

## Concept
Think of this lesson as tuning a machine with many moving parts. Small decisions in data shape and control flow can either reduce friction or create hidden bugs.

## Difficulty
- Level: Upper-Intermediate
- Focus: model runtime internals and advanced language mechanics
- Lesson target: Proxy and Reflect

## Learning Efficiency Sprint (20-30 minutes)
1. Read this lesson once and highlight words that feel fuzzy.
2. Sketch 2 tiny examples on paper before touching the keyboard.
3. Implement the function in one pass, then refactor only once.
4. Run tests and write a one-line note on each failed expectation.
5. Re-run after fixes and explain the trap case out loud.

## Challenge
Implement the function in 03-Proxy-and-Reflect.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with these fields:
  - topic: the exact label "Proxy-and-Reflect".
  - total: total number of values.
  - truthyCount: number of values where Boolean(value) is true.
  - falsyCount: number of values where Boolean(value) is false.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check 04-Advanced-Deep-JS/03-Proxy-and-Reflect

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
