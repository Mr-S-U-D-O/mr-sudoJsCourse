<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Task Planner Api

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Model state transitions first, then enforce transition rules before mutating state.

## First Invariants To Lock In

- Invalid state transitions are rejected.
- State mutations are explicit and traceable.
- History or audit trail can explain final state.

## Suggested Implementation Order

1. createTaskPlanner: define constructor inputs and object shape
2. registerUser: define clear behavior and edge-case handling
3. createTask: define constructor inputs and object shape
4. nowIso: define clear behavior and edge-case handling
5. id: define clear behavior and edge-case handling
6. assertObject: define clear behavior and edge-case handling
7. hashPassword: define clear behavior and edge-case handling
8. requireUserByToken: define clear behavior and edge-case handling
9. login: define clear behavior and edge-case handling
10. updateProject: apply partial changes without breaking invariants
11. updateTask: apply partial changes without breaking invariants
12. listTasks: return deterministic read model
13. getActivity: return deterministic read model

## Failure Cases To Handle Early

- Illegal transition jumps
- Mutating state after terminal status
- Missing audit/event log entry

## Project-Specific Manual Tests

1. Allowed transition succeeds
2. Disallowed transition fails with clear reason
3. History reflects exactly what happened

## API Completion Checklist

- [ ] createTaskPlanner has at least one happy path and one edge-case test.
- [ ] registerUser has at least one happy path and one edge-case test.
- [ ] createTask has at least one happy path and one edge-case test.
- [ ] nowIso has at least one happy path and one edge-case test.
- [ ] id has at least one happy path and one edge-case test.
- [ ] assertObject has at least one happy path and one edge-case test.
- [ ] hashPassword has at least one happy path and one edge-case test.
- [ ] requireUserByToken has at least one happy path and one edge-case test.
- [ ] login has at least one happy path and one edge-case test.
- [ ] updateProject has at least one happy path and one edge-case test.
- [ ] updateTask has at least one happy path and one edge-case test.
- [ ] listTasks has at least one happy path and one edge-case test.
- [ ] getActivity has at least one happy path and one edge-case test.

## Level-Up Reflection (Advanced)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
