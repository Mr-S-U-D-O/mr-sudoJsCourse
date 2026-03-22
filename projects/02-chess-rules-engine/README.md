# Project 02: Chess Rules Engine

## What You Are Building

A chess rules engine that validates legal moves and maintains game state.

Focus on game logic correctness, not board UI rendering.

## Why This Is Real World

Game engines, simulation platforms, and turn-based systems rely on deterministic rules and state transitions.

## Skills You Should Know Before Starting

- JavaScript objects and arrays
- Coordinate systems and board representations
- State immutability patterns
- Test-driven development

## Project Goals

- Represent board state and piece metadata
- Validate legal movement for all pieces
- Handle check, checkmate, and stalemate states
- Track turn order, castling rights, and en passant
- Export move history and game snapshots

## Best Practices

- Keep state transitions pure where possible
- Separate move generation from move validation
- Build helper utilities for board scans and coordinates
- Create piece-specific test suites
- Use notation helpers to make tests readable

## Step-by-Step Build Guide

1. Choose your board model (matrix or map).
2. Implement piece placement and initial game state creation.
3. Add coordinate parsing (e.g., e2 -> e4).
4. Implement move rules for pawns, knights, bishops, rooks, queen, king.
5. Reject moves that leave own king in check.
6. Add special moves: castling, en passant, promotion.
7. Detect check, checkmate, and stalemate conditions.
8. Add FEN import/export support.
9. Implement PGN-like move history recording.
10. Add deterministic replay from move history.
11. Document architecture and complexity tradeoffs in docs/architecture.md.

## Deliverables

- Engine logic in src/
- Rule-coverage tests in tests/
- Architecture notes in docs/
- Complete solution in solution/

## Suggested Extensions

- Draw rules (threefold repetition, fifty-move rule)
- Move recommendation API
- Opening database support