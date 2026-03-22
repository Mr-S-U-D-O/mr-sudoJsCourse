# Project 03: Inventory Management System

## Project Aim

Build inventory core logic that can power a stock dashboard: product catalog, stock adjustments, low-stock detection, and reporting.

## Visualize The Product

Think of a warehouse manager screen:

- left panel: products and current quantities;
- middle: recent stock movements;
- right: low-stock alerts and reorder candidates.

Your code is the business engine behind that screen.

## Real-World Use Cases

- Ecommerce inventory services
- POS and warehouse software
- Supplier reorder planning tools
- Inventory analytics pipelines

## What You Should Know First

- JavaScript object modeling
- Data validation basics
- Aggregation/reporting patterns

## Rules

- Validate all state mutations.
- Keep an append-only audit trail of movements.
- Separate domain logic from storage concerns.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/03-inventory-management-system/src'); console.log(Object.keys(m));"
```

2. Quick starter run

```bash
node -e "const m=require('./projects/03-inventory-management-system/src'); const s=m.createInventorySystem(); console.log(s.generateReport());"
```

What this does:

- creates the system;
- runs a report with default state;
- confirms your module boots and returns expected shapes.

3. Reference solution run

```bash
node -e "const m=require('./projects/03-inventory-management-system/solution/index.solution'); const s=m.createInventorySystem(); s.addProduct({sku:'SKU1',name:'Mouse',unitPrice:25,quantity:8,reorderPoint:3}); s.adjustStock('SKU1',-2,'sale'); console.log(s.generateReport());"
```

What this does:

- adds a product;
- records an outbound stock movement;
- prints report output including valuation and low-stock candidates.

## Interview Narrative You Can Use

- Problem: inventory consistency and traceability.
- Design: mutation methods + movement ledger + reporting layer.
- Outcome: predictable stock state and explainable audit history.
