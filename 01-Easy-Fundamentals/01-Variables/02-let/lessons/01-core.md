# let Core Lesson

## Big Idea

`let` is block-scoped.

## Short Explanation

- `let` only exists inside the block where it is declared.
- `let` cannot be redeclared in the same scope.
- Accessing `let` before declaration throws `ReferenceError` (Temporal Dead Zone).

## Quick Examples

```js
if (true) {
  let count = 1;
}
console.log(count); // ReferenceError
```

```js
let name = "A";
// let name = "B"; // SyntaxError
```

## Check Your Understanding

- Is `let` safer than `var` for loops? Yes.
- Can `let` be used before declaration? No.
