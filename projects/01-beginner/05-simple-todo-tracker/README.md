<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Simple Todo Tracker

## Project Aim

Design reliable workflow state transitions with clear invariants.

## Real-World Use Cases

- issue tracking
- project planning
- service desk workflows

## Core Concepts You Must Learn

- state machines
- validation
- audit trail

## Accuracy Traps To Avoid

- Allowing illegal status jumps.
- Losing history when entities are updated.
- Mixing command logic with query logic.

## Quality Checks

- Only allowed transitions are accepted.
- Each transition writes an event to history.
- Computed metrics reflect current state correctly.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/01-beginner/05-simple-todo-tracker/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/01-beginner/05-simple-todo-tracker/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
