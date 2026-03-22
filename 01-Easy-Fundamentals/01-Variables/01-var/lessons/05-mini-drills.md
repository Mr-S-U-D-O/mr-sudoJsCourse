# var Mini Drills

Try each drill before checking the answer.

## Drill 1: Predict the Output

```js
console.log(a);
var a = 5;
console.log(a);
```

Answer:

- First log: undefined
- Second log: 5

## Drill 2: Scope Leak Spotting

```js
if (true) {
  var city = "Nairobi";
}
console.log(city);
```

Question:

- Does this throw an error?

Answer:

- No. It logs Nairobi.

## Drill 3: Redeclaration

```js
var count = 1;
var count = 2;
console.log(count);
```

Question:

- Is this syntax valid?
- What logs?

Answer:

- Valid syntax.
- Logs 2.

## Drill 4: Loop Callback Trap

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

Question:

- What prints?

Answer:

- 3, 3, 3

## Drill 5: Refactor Challenge

Rewrite this to avoid var pitfalls:

```js
var user = "A";
if (true) {
  var status = "active";
}
for (var i = 0; i < 2; i++) {
  setTimeout(() => console.log(i, user, status), 0);
}
```

Target:

- Use const and let.
- Keep status scoped only where needed.
- Ensure loop logs 0 then 1.
