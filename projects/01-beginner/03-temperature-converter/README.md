<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Temperature Converter

## Project Aim

Implement accurate unit conversion with explicit formulas and boundaries.

## Real-World Use Cases

- weather apps
- fitness apps
- engineering tooling

## Core Concepts You Must Learn

- normalization
- conversion maps
- precision handling

## Accuracy Traps To Avoid

- Rounding too early and losing precision.
- Not validating supported units before converting.
- Hard-coding formulas in multiple places.

## Quality Checks

- 0C converts to 32F exactly.
- Reverse conversion returns the original value within tolerance.
- Unknown unit returns a clear validation error.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/01-beginner/03-temperature-converter/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/01-beginner/03-temperature-converter/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
