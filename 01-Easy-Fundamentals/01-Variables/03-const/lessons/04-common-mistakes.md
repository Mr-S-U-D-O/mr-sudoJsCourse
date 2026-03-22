# const Common Mistakes

## Mistake 1: Thinking const Makes Objects Immutable

Problem:

```js
const user = { name: "Ada" };
user.name = "Grace";
```

Reality:

- This is allowed.
- const protects the binding, not object internals.

Fix when immutability is needed:

- Create new objects instead of mutating existing ones.

## Mistake 2: Declaring const Without Initialization

Problem:

```js
const total;
```

Result:

- SyntaxError.

Fix:

```js
const total = 0;
```

## Mistake 3: Reassigning const

Problem:

```js
const pi = 3.14;
pi = 3.14159;
```

Result:

- TypeError at runtime.

Fix:

- Use let if reassignment is intentional.

## Mistake 4: Overusing let Instead of const

Problem:

- Mutable declarations used by default.

Risk:

- Harder to track which values are supposed to stay stable.

Fix:

- Start with const, switch to let only when needed.

## Quick Debug Checklist

- Did you initialize const immediately?
- Are you accidentally trying to reassign const?
- Did you confuse object mutation with rebinding?
- Should this let become const?
