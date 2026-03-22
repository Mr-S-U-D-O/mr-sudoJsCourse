# let Mini Drills

Try each drill before checking the answer.

## Drill 1: TDZ Prediction

```js
console.log(score);
let score = 8;
```

Answer:

- Throws ReferenceError.

## Drill 2: Block Scope

```js
{
  let theme = "light";
}
console.log(theme);
```

Answer:

- Throws ReferenceError.

## Drill 3: Reassignment vs Redeclaration

```js
let level = 1;
level = 2;
```

Question:

- Valid or invalid?

Answer:

- Valid.

Now this one:

```js
let level = 1;
let level = 2;
```

Answer:

- Invalid (SyntaxError).

## Drill 4: Loop Fresh Binding

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

Answer:

- 0, 1, 2

## Drill 5: Refactor Challenge

Refactor to improve safety:

```js
let taxRate = 0.2;
if (isVip) {
  let taxRate = 0.1;
  total = total + total * taxRate;
}
```

Target:

- Keep outer and inner scope intent clear.
- Avoid accidental shadowing confusion.
