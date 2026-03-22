<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Word Counter

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Treat this as text in -> normalized tokens -> deterministic output. Keep normalization and transformation steps separate.

## First Invariants To Lock In

- Normalization rules are explicit and consistent.
- Same input always returns the same output.
- Malformed text paths return clear errors, not partial success.

## Suggested Implementation Order

1. tokenize: convert raw input into structured tokens
2. countWords: define clear behavior and edge-case handling
3. getFrequency: return deterministic read model
4. getTopNWords: return deterministic read model
5. normalizeWord: define clear behavior and edge-case handling

## Failure Cases To Handle Early

- Leading/trailing/multiple separators
- Empty strings and null-like inputs
- Mixed casing and punctuation edge cases

## Project-Specific Manual Tests

1. Run with simple plain text
2. Run with punctuation-heavy text
3. Run with malformed input and verify error message

## API Completion Checklist

- [ ] tokenize has at least one happy path and one edge-case test.
- [ ] countWords has at least one happy path and one edge-case test.
- [ ] getFrequency has at least one happy path and one edge-case test.
- [ ] getTopNWords has at least one happy path and one edge-case test.
- [ ] normalizeWord has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
