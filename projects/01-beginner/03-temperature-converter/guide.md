<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Temperature Converter

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Use canonical conversion math with a single source of truth for factors/formulas.

## First Invariants To Lock In

- Every supported unit can convert through a known path.
- Precision policy is consistent.
- Unsupported units fail fast with clear validation.

## Suggested Implementation Order

1. celsiusToFahrenheit: define clear behavior and edge-case handling
2. fahrenheitToCelsius: define clear behavior and edge-case handling
3. celsiusToKelvin: define clear behavior and edge-case handling
4. kelvinToCelsius: define clear behavior and edge-case handling
5. fahrenheitToKelvin: define clear behavior and edge-case handling
6. kelvinToFahrenheit: define clear behavior and edge-case handling
7. getValidUnits: return deterministic read model
8. convert: implement core math/rule transformation

## Failure Cases To Handle Early

- Unknown unit names
- Non-numeric values
- Rounding errors from repeated conversion

## Project-Specific Manual Tests

1. 0C should convert to 32F
2. Round-trip conversion should stay within tolerance
3. Unknown units should produce validation error

## API Completion Checklist

- [ ] celsiusToFahrenheit has at least one happy path and one edge-case test.
- [ ] fahrenheitToCelsius has at least one happy path and one edge-case test.
- [ ] celsiusToKelvin has at least one happy path and one edge-case test.
- [ ] kelvinToCelsius has at least one happy path and one edge-case test.
- [ ] fahrenheitToKelvin has at least one happy path and one edge-case test.
- [ ] kelvinToFahrenheit has at least one happy path and one edge-case test.
- [ ] getValidUnits has at least one happy path and one edge-case test.
- [ ] convert has at least one happy path and one edge-case test.

## Level-Up Reflection (Beginner)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
