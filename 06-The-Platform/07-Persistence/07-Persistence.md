# Persistence

## Concept
Imagine your codebase as a busy control room: every signal, dial, and switch has a type, a shape, and a behavior. In this exercise, you build a tiny inspector that keeps this room predictable by counting how values behave before they cause surprises.

## Challenge
Implement `solvePersistence` in `07-Persistence.js`.

Your function must:
- Accept an array of values as input.
- Return an object with `topic`, `total`, `truthyCount`, and `falsyCount`.
- Preserve the exact topic label `Persistence` in the `topic` field.

## Pass Condition
Run: `npm run check 06-The-Platform/07-Persistence`

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
