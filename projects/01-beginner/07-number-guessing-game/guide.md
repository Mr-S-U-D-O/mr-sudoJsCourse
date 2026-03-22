<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Number Guessing Game

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
2. makeGuess: define clear behavior and edge-case handling
3. isGameWon: return a pure boolean predicate
4. isGameLost: return a pure boolean predicate
5. getGameState: return deterministic read model
6. getHints: return deterministic read model

## Failure Cases To Handle Early

- Malformed input shape
- Boundary values
- Unexpected type combinations

## Project-Specific Manual Tests

1. One happy path
2. One edge path
3. One failure path at Beginner depth

## API Completion Checklist

- [ ] createGame has at least one happy path and one edge-case test.
- [ ] makeGuess has at least one happy path and one edge-case test.
- [ ] isGameWon has at least one happy path and one edge-case test.
- [ ] isGameLost has at least one happy path and one edge-case test.
- [ ] getGameState has at least one happy path and one edge-case test.
- [ ] getHints has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
