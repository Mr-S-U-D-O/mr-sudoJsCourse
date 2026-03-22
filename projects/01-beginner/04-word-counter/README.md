<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Word Counter

## Project Aim

Analyze text accurately using deterministic tokenization and counts.

## Real-World Use Cases

- content analysis
- search ranking
- editor analytics

## Core Concepts You Must Learn

- tokenization
- frequency maps
- normalization

## Accuracy Traps To Avoid

- Splitting only on spaces and missing punctuation rules.
- Counting case variants as separate words by mistake.
- Not handling empty input or multiple separators.

## Quality Checks

- Case-insensitive counting can be toggled and verified.
- Punctuation handling is documented and consistent.
- Top-N frequency output is stable for ties.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/01-beginner/04-word-counter/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/01-beginner/04-word-counter/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
