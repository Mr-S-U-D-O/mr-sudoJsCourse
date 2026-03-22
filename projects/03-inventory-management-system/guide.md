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