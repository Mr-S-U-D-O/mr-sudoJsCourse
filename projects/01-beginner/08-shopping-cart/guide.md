<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Shopping Cart

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Think in terms of transactional correctness: validate first, mutate atomically, record outcomes.

## First Invariants To Lock In

- Partially failed operations do not leave partial state.
- Totals/limits/quotas remain internally consistent.
- Key operations are observable through logs or stats.

## Suggested Implementation Order

1. createCart: define constructor inputs and object shape
2. addItem: validate input then append/update state safely
3. removeItem: handle not-found paths and preserve consistency
4. updateQuantity: apply partial changes without breaking invariants
5. getTotal: return deterministic read model
6. getAuditLog: return deterministic read model
7. applyDiscount: define clear behavior and edge-case handling
8. checkout: enforce contract and return actionable errors

## Failure Cases To Handle Early

- Duplicate keys or missing entities
- Concurrent-like repeated operations
- Boundary values at limits/quotas

## Project-Specific Manual Tests

1. Normal operation changes state correctly
2. Failed operation leaves state unchanged
3. Stats or totals match expected values

## API Completion Checklist

- [ ] createCart has at least one happy path and one edge-case test.
- [ ] addItem has at least one happy path and one edge-case test.
- [ ] removeItem has at least one happy path and one edge-case test.
- [ ] updateQuantity has at least one happy path and one edge-case test.
- [ ] getTotal has at least one happy path and one edge-case test.
- [ ] getAuditLog has at least one happy path and one edge-case test.
- [ ] applyDiscount has at least one happy path and one edge-case test.
- [ ] checkout has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
