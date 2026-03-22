<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Graphql Api Builder

## Project Aim

Build parsing and transformation pipelines with clear stages.

## Real-World Use Cases

- documentation tooling
- code generation
- query systems

## Core Concepts You Must Learn

- lexing/parsing
- AST thinking
- transform passes

## Accuracy Traps To Avoid

- Combining parse and transform in one pass.
- Ignoring malformed input paths.
- Not preserving deterministic output ordering.

## Quality Checks

- Parser rejects malformed input with actionable errors.
- Well-formed input produces stable output snapshots.
- Transformation rules are testable in isolation.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/03-advanced/09-graphql-api-builder/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/03-advanced/09-graphql-api-builder/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
