<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Unit Converter

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Use canonical conversion math with a single source of truth for factors/formulas.

## First Invariants To Lock In

- Every supported unit can convert through a known path.
- Precision policy is consistent.
- Unsupported units fail fast with clear validation.

## Suggested Implementation Order

1. convert: implement core math/rule transformation
2. convertLength: implement core math/rule transformation
3. convertWeight: implement core math/rule transformation
4. convertVolume: implement core math/rule transformation
5. getConversionFactors: return deterministic read model

## Failure Cases To Handle Early

- Unknown unit names
- Non-numeric values
- Rounding errors from repeated conversion

## Project-Specific Manual Tests

1. 0C should convert to 32F
2. Round-trip conversion should stay within tolerance
3. Unknown units should produce validation error

## API Completion Checklist

- [ ] convert has at least one happy path and one edge-case test.
- [ ] convertLength has at least one happy path and one edge-case test.
- [ ] convertWeight has at least one happy path and one edge-case test.
- [ ] convertVolume has at least one happy path and one edge-case test.
- [ ] getConversionFactors has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
