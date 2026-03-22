# let Visualizations

## Visualization 1: Block Scope Boundary

Code:

```js
{
  let x = 10;
}
console.log(x);
```

Scope map:

```text
Global Scope
|- Block Scope
|  |- let x = 10
|
|- console.log(x) // not visible here
```

## Visualization 2: Temporal Dead Zone

Code:

```js
console.log(age);
let age = 16;
```

Mental timeline:

```text
Block start ---------------- let age declaration
   TDZ (cannot access age)      age becomes usable
```
