<!-- enriched-v2: projects/tools/enrich-project-lessons-v2.js -->

# Word Counter

**Difficulty:** 🟢 Beginner | **Time:** 5-8 hours | **Focus:** tokenization, normalization, frequency analysis

## Quick Start

Build text-processing logic that is deterministic across edge cases like punctuation, whitespace, and casing.

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
Input: Hello, hello world
Pipeline: validate -> transform -> enforce rules -> return result
Output: hello:2, world:1
```

Your implementation should keep this behavior deterministic and testable.

## Real-World Use Cases

- content analytics
- search indexing
- editor tooling

## Project Aim

Create a stable text pipeline that tokenizes input, normalizes tokens, and computes accurate outputs.

## Core Concepts You Must Learn

- tokenization
- normalization
- frequency analysis

## Accuracy Traps To Avoid

- Splitting only on spaces and ignoring punctuation.
- Counting case variants as different tokens unintentionally.
- Failing on empty or whitespace-only input.

## Quality Checks

- Case-insensitive mode behaves consistently.
- Punctuation handling is documented and testable.
- Output ordering is deterministic.
- Starter API exports are discoverable.
- Solution behavior can be reproduced from one command.

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/01-beginner/04-word-counter/src'); console.log('Starter exports:', Object.keys(m));"
node -e "const m=require('./projects/01-beginner/04-word-counter/solution/index.solution'); console.log('Solution exports:', Object.keys(m));"
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
