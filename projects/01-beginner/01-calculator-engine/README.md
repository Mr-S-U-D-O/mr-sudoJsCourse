<!-- enriched-v2: projects/tools/enrich-project-lessons-v2.js -->
# Calculator Engine

**Difficulty:** 🟢 Beginner | **Time:** 5-8 hours | **Focus:** tokenization, precedence, validation

## Quick Start

Build a safe arithmetic engine that parses expressions and evaluates them with correct precedence.

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
Input: 2 + 3 * 4
Pipeline: validate -> transform -> enforce rules -> return result
Output: 14
```

Your implementation should keep this behavior deterministic and testable.

## Real-World Use Cases

- CLI calculators
- formula engines
- education tooling

## Project Aim

Parse and evaluate arithmetic expressions without using eval, while keeping parsing, validation, and evaluation separate.

## Core Concepts You Must Learn

- tokenization
- precedence
- validation

## Accuracy Traps To Avoid

- Ignoring multiplication/division precedence.
- Accepting invalid token sequences silently.
- Combining parse and evaluate in one opaque function.

## Quality Checks

- 2+3*4 returns 14.
- Invalid expressions return clear errors.
- Whitespace does not change output.
- Starter API exports are discoverable.
- Solution behavior can be reproduced from one command.

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/01-beginner/01-calculator-engine/src'); console.log('Starter exports:', Object.keys(m));"
node -e "const m=require('./projects/01-beginner/01-calculator-engine/solution/index.solution'); console.log('Solution exports:', Object.keys(m));"
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
