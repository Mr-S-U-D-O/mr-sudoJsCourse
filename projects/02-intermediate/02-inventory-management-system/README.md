# Project 03: Inventory Management System

**Difficulty:** 🟡 Intermediate | **Time:** 8-12 hours | **Skills:** Invariants, Auditability, Aggregation, Safe Mutations

## Quick Start

Build the domain engine for inventory workflows: product creation, stock adjustments, low-stock detection, and reporting. This project focuses on data consistency and explainable history rather than UI.

---

## Prerequisites

Before starting, you should be comfortable with:

1. Objects, arrays, and Maps in JavaScript
2. Input validation and guard clauses
3. Immutable update patterns
4. Numeric aggregation (sum, filtering, grouping)
5. Basic accounting mindset (every stock movement has a reason)
6. Error-first workflow design

---

## Visualize The Product

```txt
Initial state
products: {}
movements: []

addProduct({ sku: "SKU1", name: "Mouse", unitPrice: 25, quantity: 8, reorderPoint: 3 })
-> product stored

adjustStock("SKU1", -2, "sale")
-> quantity: 6
-> movement appended: { sku: "SKU1", delta: -2, reason: "sale" }

generateReport()
-> {
	totalProducts: 1,
	totalStockValue: 150,
	lowStockSkus: []
}
```

The UI may show charts and tables, but this engine guarantees the numbers are correct.

---

## Real-World Use Cases

1. Ecommerce stock services and admin dashboards
2. POS and warehouse management software
3. Supplier reorder planning systems
4. Inventory analytics and anomaly detection pipelines
5. ERP integrations where audit logs are mandatory

---

## Project Aim

Implement a deterministic inventory system that:

1. Validates all product and stock mutations
2. Tracks stock changes in append-only movement history
3. Prevents invalid states (negative quantities, invalid SKUs)
4. Generates trusted reporting summaries

Architecture flow:

```txt
Command (add/adjust) -> Validation -> State Update -> Movement Log -> Report Query
```

---

## Core Concepts You Must Learn

1. Domain invariants (for example, quantity never below zero)
2. Append-only audit logs for explainability
3. Atomic update mindset (all-or-nothing changes)
4. Separation of command methods vs report/query methods
5. Deterministic reports derived from current state
6. Defensive copying and stable return shapes

---

## Accuracy Traps To Avoid

1. Partial writes on failed updates
Why it fails: Quantity may change while movement log does not.
Fix: Validate first, then commit product + movement together.

2. Floating-point drift for money
Why it fails: Repeated valuation can accumulate precision noise.
Fix: Store or compute with cent-safe strategy when needed.

3. Missing SKU existence checks
Why it fails: Stock adjustments against non-existing products silently corrupt logic.
Fix: Hard-fail with clear error if SKU is unknown.

4. Allowing negative final stock
Why it fails: Impossible inventory state.
Fix: Reject any adjustment that would push quantity below zero.

5. Mixing report logic into mutation methods
Why it fails: Harder maintenance and hidden side effects.
Fix: Keep `generateReport` read-only.

---

## Quality Checks

Your implementation should satisfy all:

1. `addProduct` rejects missing required fields
2. Duplicate SKU add is rejected clearly
3. Valid `adjustStock` updates quantity and appends movement
4. Invalid `adjustStock` leaves state unchanged
5. Report totalProducts matches current catalog size
6. Report totalStockValue equals sum of quantity × unitPrice
7. lowStockSkus contains products where quantity <= reorderPoint
8. Movements remain append-only and ordered by insertion
9. API methods return deterministic shapes
10. `generateReport` does not mutate state

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/02-inventory-management-system/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/02-inventory-management-system/src'); const s=m.createInventorySystem(); console.log(s.generateReport());"
node -e "const m=require('./projects/02-intermediate/02-inventory-management-system/solution/index.solution'); const s=m.createInventorySystem(); s.addProduct({sku:'SKU1',name:'Mouse',unitPrice:25,quantity:8,reorderPoint:3}); s.adjustStock('SKU1',-2,'sale'); console.log(s.generateReport());"
```

---

## Learning Tips

1. Define your product schema and validation rules before coding methods.
2. Implement `addProduct` and `adjustStock` first, then reporting.
3. Write a tiny helper for movement creation so logs stay consistent.
4. Use failure-first tests (bad input) before success-path tests.
5. Keep report logic read-only and fully derived.

---

## Interview Narrative

Problem: Inventory systems fail when stock updates are not auditable and consistent.

Approach: I designed inventory commands with strict validation and append-only movement logs. Every successful adjustment updates stock and records a reasoned movement entry. Reports are derived from state, not manually maintained counters.

Outcome: The module became predictable, testable, and suitable for production-style backend workflows.

---

## Code Comments in Starter

See `src/index.js` for TODO guidance on validation, atomic adjustments, and report derivation.

---

## Acceptance Criteria

- Deterministic output for same commands and input sequence
- Clear validation errors for invalid commands
- No impossible stock states
- Movement history explains stock changes end-to-end
