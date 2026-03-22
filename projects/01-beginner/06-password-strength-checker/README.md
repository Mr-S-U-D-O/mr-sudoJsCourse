<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Password Strength Checker

## Project Aim

Implement security-aware validation and account logic with explicit rules.

## Real-World Use Cases

- sign-up forms
- identity systems
- access control

## Core Concepts You Must Learn

- rule engines
- security validation
- failure modes

## Accuracy Traps To Avoid

- Leaking sensitive details in errors.
- Using weak default validation rules.
- Not separating authentication from authorization logic.

## Quality Checks

- Invalid credentials fail without leaking internals.
- Rules are deterministic for the same input.
- Privilege checks are enforced on protected operations.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/01-beginner/06-password-strength-checker/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
