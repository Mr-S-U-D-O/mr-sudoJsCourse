<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Cache Manager

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Think in terms of transactional correctness: validate first, mutate atomically, record outcomes.

## First Invariants To Lock In

- Partially failed operations do not leave partial state.
- Totals/limits/quotas remain internally consistent.
- Key operations are observable through logs or stats.

## Suggested Implementation Order

1. createCache: define constructor inputs and object shape
2. set: define clear behavior and edge-case handling
3. get: return deterministic read model
4. invalidate: define clear behavior and edge-case handling
5. clear: define clear behavior and edge-case handling
6. getStats: return deterministic read model

## Failure Cases To Handle Early

- Duplicate keys or missing entities
- Concurrent-like repeated operations
- Boundary values at limits/quotas

## Project-Specific Manual Tests

1. Normal operation changes state correctly
2. Failed operation leaves state unchanged
3. Stats or totals match expected values

## API Completion Checklist

- [ ] createCache has at least one happy path and one edge-case test.
- [ ] set has at least one happy path and one edge-case test.
- [ ] get has at least one happy path and one edge-case test.
- [ ] invalidate has at least one happy path and one edge-case test.
- [ ] clear has at least one happy path and one edge-case test.
- [ ] getStats has at least one happy path and one edge-case test.

## Level-Up Reflection (Intermediate)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
