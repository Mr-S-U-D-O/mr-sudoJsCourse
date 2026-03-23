<!-- enriched-v2: projects/tools/enrich-project-lessons-v2.js -->

# Temperature Converter

**Difficulty:** 🟢 Beginner | **Time:** 5-8 hours | **Focus:** unit normalization, formula mapping, precision handling

## Quick Start

Build a deterministic conversion engine that handles units, ranges, and precision correctly.

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
Input: 100 C -> F
Pipeline: validate -> transform -> enforce rules -> return result
Output: 212 F
```

Your implementation should keep this behavior deterministic and testable.

## Real-World Use Cases

- weather apps
- fitness apps
- engineering calculators

## Project Aim

Implement explicit conversion formulas and unit validation so every conversion path is testable and reversible within tolerance.

## Core Concepts You Must Learn

- unit normalization
- formula mapping
- precision handling

## Accuracy Traps To Avoid

- Rounding too early and losing precision.
- Not validating source/target units.
- Duplicating formulas across functions.

## Quality Checks

- 0C converts to 32F.
- Reverse conversion returns original value within tolerance.
- Unsupported units throw explicit errors.
- Starter API exports are discoverable.
- Solution behavior can be reproduced from one command.

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/01-beginner/03-temperature-converter/src'); console.log('Starter exports:', Object.keys(m));"
node -e "const m=require('./projects/01-beginner/03-temperature-converter/solution/index.solution'); console.log('Solution exports:', Object.keys(m));"
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
