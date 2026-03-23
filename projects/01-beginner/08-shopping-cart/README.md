<!-- enriched-v2: projects/tools/enrich-project-lessons-v2.js -->

# Shopping Cart

**Difficulty:** 🟢 Beginner | **Time:** 5-8 hours | **Focus:** invariants, atomic updates, consistency checks

## Quick Start

Build transactional domain logic that preserves invariants under every mutation.

## Prerequisites

Before starting, review:

1. 01-Variables
2. 02-Data-Types
3. 03-Operators
4. 04-Control-Flow
5. 05-Loops
6. 06-Functions-Basics
7. 08-Objects-Basics

## Visualize The Product

```txt
Input: add item, update qty, remove item
Pipeline: validate -> transform -> enforce rules -> return result
Output: consistent totals and balances
```

Your implementation should keep this behavior deterministic and testable.

## Real-World Use Cases

- checkout flows
- inventory services
- financial operations

## Project Aim

Implement atomic updates, strict validation, and clear error paths to protect financial consistency.

## Core Concepts You Must Learn

- invariants
- atomic updates
- consistency checks

## Accuracy Traps To Avoid

- Applying partial updates on failure.
- Using floating arithmetic for money.
- Mutating non-existent entities.

## Quality Checks

- Totals remain consistent after mutations.
- Failed operations do not mutate state.
- Audit output explains final values.
- Starter API exports are discoverable.
- Solution behavior can be reproduced from one command.

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/01-beginner/08-shopping-cart/src'); console.log('Starter exports:', Object.keys(m));"
node -e "const m=require('./projects/01-beginner/08-shopping-cart/solution/index.solution'); console.log('Solution exports:', Object.keys(m));"
```

## Acceptance Criteria

- Deterministic outputs for identical inputs
- Explicit validation for malformed input
- At least 5 manual checks documented in guide.md
- One architecture tradeoff explained in notes

## Learning Tips

1. Implement the minimal happy path first.
2. Add validation before adding edge-case behavior.
3. Keep pure logic separate from side effects.
4. Add deterministic checks before refactoring.

## Interview Narrative

Problem: this domain needs consistent behavior under real constraints.

Approach: I modeled inputs explicitly, enforced rule boundaries, and separated core logic from orchestration concerns.

Outcome: the module became testable, deterministic, and easier to extend without regressions.
