# Strict-vs-Sloppy-Mode

## Concept
Imagine your codebase as a busy control room: every signal, dial, and switch has a type, a shape, and a behavior. In this exercise, you build a tiny inspector that keeps this room predictable by counting how values behave before they cause surprises.

## Challenge
Implement `solveStrictVsSloppyMode` in `06-Strict-vs-Sloppy-Mode.js`.

Your function must:
- Accept an array of values as input.
- Return an object with `topic`, `total`, `truthyCount`, and `falsyCount`.
- Preserve the exact topic label `Strict-vs-Sloppy-Mode` in the `topic` field.

## Pass Condition
Run: `npm run check 08-Engine-Internals-and-Dark-Arts/06-Strict-vs-Sloppy-Mode`

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
