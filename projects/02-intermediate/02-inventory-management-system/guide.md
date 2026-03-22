<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Inventory Management System

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Think in terms of transactional correctness: validate first, mutate atomically, record outcomes.

## First Invariants To Lock In

- Partially failed operations do not leave partial state.
- Totals/limits/quotas remain internally consistent.
- Key operations are observable through logs or stats.

## Suggested Implementation Order

1. createInventorySystem: define constructor inputs and object shape
2. addProduct: validate input then append/update state safely
3. adjustStock: define clear behavior and edge-case handling
4. generateReport: define clear behavior and edge-case handling
5. nowIso: define clear behavior and edge-case handling
6. assertObject: define clear behavior and edge-case handling
7. assertFiniteNumber: define clear behavior and edge-case handling
8. updateProduct: apply partial changes without breaking invariants
9. listProducts: return deterministic read model
10. getLowStock: return deterministic read model
11. getStockValuation: return deterministic read model
12. getMovements: return deterministic read model

## Failure Cases To Handle Early

- Duplicate keys or missing entities
- Concurrent-like repeated operations
- Boundary values at limits/quotas

## Project-Specific Manual Tests

1. Normal operation changes state correctly
2. Failed operation leaves state unchanged
3. Stats or totals match expected values

## API Completion Checklist

- [ ] createInventorySystem has at least one happy path and one edge-case test.
- [ ] addProduct has at least one happy path and one edge-case test.
- [ ] adjustStock has at least one happy path and one edge-case test.
- [ ] generateReport has at least one happy path and one edge-case test.
- [ ] nowIso has at least one happy path and one edge-case test.
- [ ] assertObject has at least one happy path and one edge-case test.
- [ ] assertFiniteNumber has at least one happy path and one edge-case test.
- [ ] updateProduct has at least one happy path and one edge-case test.
- [ ] listProducts has at least one happy path and one edge-case test.
- [ ] getLowStock has at least one happy path and one edge-case test.
- [ ] getStockValuation has at least one happy path and one edge-case test.
- [ ] getMovements has at least one happy path and one edge-case test.

## Level-Up Reflection (Intermediate)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
