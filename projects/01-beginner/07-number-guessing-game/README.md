<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Number Guessing Game

## Project Aim

Build deterministic game logic where randomness and rules are testable.

## Real-World Use Cases

- browser games
- training apps
- simulation tools

## Core Concepts You Must Learn

- state transitions
- rule validation
- random control

## Accuracy Traps To Avoid

- Tying game rules directly to UI behavior.
- Using true randomness in tests.
- Skipping invalid move/input checks.

## Quality Checks

- Game state changes are explicit and reversible where needed.
- Random paths can be controlled with seeded input or stubs.
- Illegal actions are rejected with clear errors.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/01-beginner/07-number-guessing-game/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/01-beginner/07-number-guessing-game/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
