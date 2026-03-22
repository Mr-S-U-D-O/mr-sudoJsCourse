# Modules

## Concept
This topic is like city planning: the goal is not just to build one road, but to design systems that remain clear and scalable as traffic grows.

## Difficulty
- Level: Intermediate
- Focus: reason about architecture, context, and asynchronous composition
- Lesson target: Modules

## Learning Efficiency Sprint (20-30 minutes)
1. Read this lesson once and highlight words that feel fuzzy.
2. Sketch 2 tiny examples on paper before touching the keyboard.
3. Implement the function in one pass, then refactor only once.
4. Run tests and write a one-line note on each failed expectation.
5. Re-run after fixes and explain the trap case out loud.

## Challenge
Implement the function in 08-Modules.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with these fields:
  - topic: the exact label "Modules".
  - total: total number of values.
  - truthyCount: number of values where Boolean(value) is true.
  - falsyCount: number of values where Boolean(value) is false.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check 03-Hard-Architecture/08-Modules

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
