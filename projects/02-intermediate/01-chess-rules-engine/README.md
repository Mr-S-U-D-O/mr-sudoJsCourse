# Project 02: Chess Rules Engine

**Difficulty:** 🟡 Intermediate | **Time:** 8-12 hours | **Skills:** State Machines, Rule Validation, Deterministic Logic

## Quick Start

Build the rules engine behind chess. Your code controls legal moves, turn order, check detection, and game-ending states. The board UI can be simple; this project is about correctness and deterministic game logic.

---

## Prerequisites

Before starting, you should be comfortable with:

1. 2D arrays and coordinate mapping
2. Objects and immutable update patterns
3. Pure functions and state transitions
4. Guard clauses and error handling
5. Basic graph/search thinking (for attack detection)
6. Core chess movement rules for all pieces

---

## Visualize The Product

Your engine should answer questions like:

```txt
Start position
turn: white

getLegalMoves("e2")
-> ["e3", "e4"]

move("e2", "e4")
-> success
turn: black

move("e7", "e5")
-> success
turn: white

move("e1", "e2") while in check
-> Error: move leaves king in check
```

The UI only draws the board. This engine is the referee.

---

## Real-World Use Cases

1. Browser and mobile chess apps
2. Puzzle/training platforms validating puzzle solutions
3. Move analysis tools and PGN playback engines
4. Turn-based game servers requiring anti-cheat rule enforcement
5. Interview-caliber state-machine and validation architecture examples

---

## Project Aim

Implement a deterministic chess engine that:

1. Tracks full board state and turn
2. Generates pseudo-legal moves per piece
3. Filters out illegal moves that expose own king
4. Applies a valid move and updates status
5. Detects check/checkmate/stalemate states

Key architecture:

```txt
Board State -> Generate Candidate Moves -> Legality Filter -> Apply Move -> Recompute Status
```

---

## Core Concepts You Must Learn

1. Board representation and square addressing (for example, "e2" <-> matrix index)
2. Pseudo-legal vs legal move generation
3. Self-check prevention via move simulation
4. Deterministic state transitions (same state + same move = same result)
5. Rule separation (piece movement, check detection, game status)
6. Safe snapshots for debugging and replay

---

## Accuracy Traps To Avoid

1. Mixing UI concerns into engine rules
   Why it fails: Rules become coupled to rendering and harder to test.
   Fix: Engine accepts/returns plain data structures only.

2. Treating pseudo-legal moves as legal
   Why it fails: Allows moves that leave own king in check.
   Fix: Simulate each candidate move and reject if king remains attacked.

3. Mutating board state during validation
   Why it fails: Validation accidentally changes live game state.
   Fix: Use cloned state for simulation.

4. Skipping turn validation
   Why it fails: Same color can move twice.
   Fix: Reject moves where piece color does not match current turn.

5. Incomplete checkmate/stalemate logic
   Why it fails: Game ends incorrectly.
   Fix: Distinguish:

- checkmate: in check + no legal moves
- stalemate: not in check + no legal moves

---

## Quality Checks

Your implementation should satisfy all:

1. New game starts with turn = white
2. `getLegalMoves("e2")` returns white pawn forward options
3. Illegal source square input throws clear error
4. Moving opponent piece on wrong turn throws clear error
5. After valid move, turn flips exactly once
6. Move history records from/to/timestamp or turn metadata
7. Illegal move does not mutate board state
8. Self-check move is rejected
9. Status transitions to check/checkmate/stalemate when applicable
10. `getState()` returns a safe copy, not mutable internal references

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/01-chess-rules-engine/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/01-chess-rules-engine/src'); const g=m.createGame(); console.log(g.getState().turn);"
node -e "const m=require('./projects/02-intermediate/01-chess-rules-engine/solution/index.solution'); const g=m.createGame(); console.log(g.getLegalMoves('e2'));"
```

---

## Learning Tips

1. Implement square parsing first (`"e2" -> row/col`) and test it heavily.
2. Build piece movement generators before legality filtering.
3. Add move simulation helper (`simulateMove`) before check detection.
4. Keep every helper pure where possible for easier testing.
5. Write tiny scenario tests instead of trying to test full games first.

---

## Interview Narrative

Problem: Build a reliable chess rules engine independent of UI.

Approach: I modeled game state as pure data, split move generation from legality filtering, then used simulation to prevent self-check. I applied valid moves through deterministic state transitions and status recomputation.

Outcome: The engine became testable, reproducible, and reusable for UI clients, bots, and analysis tooling.

---

## Code Comments in Starter

See `src/index.js` for structured TODO guidance on board modeling, legal move filtering, and safe state updates.

---

## Acceptance Criteria

- Deterministic behavior for identical game states
- Clear errors for invalid inputs and illegal moves
- No hidden state mutation during validation
- At least 10 manual checks passing from this README
