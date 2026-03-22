# const Visualizations

## Visualization 1: Binding Lock
Code:
```js
const age = 20;
// age = 21; // error
```

Model:
```text
Variable name: age
Binding: fixed to value 20
Rebinding: not allowed
```

## Visualization 2: Mutable Object Content
Code:
```js
const profile = { name: "Ada" };
profile.name = "Grace";
```

Model:
```text
profile (binding fixed) ---> object in memory
object.name can change from "Ada" to "Grace"
```
