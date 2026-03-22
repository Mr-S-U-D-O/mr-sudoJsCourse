# The-Event-Loop

## Concept
Imagine your codebase as a busy control room: every signal, dial, and switch has a type, a shape, and a behavior. In this exercise, you build a tiny inspector that keeps this room predictable by counting how values behave before they cause surprises.

## Challenge
Implement `solveTheEventLoop` in `01-The-Event-Loop.js`.

Your function must:
- Accept an array of values as input.
- Return an object with `topic`, `total`, `truthyCount`, and `falsyCount`.
- Preserve the exact topic label `The-Event-Loop` in the `topic` field.

## Pass Condition
Run: `npm run check 04-Advanced-Deep-JS/01-The-Event-Loop`

## Escape Hatch
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop
