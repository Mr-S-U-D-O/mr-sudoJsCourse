# Guide: Inventory Management System

## Build Order

1. Define entities: product, supplier, stock movement, purchase order.
2. Implement create/update/read product operations.
3. Implement stock mutation operations with reasons.
4. Add reorder calculations from min thresholds.
5. Build reports: low stock, stock valuation, movement history.
6. Add persistence adapter boundaries.

## What To Search

- inventory domain model design
- stock movement ledger pattern
- reorder point formula basics
- JavaScript repository pattern

## How To Think

- Every stock update is a business event.
- Preserve event history first, then derive reports.
- Treat invalid state transitions as hard errors.

## Suggested Learning Resources

- https://martinfowler.com/eaaCatalog/repository.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- https://nodejs.org/en/learn

## Phase 1: Model The Domain

- Define the entities and state transitions first.
- Write input and output contracts before implementation.
- List invariants that must always remain true.

## Phase 2: Build Minimal Correct Behavior

- Implement one end-to-end flow that works reliably.
- Keep pure logic separate from I/O side effects.
- Add guard clauses for invalid input paths.

## Phase 3: Add Resilience

- Add explicit error handling for expected failure modes.
- Add boundaries for untrusted or malformed data.
- Capture metadata useful for debugging and observability.

## Manual Test Matrix

- Happy path: one normal operation that should succeed.
- Edge path: smallest and largest valid values.
- Failure path: malformed input with expected error.
- Repeatability: same input run twice should match output.
- Explainability: each result can be traced to a rule.

## Quality Validation Checklist

- [ ] Core concepts are visible in code structure: invariants, atomic updates, ledger thinking.
- [ ] Error messages are actionable and consistent.
- [ ] At least 3 edge cases are documented and tested.
- [ ] Behavior aligns with all listed quality checks in README.
- [ ] One improvement idea is recorded after comparing with solution.

## Reflection Prompt

Write 5 lines:

1. Which invariant was hardest to preserve?
2. Which bug appeared first and why?
3. What would break first in production?
4. What metric would you monitor?
5. What would you refactor next?
