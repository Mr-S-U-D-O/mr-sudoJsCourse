<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Banking System

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Think in terms of transactional correctness: validate first, mutate atomically, record outcomes.

## First Invariants To Lock In

- Partially failed operations do not leave partial state.
- Totals/limits/quotas remain internally consistent.
- Key operations are observable through logs or stats.

## Suggested Implementation Order

1. createAccount: define constructor inputs and object shape
2. deposit: define clear behavior and edge-case handling
3. withdraw: define clear behavior and edge-case handling
4. transfer: define clear behavior and edge-case handling
5. getBalance: return deterministic read model
6. getTransactionHistory: return deterministic read model

## Failure Cases To Handle Early

- Duplicate keys or missing entities
- Concurrent-like repeated operations
- Boundary values at limits/quotas

## Project-Specific Manual Tests

1. Normal operation changes state correctly
2. Failed operation leaves state unchanged
3. Stats or totals match expected values

## API Completion Checklist

- [ ] createAccount has at least one happy path and one edge-case test.
- [ ] deposit has at least one happy path and one edge-case test.
- [ ] withdraw has at least one happy path and one edge-case test.
- [ ] transfer has at least one happy path and one edge-case test.
- [ ] getBalance has at least one happy path and one edge-case test.
- [ ] getTransactionHistory has at least one happy path and one edge-case test.

## Level-Up Reflection (Intermediate)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
