<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Shopping Cart

## Project Aim

Implement business transactions with consistency guarantees.

## Real-World Use Cases

- checkout systems
- inventory sync
- financial records

## Core Concepts You Must Learn

- invariants
- atomic updates
- ledger thinking

## Accuracy Traps To Avoid

- Updating partial state on failed operations.
- Using floating math where currency precision is required.
- Not validating entity existence before writes.

## Quality Checks

- Totals remain consistent after add/remove/update operations.
- Failed operations do not mutate persisted state.
- Audit output can explain how final totals were computed.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/01-beginner/08-shopping-cart/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/01-beginner/08-shopping-cart/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
