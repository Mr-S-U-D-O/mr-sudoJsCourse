# E-commerce Platform

**Difficulty:** 🟠 Advanced | **Time:** 16-20 hours | **Skills:** Transactions, Consistency, Orders, Complex Workflows

## Project Aim

Build a complete e-commerce system with products, orders, inventory synchronization, and transaction consistency. Master complex business logic, state management, and system coordination.

## Visualize The Product

Imagine running an online store with real inventory management:

```
Platform:
  - Products catalog with inventory
  - Customer orders and fulfillment
  - Dynamic pricing and discounts
  - Inventory sync across operations
  - Order fulfillment workflow

Example Flow:
1. Customer adds product to cart
2. Places order → Creates transaction
3. Inventory decreases
4. Payment processes
5. Order moves through fulfillment (Pending → Shipped → Delivered)
6. Customer can track and manage order
```

## Real-World Use Cases

1. **Online Retail** - Full e-commerce system with inventory management
2. **Marketplace Platforms** - Multi-vendor with order coordination
3. **Subscription Services** - Recurring orders with billing
4. **Warehouse Management** - Inventory tracking and fulfillment
5. **B2B Ordering** - Bulk orders with custom pricing and workflows

## What You Should Know

- **Transactions**: Ensuring order and inventory consistency
- **State Machines**: Order workflow states and valid transitions
- **Inventory Management**: Real-time stock tracking and updates
- **Pricing Logic**: Discounts, taxes, shipping calculations
- **Concurrency**: Handling simultaneous orders for same product
- **Error Recovery**: What happens if payment fails mid-transaction?

## Rules & Requirements

Your implementation should:

- ✅ Support products with inventory, categories, pricing
- ✅ Implement full order workflow (pending, processing, shipped, delivered)
- ✅ Maintain inventory consistency across all operations
- ✅ Handle discounts and promotion codes
- ✅ Support order cancellation with inventory restoration
- ✅ Prevent overselling (integrity constraints)
- ✅ Calculate shipping, tax, and total costs
- ✅ Support customer order history and tracking
- ✅ Handle concurrent orders safely
- ✅ Provide comprehensive error handling

## How To Run

### Test the Starter (your implementation)

```bash
node -e "const m=require('./projects/03-advanced/03-ecommerce-platform/src'); const platform=m.createEcommercePlatform(); console.log(Object.keys(platform));"
```

### Test the Solution

```bash
node -e "const m=require('./projects/03-advanced/03-ecommerce-platform/solution/index.solution'); const p=m.createEcommercePlatform(); p.addProduct({id:'P1', name:'Laptop', price:999, inventory:10}); const order=p.createOrder('CUST1', [{productId:'P1', quantity:1}]); console.log(order);"
```

### More Complex Example

```bash
node -e "const m=require('./projects/03-advanced/03-ecommerce-platform/solution/index.solution'); const p=m.createEcommercePlatform(); p.addProduct({id:'P1', name:'Item', price:50, inventory:5}); const o=p.createOrder('C1', [{productId:'P1', qty:2}]); console.log('Order:', o); console.log('Stock remaining:', p.getProductInventory('P1'));"
```

## Interview Talking Points

- How would you handle race conditions when multiple orders arrive simultaneously?
- Explain your transaction strategy and how you ensure consistency
- What happens if payment fails after inventory is reserved?
- How would you implement refunds and order cancellations safely?
- How would you scale this to handle thousands of concurrent orders?
- What monitoring and alerting would you implement for inventory?

---

**Start with:** [guide.md](./guide.md) for step-by-step implementation  
**Reference:** [solution/index.solution.js](./solution/index.solution.js) after attempting  
**Explore:** [docs/architecture.md](./docs/architecture.md) for design decisions

## Core Concepts You Must Learn

- invariants
- atomic updates
- ledger thinking

## Accuracy Traps To Avoid

- Updating partial state on failed operations.
- Using floating math where currency precision is required.
- Not validating entity existence before writes.

## Quality Checks

- Totals remain consistent after add/remove/update operations.
- Failed operations do not mutate persisted state.
- Audit output can explain how final totals were computed.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.

## Quick Start

Build transactional domain logic that preserves invariants under every mutation.

## Prerequisites

Before starting, review:

1. 01-Closures
2. 03-Prototypes
3. 04-Classes
4. 05-Callbacks
5. 06-Promises
6. 07-Async-Await
7. 08-Modules

## Learning Tips

1. Implement the minimal happy path first.
2. Add validation before edge-case behavior.
3. Keep pure logic separate from side effects.
4. Add deterministic checks before refactoring.

## Interview Narrative

Problem: Ecommerce Platform needs consistent behavior under real constraints.

Approach: model inputs explicitly, enforce rule boundaries, separate logic from orchestration.

Outcome: testable, deterministic behavior with clear extension points.
