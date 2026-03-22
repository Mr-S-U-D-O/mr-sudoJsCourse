# Observability

## Concept
Imagine your codebase as a busy control room: every signal, dial, and switch has a type, a shape, and a behavior. In this exercise, you build a tiny inspector that keeps this room predictable by counting how values behave before they cause surprises.

## Challenge
Implement `solveObservability` in `08-Observability.js`.

Your function must:
- Accept an array of values as input.
- Return an object with `topic`, `total`, `truthyCount`, and `falsyCount`.
- Preserve the exact topic label `Observability` in the `topic` field.

## Pass Condition
Run: `npm run check 06-The-Platform/08-Observability`

## Escape Hatch
https://nodejs.org/api/perf_hooks.html
