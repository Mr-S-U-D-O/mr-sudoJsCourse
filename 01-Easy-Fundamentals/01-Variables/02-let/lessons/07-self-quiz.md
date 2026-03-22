# let Self Quiz

Score yourself: 1 point per correct answer.

## Questions

1. let is scoped to:

- A) Function
- B) Block
- C) Global only

2. What happens here?

```js
console.log(value);
let value = 3;
```

3. True or false:

- let can be redeclared in the same scope.

4. What prints?

```js
for (let i = 0; i < 2; i++) {
  setTimeout(() => console.log(i), 0);
}
```

5. Which is better when a value never changes?

- A) let
- B) const

6. Why is let often safer than var in loops?

## Answer Key

1. B
2. ReferenceError
3. False
4. 0 then 1
5. B
6. Each iteration gets its own binding, preventing shared index bugs.

## Interpretation

- 6/6: Excellent
- 4-5/6: Strong
- 0-3/6: Revisit core and visualization lessons
