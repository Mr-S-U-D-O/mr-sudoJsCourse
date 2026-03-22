# const Real-World Patterns

## Configuration Pattern

Use const for values that should stay stable:

```js
const API_TIMEOUT_MS = 5000;
const RETRY_LIMIT = 3;
```

Why:

- Prevents accidental reassignment.
- Communicates intention clearly.

## Dependency Binding Pattern

Use const for imported modules and function references:

```js
const parse = JSON.parse;
const now = Date.now;
```

Why:

- Dependencies usually should not be rebound.

## Immutable Update Pattern

Instead of mutating const objects directly, create new ones:

```js
const user = { name: "Ada", role: "dev" };
const updatedUser = { ...user, role: "lead" };
```

Why:

- Predictable state transitions.
- Easier debugging and testing.

## Team Convention Pattern

Common convention:

- const by default
- let only for counters, accumulators, or explicit state transitions
- var avoided in new code

## Reflection

Answer briefly:

- Which values in your recent code should always be const?
- Where do you intentionally use let, and why?
