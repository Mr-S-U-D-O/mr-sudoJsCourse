<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Chess Rules Engine

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Start from input contract -> validation -> core logic -> output contract. Keep each stage independently testable.

## First Invariants To Lock In

- Core function contracts are deterministic.
- Invalid input paths fail with clear messages.
- State changes (if any) are explicit and inspectable.

## Suggested Implementation Order

1. createGame: define constructor inputs and object shape
2. getLegalMoves: return deterministic read model
3. move: define clear behavior and edge-case handling
4. getState: return deterministic read model
5. inBounds: define clear behavior and edge-case handling
6. toPos: define clear behavior and edge-case handling
7. toSquare: define clear behavior and edge-case handling
8. cloneBoard: define clear behavior and edge-case handling
9. createInitialBoard: define constructor inputs and object shape
10. rayMoves: define clear behavior and edge-case handling
11. pseudoMovesForPiece: define clear behavior and edge-case handling
12. findKing: define clear behavior and edge-case handling
13. isSquareAttacked: return a pure boolean predicate
14. isInCheck: return a pure boolean predicate
15. applyMove: define clear behavior and edge-case handling
16. legalMovesForPiece: define clear behavior and edge-case handling
17. getAllLegalMoves: return deterministic read model
18. computeStatus: define clear behavior and edge-case handling

## Failure Cases To Handle Early

- Malformed input shape
- Boundary values
- Unexpected type combinations

## Project-Specific Manual Tests

1. One happy path
2. One edge path
3. One failure path at Intermediate depth

## API Completion Checklist

- [ ] createGame has at least one happy path and one edge-case test.
- [ ] getLegalMoves has at least one happy path and one edge-case test.
- [ ] move has at least one happy path and one edge-case test.
- [ ] getState has at least one happy path and one edge-case test.
- [ ] inBounds has at least one happy path and one edge-case test.
- [ ] toPos has at least one happy path and one edge-case test.
- [ ] toSquare has at least one happy path and one edge-case test.
- [ ] cloneBoard has at least one happy path and one edge-case test.
- [ ] createInitialBoard has at least one happy path and one edge-case test.
- [ ] rayMoves has at least one happy path and one edge-case test.
- [ ] pseudoMovesForPiece has at least one happy path and one edge-case test.
- [ ] findKing has at least one happy path and one edge-case test.
- [ ] isSquareAttacked has at least one happy path and one edge-case test.
- [ ] isInCheck has at least one happy path and one edge-case test.
- [ ] applyMove has at least one happy path and one edge-case test.
- [ ] legalMovesForPiece has at least one happy path and one edge-case test.
- [ ] getAllLegalMoves has at least one happy path and one edge-case test.
- [ ] computeStatus has at least one happy path and one edge-case test.

## Level-Up Reflection (Intermediate)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
