<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Ticket Management System

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Model state transitions first, then enforce transition rules before mutating state.

## First Invariants To Lock In

- Invalid state transitions are rejected.
- State mutations are explicit and traceable.
- History or audit trail can explain final state.

## Suggested Implementation Order

1. createTicketSystem: define constructor inputs and object shape
2. createTicket: define constructor inputs and object shape
3. transitionTicket: define clear behavior and edge-case handling
4. getMetrics: return deterministic read model
5. nowIso: define clear behavior and edge-case handling
6. assertObject: define clear behavior and edge-case handling
7. recordEvent: define clear behavior and edge-case handling
8. computeDueAt: define clear behavior and edge-case handling
9. getTicketOrThrow: return deterministic read model
10. assignTicket: define clear behavior and edge-case handling
11. addComment: validate input then append/update state safely
12. isBreached: return a pure boolean predicate
13. listTickets: return deterministic read model
14. getTimeline: return deterministic read model

## Failure Cases To Handle Early

- Illegal transition jumps
- Mutating state after terminal status
- Missing audit/event log entry

## Project-Specific Manual Tests

1. Allowed transition succeeds
2. Disallowed transition fails with clear reason
3. History reflects exactly what happened

## API Completion Checklist

- [ ] createTicketSystem has at least one happy path and one edge-case test.
- [ ] createTicket has at least one happy path and one edge-case test.
- [ ] transitionTicket has at least one happy path and one edge-case test.
- [ ] getMetrics has at least one happy path and one edge-case test.
- [ ] nowIso has at least one happy path and one edge-case test.
- [ ] assertObject has at least one happy path and one edge-case test.
- [ ] recordEvent has at least one happy path and one edge-case test.
- [ ] computeDueAt has at least one happy path and one edge-case test.
- [ ] getTicketOrThrow has at least one happy path and one edge-case test.
- [ ] assignTicket has at least one happy path and one edge-case test.
- [ ] addComment has at least one happy path and one edge-case test.
- [ ] isBreached has at least one happy path and one edge-case test.
- [ ] listTickets has at least one happy path and one edge-case test.
- [ ] getTimeline has at least one happy path and one edge-case test.

## Level-Up Reflection (Advanced)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
