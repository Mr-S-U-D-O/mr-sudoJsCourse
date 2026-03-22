# Garbage-Collection

## Concept
Imagine your codebase as a busy control room: every signal, dial, and switch has a type, a shape, and a behavior. In this exercise, you build a tiny inspector that keeps this room predictable by counting how values behave before they cause surprises.

## Challenge
Implement `solveGarbageCollection` in `03-Garbage-Collection.js`.

Your function must:
- Accept an array of values as input.
- Return an object with `topic`, `total`, `truthyCount`, and `falsyCount`.
- Preserve the exact topic label `Garbage-Collection` in the `topic` field.

## Pass Condition
Run: `npm run check 08-Engine-Internals-and-Dark-Arts/03-Garbage-Collection`

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management
