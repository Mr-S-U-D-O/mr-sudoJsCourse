# Test Tiering Guide

Use this guide to keep tests educational and progressively challenging.

## Tier Definitions

- Bronze: baseline correctness for expected inputs.
- Silver: edge cases, validation, and boundary behavior.
- Gold: trap assumptions, mutation safety, and reasoning depth.

## Naming Convention

Prefix every test title with the tier name.

Examples:

- Bronze: returns expected transformed output
- Silver: throws on invalid input type
- Gold: does not mutate input references

## Minimum Test Mix Per Lesson

- At least 1 Bronze test
- At least 1 Silver test
- At least 1 Gold test

Recommended:

- 5 total tests: 1 Bronze, 2 Silver, 2 Gold

## Author Checklist

- Every test name states intent clearly.
- At least one test checks validation behavior.
- At least one test catches a common wrong implementation.
- Tests can be understood by learners as documentation.
