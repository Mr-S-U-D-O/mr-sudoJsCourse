# var Self Quiz

Score yourself: 1 point per correct answer.

## Questions

1. var is scoped to:

- A) Block
- B) Function
- C) File

2. What does this print?

```js
console.log(x);
var x = 9;
```

3. True or false:

- var can be redeclared in the same scope.

4. Which keyword avoids block leakage by design?

- A) var
- B) let
- C) function

5. What is the biggest risk of var hoisting in beginner code?

6. What does this print?

```js
for (var i = 0; i < 2; i++) {
  setTimeout(() => console.log(i), 0);
}
```

## Answer Key

1. B
2. undefined
3. True
4. B
5. Access before assignment can hide logic errors.
6. 2 then 2

## Interpretation

- 6/6: Excellent
- 4-5/6: Solid foundation
- 0-3/6: Re-read 01-core and 02-visualizations
