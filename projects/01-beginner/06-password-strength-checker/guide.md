<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Password Strength Checker

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Start from input contract -> validation -> core logic -> output contract. Keep each stage independently testable.

## First Invariants To Lock In

- Core function contracts are deterministic.
- Invalid input paths fail with clear messages.
- State changes (if any) are explicit and inspectable.

## Suggested Implementation Order

1. checkPasswordStrength: enforce contract and return actionable errors
2. validatePassword: enforce contract and return actionable errors
3. getStrengthRules: return deterministic read model
4. evaluateRule: define clear behavior and edge-case handling
5. computeScore: define clear behavior and edge-case handling

## Failure Cases To Handle Early

- Malformed input shape
- Boundary values
- Unexpected type combinations

## Project-Specific Manual Tests

1. One happy path
2. One edge path
3. One failure path at Beginner depth

## API Completion Checklist

- [ ] checkPasswordStrength has at least one happy path and one edge-case test.
- [ ] validatePassword has at least one happy path and one edge-case test.
- [ ] getStrengthRules has at least one happy path and one edge-case test.
- [ ] evaluateRule has at least one happy path and one edge-case test.
- [ ] computeScore has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
