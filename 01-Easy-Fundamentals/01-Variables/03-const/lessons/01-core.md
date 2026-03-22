# const Core Lesson

## Big Idea

`const` locks the variable binding, not the object/array contents.

## Short Explanation

- `const` must be initialized immediately.
- `const` cannot be reassigned.
- Objects/arrays declared with `const` can still be mutated.

## Quick Examples

```js
const x = 1;
// x = 2; // TypeError
```

```js
const user = { name: "A" };
user.name = "B"; // allowed
```

## Check Your Understanding

- Can you reassign a const variable? No.
- Can you change a property inside a const object? Yes.
