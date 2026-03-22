# var Common Mistakes

## Mistake 1: Assuming Block Scope

Problem:

```js
if (true) {
  var mode = "debug";
}
console.log(mode); // "debug"
```

Why this surprises people:

- They expect if blocks to hide variables.
- var ignores block boundaries and uses function scope.

Safer pattern:

- Use let or const inside blocks.

## Mistake 2: Using var in for Loops with Async Callbacks

Problem:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 3, 3, 3
```

Why it happens:

- All callbacks share one var binding.
- By the time callbacks run, i is already 3.

Safer pattern:

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 0, 1, 2
```

## Mistake 3: Redeclaring by Accident

Problem:

```js
var total = 10;
var total = 20; // allowed, often accidental
```

Risk:

- Silent overwrites make debugging harder.

Safer pattern:

- Prefer const by default, let when reassignment is required.

## Mistake 4: Reading Before Assignment

Problem:

```js
console.log(score); // undefined
var score = 42;
```

Risk:

- No immediate crash, but wrong data flow can pass quietly.

Safer pattern:

- Declare variables close to where you use them.
- Avoid relying on hoisting behavior.

## Quick Debug Checklist

- Is a variable visible outside an if/for block unexpectedly?
- Is there a repeated var declaration with the same name?
- Are async callbacks printing one repeated value?
- Are you seeing undefined where a value should exist?
