<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Implementation Guide: Social Feed System

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

- [ ] Core concepts are visible in code structure: clear interfaces, error handling, deterministic behavior.
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
