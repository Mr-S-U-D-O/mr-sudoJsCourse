<!-- generated: projects/tools/regenerate-guides.js -->
# Implementation Guide: Contact Manager

## Why This Guide Exists

This guide is project-specific. Use it to translate this folder's API surface into a step-by-step implementation plan.

## Project Mental Model

Start from input contract -> validation -> core logic -> output contract. Keep each stage independently testable.

## First Invariants To Lock In

- Core function contracts are deterministic.
- Invalid input paths fail with clear messages.
- State changes (if any) are explicit and inspectable.

## Suggested Implementation Order

1. createContact: define constructor inputs and object shape
2. addContact: validate input then append/update state safely
3. updateContact: apply partial changes without breaking invariants
4. deleteContact: handle not-found paths and preserve consistency
5. searchContacts: define clear behavior and edge-case handling
6. getContact: return deterministic read model
7. getAllContacts: return deterministic read model

## Failure Cases To Handle Early

- Malformed input shape
- Boundary values
- Unexpected type combinations

## Project-Specific Manual Tests

1. One happy path
2. One edge path
3. One failure path at Intermediate depth

## API Completion Checklist

- [ ] createContact has at least one happy path and one edge-case test.
- [ ] addContact has at least one happy path and one edge-case test.
- [ ] updateContact has at least one happy path and one edge-case test.
- [ ] deleteContact has at least one happy path and one edge-case test.
- [ ] searchContacts has at least one happy path and one edge-case test.
- [ ] getContact has at least one happy path and one edge-case test.
- [ ] getAllContacts has at least one happy path and one edge-case test.

## Level-Up Reflection (Intermediate)

1. Which function was hardest to make deterministic and why?
2. Which invariant almost broke during implementation?
3. Which failure case gave you the most insight into the design?
4. What one refactor would improve maintainability next?
