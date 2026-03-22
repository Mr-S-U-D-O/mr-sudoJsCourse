# var Core Lesson

## Big Idea

`var` is function-scoped, not block-scoped.

## Short Explanation

- `var` can be accessed before its declaration line because of hoisting.
- Before assignment, its value is `undefined`.
- `var` ignores block boundaries like `if`, `for`, and `while`.

## Quick Examples

```js
console.log(x); // undefined
var x = 5;
```

```js
if (true) {
  var age = 20;
}
console.log(age); // 20
```

## Check Your Understanding

- Is `var` block-scoped? No.
- Can `var` be redeclared in the same scope? Yes.
