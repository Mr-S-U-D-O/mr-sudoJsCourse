<!-- enriched-v2: projects/tools/enrich-project-lessons-v2.js -->

# Password Strength Checker

**Difficulty:** 🟢 Beginner | **Time:** 5-8 hours | **Focus:** interface design, validation, error handling

## Quick Start

Build a production-style implementation that favors testability, clear contracts, and predictable behavior.

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
Input: domain input
Pipeline: validate -> transform -> enforce rules -> return result
Output: validated deterministic output
```

Your implementation should keep this behavior deterministic and testable.

## Real-World Use Cases

- internal tooling
- backend services
- automation workflows

## Project Aim

Implement a clear architecture that separates validation, business rules, and output shaping.

## Core Concepts You Must Learn

- interface design
- validation
- error handling

## Accuracy Traps To Avoid

- Missing explicit validation boundaries.
- Implicit mutations that are hard to debug.
- No deterministic checks for correctness.

## Quality Checks

- Core behavior passes happy-path and edge-case tests.
- Invalid inputs fail with actionable errors.
- Repeated runs with same input match output.
- Starter API exports are discoverable.
- Solution behavior can be reproduced from one command.

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/src'); console.log('Starter exports:', Object.keys(m));"
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/solution/index.solution'); console.log('Solution exports:', Object.keys(m));"
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
