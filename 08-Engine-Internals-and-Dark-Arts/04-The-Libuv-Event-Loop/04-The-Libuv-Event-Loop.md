# The-Libuv-Event-Loop

## Concept
Imagine your codebase as a busy control room: every signal, dial, and switch has a type, a shape, and a behavior. In this exercise, you build a tiny inspector that keeps this room predictable by counting how values behave before they cause surprises.

## Challenge
Implement `solveTheLibuvEventLoop` in `04-The-Libuv-Event-Loop.js`.

Your function must:
- Accept an array of values as input.
- Return an object with `topic`, `total`, `truthyCount`, and `falsyCount`.
- Preserve the exact topic label `The-Libuv-Event-Loop` in the `topic` field.

## Pass Condition
Run: `npm run check 08-Engine-Internals-and-Dark-Arts/04-The-Libuv-Event-Loop`

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
