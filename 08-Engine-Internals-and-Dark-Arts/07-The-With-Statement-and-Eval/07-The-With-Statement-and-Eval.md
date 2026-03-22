# The-With-Statement-and-Eval

## Concept
Treat this as threat modeling in a bank vault: convenience can become risk if boundaries and assumptions are not explicit.

## Difficulty
- Level: Expert+
- Focus: understand engine internals, performance behavior, and security edge cases
- Lesson target: The With Statement and Eval

## Learning Efficiency Sprint (20-30 minutes)
1. Read this lesson once and highlight words that feel fuzzy.
2. Sketch 2 tiny examples on paper before touching the keyboard.
3. Implement the function in one pass, then refactor only once.
4. Run tests and write a one-line note on each failed expectation.
5. Re-run after fixes and explain the trap case out loud.

## Challenge
Implement the function in 07-The-With-Statement-and-Eval.js.

Requirements:
- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with these fields:
  - topic: the exact label "The-With-Statement-and-Eval".
  - total: total number of values.
  - truthyCount: number of values where Boolean(value) is true.
  - falsyCount: number of values where Boolean(value) is false.
- Do not mutate the original input array.

## Pass Condition
Run: npm run check 08-Engine-Internals-and-Dark-Arts/07-The-With-Statement-and-Eval

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
