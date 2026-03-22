# Guide: Chess Rules Engine

## Build Order

1. Decide board data model and piece representation.
2. Implement base movement logic per piece type.
3. Add a legal-move filter to prevent self-check.
4. Implement game status detection (check, checkmate, stalemate).
5. Add optional support for special rules and notation parsing.

## What To Search

- chess move generation JavaScript
- legal move filtering self check
- checkmate detection algorithm
- board coordinate mapping algebraic notation

## How To Think

- Split into pseudo-legal move generation first.
- Then apply legality constraints.
- Prefer tiny helper functions for each rule.

## Suggested Learning Resources

- https://www.chessprogramming.org/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
- https://en.wikipedia.org/wiki/Glossary_of_chess

## Phase 1: Model The Domain

- Define the entities and state transitions first.
- Write input and output contracts before implementation.
- List invariants that must always remain true.

## Phase 2: Build Minimal Correct Behavior

- Implement one end-to-end flow that works reliably.
- Keep pure logic separate from I/O side effects.
- Add guard clauses for invalid input paths.

## Phase 3: Add Resilience

- Add explicit error handling for expected failure modes.
- Add boundaries for untrusted or malformed data.
- Capture metadata useful for debugging and observability.

## Manual Test Matrix

- Happy path: one normal operation that should succeed.
- Edge path: smallest and largest valid values.
- Failure path: malformed input with expected error.
- Repeatability: same input run twice should match output.
- Explainability: each result can be traced to a rule.

## Quality Validation Checklist

- [ ] Core concepts are visible in code structure: state transitions, rule validation, random control.
- [ ] Error messages are actionable and consistent.
- [ ] At least 3 edge cases are documented and tested.
- [ ] Behavior aligns with all listed quality checks in README.
- [ ] One improvement idea is recorded after comparing with solution.

## Reflection Prompt

Write 5 lines:

1. Which invariant was hardest to preserve?
2. Which bug appeared first and why?
3. What would break first in production?
4. What metric would you monitor?
5. What would you refactor next?
