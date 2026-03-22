# let Real-World Patterns

## Loop Index Pattern

Use let in loops when callbacks are involved:

```js
for (let i = 0; i < tasks.length; i++) {
  setTimeout(() => runTask(tasks[i], i), 0);
}
```

Why:

- Each iteration gets its own i binding.

## Local Block Pattern

Use temporary block scopes to isolate short-lived values:

```js
let result;
{
  let parsed = JSON.parse(raw);
  result = normalize(parsed);
}
```

Why:

- parsed cannot leak outside the block.

## Mutable State Pattern

Use let for values that truly change over time:

```js
let retries = 0;
while (retries < 3) {
  retries += 1;
}
```

Why:

- Reassignment communicates state transitions clearly.

## Anti-Pattern to Avoid

Using let everywhere by habit.

Better:

- const for stable bindings.
- let for explicit reassignment.

## Reflection

Answer briefly:

- Where in your codebase do you currently misuse let?
- Which let variables should become const?
