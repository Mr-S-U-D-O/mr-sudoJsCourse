# const Mini Drills

Try each drill before checking the answer.

## Drill 1: Reassignment Check

```js
const rate = 0.2;
rate = 0.25;
```

Answer:

- Throws TypeError.

## Drill 2: Object Mutation Check

```js
const config = { darkMode: false };
config.darkMode = true;
```

Answer:

- Valid.

## Drill 3: Missing Initialization

```js
const id;
```

Answer:

- SyntaxError.

## Drill 4: Array Mutation

```js
const tags = ["js"];
tags.push("node");
console.log(tags);
```

Answer:

- Valid. Logs ["js", "node"].

## Drill 5: Refactor Challenge

Refactor to express clear intent:

```js
let apiBase = "https://example.com";
let retries = 0;
let headers = { Accept: "application/json" };
```

Target:

- Use const where reassignment is not needed.
- Keep only true mutable state as let.
