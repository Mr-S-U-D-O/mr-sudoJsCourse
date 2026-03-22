<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Social Feed System

## Project Aim

Build a production-style social feed system implementation that is testable and resilient.

## Real-World Use Cases

- internal tooling
- backend services
- automation workflows

## Core Concepts You Must Learn

- clear interfaces
- error handling
- deterministic behavior

## Accuracy Traps To Avoid

- No explicit input validation.
- Implicit state mutations that are hard to debug.
- No measurable correctness checks.

## Quality Checks

- Core behavior passes normal and edge-case examples.
- Invalid input paths return actionable errors.
- Design choices are explained at Intermediate depth.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/02-intermediate/04-social-feed-system/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/02-intermediate/04-social-feed-system/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
