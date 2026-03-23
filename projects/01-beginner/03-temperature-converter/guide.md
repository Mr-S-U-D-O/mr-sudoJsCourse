<!-- guide-v2: projects/tools/generate-project-guides-v2.js -->
# Implementation Guide: Temperature Converter

Use this guide while implementing the starter. The goal is to move from a minimal passing path to robust behavior without losing clarity.

## Phase 1: Model The Domain

- Define input contract and expected output shape before coding.
- Write down required invariants and forbidden states.
- Model state explicitly in one structure so transitions are traceable.
- Identify one happy-path scenario and one invalid-input scenario.

## Phase 2: Build Minimal Correct Behavior

- Implement only the happy path first and verify it with a manual check.
- Add guard clauses for malformed input before adding more features.
- Keep pure logic functions separate from side-effect orchestration.
- Ensure output is deterministic for identical input conditions.

## Phase 3: Add Resilience

- Add explicit error messages for each invalid input class.
- Handle edge conditions (empty input, bounds, nullish values, duplicates).
- Add failure-safe behavior where partial updates could corrupt state.
- Add one observable signal (history/event list/metrics snapshot) for debugging.

## Manual Test Matrix

- Happy path: one representative valid scenario.
- Edge path: smallest and largest valid values.
- Validation path: malformed input returns clear error.
- Repeatability path: same input run twice returns same output.
- State path: updates preserve invariants after multiple operations.

## Quality Validation Checklist

- [ ] Project behavior is deterministic and testable.
- [ ] Validation failures are explicit and readable.
- [ ] At least 5 manual checks are written and executable.
- [ ] Core implementation reflects core data flow and defensive validation.
- [ ] One architecture tradeoff is documented in notes.

## Reflection Prompt

Write short answers after implementation:

1. Which invariant was easiest to break and why?
2. Which bug appeared first during manual tests?
3. What production risk still remains?
4. Which metric would you monitor first?
5. What would you refactor next and why?
