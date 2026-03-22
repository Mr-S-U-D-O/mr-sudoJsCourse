<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Simple Todo Tracker

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Model state transitions first, then enforce transition rules before mutating state.

## First Invariants To Lock In

- Invalid state transitions are rejected.
- State mutations are explicit and traceable.
- History or audit trail can explain final state.

## Suggested Implementation Order

1. createTodo: define constructor inputs and object shape
2. addTodo: validate input then append/update state safely
3. updateTodoStatus: apply partial changes without breaking invariants
4. getTodo: return deterministic read model
5. getAllTodos: return deterministic read model
6. getMetrics: return deterministic read model
7. getHistory: return deterministic read model

## Failure Cases To Handle Early

- Illegal transition jumps
- Mutating state after terminal status
- Missing audit/event log entry

## Project-Specific Manual Tests

1. Allowed transition succeeds
2. Disallowed transition fails with clear reason
3. History reflects exactly what happened

## API Completion Checklist

- [ ] createTodo has at least one happy path and one edge-case test.
- [ ] addTodo has at least one happy path and one edge-case test.
- [ ] updateTodoStatus has at least one happy path and one edge-case test.
- [ ] getTodo has at least one happy path and one edge-case test.
- [ ] getAllTodos has at least one happy path and one edge-case test.
- [ ] getMetrics has at least one happy path and one edge-case test.
- [ ] getHistory has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
