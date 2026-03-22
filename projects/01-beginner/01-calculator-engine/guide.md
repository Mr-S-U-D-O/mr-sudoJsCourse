<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Calculator Engine

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Treat this as a 3-stage pipeline: tokenize input, validate token order, then evaluate with operator precedence.

## First Invariants To Lock In

- Tokens must alternate number -> operator -> number.
- No invalid characters should survive tokenization.
- Multiplication and division must execute before addition and subtraction.

## Suggested Implementation Order

1. tokenize: convert raw input into structured tokens
2. validateTokens: enforce contract and return actionable errors
3. evaluate: define clear behavior and edge-case handling
4. calculate: implement core math/rule transformation

## Failure Cases To Handle Early

- Consecutive operators like 2++3
- Empty or whitespace-only input
- Division by zero

## Project-Specific Manual Tests

1. 2+3*4 should return 14
2. 10/2-3 should return 2
3. 2++3 should return a clear validation error

## API Completion Checklist

- [ ] tokenize has at least one happy path and one edge-case test.
- [ ] validateTokens has at least one happy path and one edge-case test.
- [ ] evaluate has at least one happy path and one edge-case test.
- [ ] calculate has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
