# Project 02: Chess Rules Engine

## Project Aim

Build a deterministic chess logic engine that:

- tracks board state;
- validates legal moves;
- updates turn and game status.

## Visualize The Product

Imagine a web chess app where the UI draws pieces, but your engine decides:

- which moves are legal;
- when a king is in check;
- whether the game is checkmate or stalemate.

The UI is just paint. Your engine is the referee.

## Real-World Use Cases

- Browser chess games
- Training and puzzle platforms
- Move analysis tools
- Rule-validation backends for multiplayer games

## What You Should Know First

- 2D board representations
- Objects, arrays, and loops
- Pure function design
- Core chess rules

## Rules

- Reject illegal moves with clear errors.
- Prevent moves that leave own king in check.
- Keep pseudo-legal generation and final legality checks separate.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/02-chess-rules-engine/src'); console.log(Object.keys(m));"
```

What this does:

- loads your starter module from `src`;
- prints available functions so you know the API surface.

2. Quick starter check

```bash
node -e "const m=require('./projects/02-chess-rules-engine/src'); const g=m.createGame(); console.log(g.getState().turn);"
```

What this does:

- creates a new game instance;
- prints whose turn it is;
- verifies your factory returns a usable game object.

3. Reference solution command (the one you asked about)

```bash
node -e "const m=require('./projects/02-chess-rules-engine/solution/index.solution'); const g=m.createGame(); console.log(g.getLegalMoves('e2'));"
```

Exact breakdown:

- `node -e` runs inline JavaScript from your terminal.
- `require('./projects/02-chess-rules-engine/solution/index.solution')` imports the solved engine.
- `const g=m.createGame()` creates a fresh initial board.
- `g.getLegalMoves('e2')` asks: from square `e2`, where can that piece legally move right now?
- `console.log(...)` prints the answer, usually squares like `e3` and `e4` at game start.

## Interview Narrative You Can Use

- Problem: enforce chess rules with predictable state transitions.
- Design: board model + move generation + legality filter.
- Hard part: self-check prevention and status detection.
- Outcome: reusable game logic independent of UI.

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

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
