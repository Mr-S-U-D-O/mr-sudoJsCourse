<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Agent Workflow Orchestrator

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Model state transitions first, then enforce transition rules before mutating state.

## First Invariants To Lock In

- Invalid state transitions are rejected.
- State mutations are explicit and traceable.
- History or audit trail can explain final state.

## Suggested Implementation Order

1. runWorkflow: orchestrate dependent steps in correct order
2. assertWorkflowSchema: define clear behavior and edge-case handling
3. detectCycle: define clear behavior and edge-case handling
4. sleep: define clear behavior and edge-case handling
5. executeNodeWithRetry: orchestrate dependent steps in correct order

## Failure Cases To Handle Early

- Illegal transition jumps
- Mutating state after terminal status
- Missing audit/event log entry

## Project-Specific Manual Tests

1. Allowed transition succeeds
2. Disallowed transition fails with clear reason
3. History reflects exactly what happened

## API Completion Checklist

- [ ] runWorkflow has at least one happy path and one edge-case test.
- [ ] assertWorkflowSchema has at least one happy path and one edge-case test.
- [ ] detectCycle has at least one happy path and one edge-case test.
- [ ] sleep has at least one happy path and one edge-case test.
- [ ] executeNodeWithRetry has at least one happy path and one edge-case test.

## Level-Up Reflection (Expert)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
