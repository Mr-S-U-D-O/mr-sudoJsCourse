# let Common Mistakes

## Mistake 1: Accessing Before Declaration

Problem:

```js
console.log(total);
let total = 10;
```

Result:

- ReferenceError due to Temporal Dead Zone.

Fix:

- Declare first, use after declaration.

## Mistake 2: Redeclaration in Same Scope

Problem:

```js
let name = "Ada";
let name = "Lin";
```

Result:

- SyntaxError.

Fix:

- Reassign with one declaration:

```js
let name = "Ada";
name = "Lin";
```

## Mistake 3: Confusing Block Boundaries

Problem:

```js
if (true) {
  let status = "ok";
}
console.log(status);
```

Result:

- ReferenceError outside the block.

Fix:

- Declare in the outer scope only if needed outside.

## Mistake 4: Overusing let for Constants

Problem:

- Declaring values with let even when never reassigned.

Risk:

- Code intent is less clear.

Fix:

- Use const by default, then let only where reassignment is intentional.

## Quick Debug Checklist

- Are you reading a let variable before its declaration?
- Is a let name declared twice in one scope?
- Are you using a block-local variable outside its block?
- Should this let actually be const?
