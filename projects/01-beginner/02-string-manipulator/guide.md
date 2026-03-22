<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: String Manipulator

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Treat this as text in -> normalized tokens -> deterministic output. Keep normalization and transformation steps separate.

## First Invariants To Lock In

- Normalization rules are explicit and consistent.
- Same input always returns the same output.
- Malformed text paths return clear errors, not partial success.

## Suggested Implementation Order

1. reverseString: define clear behavior and edge-case handling
2. capitalize: define clear behavior and edge-case handling
3. toUpperCase: define clear behavior and edge-case handling
4. toLowerCase: define clear behavior and edge-case handling
5. toCamelCase: define clear behavior and edge-case handling
6. toSnakeCase: define clear behavior and edge-case handling
7. countCharacters: define clear behavior and edge-case handling
8. countWords: define clear behavior and edge-case handling
9. countVowels: define clear behavior and edge-case handling
10. isPalindrome: return a pure boolean predicate
11. trim: define clear behavior and edge-case handling
12. removeSpaces: handle not-found paths and preserve consistency
13. repeatString: define clear behavior and edge-case handling
14. replaceAll: define clear behavior and edge-case handling

## Failure Cases To Handle Early

- Leading/trailing/multiple separators
- Empty strings and null-like inputs
- Mixed casing and punctuation edge cases

## Project-Specific Manual Tests

1. Run with simple plain text
2. Run with punctuation-heavy text
3. Run with malformed input and verify error message

## API Completion Checklist

- [ ] reverseString has at least one happy path and one edge-case test.
- [ ] capitalize has at least one happy path and one edge-case test.
- [ ] toUpperCase has at least one happy path and one edge-case test.
- [ ] toLowerCase has at least one happy path and one edge-case test.
- [ ] toCamelCase has at least one happy path and one edge-case test.
- [ ] toSnakeCase has at least one happy path and one edge-case test.
- [ ] countCharacters has at least one happy path and one edge-case test.
- [ ] countWords has at least one happy path and one edge-case test.
- [ ] countVowels has at least one happy path and one edge-case test.
- [ ] isPalindrome has at least one happy path and one edge-case test.
- [ ] trim has at least one happy path and one edge-case test.
- [ ] removeSpaces has at least one happy path and one edge-case test.
- [ ] repeatString has at least one happy path and one edge-case test.
- [ ] replaceAll has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
