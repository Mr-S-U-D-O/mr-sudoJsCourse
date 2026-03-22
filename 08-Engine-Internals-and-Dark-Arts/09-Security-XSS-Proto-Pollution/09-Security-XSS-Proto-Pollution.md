# Security-XSS-Proto-Pollution

## Concept
Imagine your codebase as a busy control room: every signal, dial, and switch has a type, a shape, and a behavior. In this exercise, you build a tiny inspector that keeps this room predictable by counting how values behave before they cause surprises.

## Challenge
Implement `solveSecurityXSSProtoPollution` in `09-Security-XSS-Proto-Pollution.js`.

Your function must:
- Accept an array of values as input.
- Return an object with `topic`, `total`, `truthyCount`, and `falsyCount`.
- Preserve the exact topic label `Security-XSS-Proto-Pollution` in the `topic` field.

## Pass Condition
Run: `npm run check 08-Engine-Internals-and-Dark-Arts/09-Security-XSS-Proto-Pollution`

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/Security
