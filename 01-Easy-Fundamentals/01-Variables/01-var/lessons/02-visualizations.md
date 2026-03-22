# var Visualizations

## Visualization 1: Hoisting

Code:

```js
console.log(score);
var score = 10;
```

Mental model:

```text
JavaScript reads declarations first:
var score;            // hoisted
console.log(score);   // undefined
score = 10;
```

## Visualization 2: Block Leakage

Code:

```js
if (true) {
  var city = "Lagos";
}
console.log(city);
```

Scope map:

```text
Function/Global Scope
|- if block
|  |- var city = "Lagos"
|
|- console.log(city)  // still visible
```
