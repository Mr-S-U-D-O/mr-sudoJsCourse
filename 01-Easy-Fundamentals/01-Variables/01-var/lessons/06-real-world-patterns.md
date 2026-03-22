# var Real-World Patterns

## Legacy Code Reading Pattern

When you see var in an older project:

- Start by mapping function boundaries.
- Treat var declarations as function-wide, not line-local.
- Search for same-name redeclarations in the same function.

## Migration Pattern: var to let or const

Step-by-step:

1. Replace var with const first.
2. Run tests.
3. If assignment errors appear, switch only those spots to let.
4. Keep variable names unchanged during migration.

Why this works:

- const-by-default reveals true mutability requirements.

## Safe Loop Pattern

Before:

```js
for (var i = 0; i < items.length; i++) {
  process(items[i], () => console.log(i));
}
```

After:

```js
for (let i = 0; i < items.length; i++) {
  process(items[i], () => console.log(i));
}
```

## Team Convention Pattern

Many teams enforce:

- no-var rule in lint config
- const preferred
- let allowed when reassignment is meaningful

Reason:

- Fewer silent scope bugs
- Easier code reviews
- More predictable refactors

## Reflection

Answer in one sentence each:

- Which var behavior causes the most bugs for beginners?
- What is your migration rule when touching legacy files?
