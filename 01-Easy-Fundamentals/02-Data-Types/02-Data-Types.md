# Data-Types

## Concept

Think like an electrical engineer reading control signals: tiny representation details can flip the behavior of an entire circuit.

## Difficulty

- Level: Beginner
- Focus: build confidence with syntax and core runtime behavior
- Lesson target: Data Types

## Learning Efficiency Sprint (20-30 minutes)

1. Read this lesson once and highlight words that feel fuzzy.
2. Sketch 2 tiny examples on paper before touching the keyboard.
3. Implement the function in one pass, then refactor only once.
4. Run tests and write a one-line note on each failed expectation.
5. Re-run after fixes and explain the trap case out loud.

## Challenge

Implement the function in 02-Data-Types.js.

Requirements:

- Accept exactly one argument named values.
- Throw TypeError with the message "values must be an array" when the input is not an array.
- Return an object with these fields:
  - topic: the exact label "Data-Types".
  - total: total number of values.
  - truthyCount: number of values where Boolean(value) is true.
  - falsyCount: number of values where Boolean(value) is false.
- Do not mutate the original input array.

## Pass Condition

Run this exact command from the repo root:

```bash
npm run check "01-Easy-Fundamentals/02-Data-Types"
```

Do not run only the folder path by itself in PowerShell.

## Escape Hatch

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
