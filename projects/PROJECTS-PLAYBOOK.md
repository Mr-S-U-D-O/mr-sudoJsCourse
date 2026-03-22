# Projects Playbook

This playbook turns the projects directory into a repeatable learning system, not just a list of folders.

## 1) How To Use Any Project

1. Read the project problem and write your own short spec first.
2. List 5-10 acceptance cases in plain language.
3. Implement starter code in vertical slices (input -> logic -> output).
4. Run quick manual checks after every slice.
5. Refactor only after behavior is stable.
6. Compare against solution and document what you would keep/change.

## 2) Definition Of Done

A project is complete only when all are true:

- Correctness: core and edge behavior works.
- Clarity: names and module boundaries are understandable.
- Robustness: invalid inputs fail gracefully.
- Explainability: you can explain design tradeoffs in plain English.
- Reusability: code can be extended without rewrites.

## 3) Scoring Rubric (Self Review)

Score each category from 1 to 5:

- Requirements coverage
- Error handling
- Testability
- Readability
- Extensibility
- Performance awareness

Target score before moving to next level: 22/30 or higher.

## 4) Extension Prompts (After Baseline)

- Add strict input schemas and meaningful error objects.
- Add deterministic tests for edge cases and random behavior.
- Add instrumentation counters (calls, cache hits, retries, failures).
- Add serialization and state recovery for crash-safe behavior.
- Add one alternative implementation and compare tradeoffs.

## 5) Interview Story Template

Use this structure for each completed project:

1. Problem: what had to be solved.
2. Constraints: correctness, speed, reliability, API shape.
3. Design: data model and major modules.
4. Tradeoffs: what you optimized and what you deprioritized.
5. Hard bug: one real bug and the debugging path.
6. Next step: one production-grade improvement.

## 6) Suggested Evidence Per Project

- 1 short architecture note in `docs/architecture.md`.
- 1 terminal run log with realistic inputs.
- 1 list of edge cases tried.
- 1 reflection note: what changed between first and final version.

## 7) Anti-Patterns To Avoid

- Jumping to the solution before first attempt.
- Writing one giant function for all logic.
- Skipping invalid input handling.
- Optimizing before correctness is verified.
- Copy-pasting patterns without understanding tradeoffs.

## 8) Fast Weekly Cadence

- Day 1: Spec + acceptance cases
- Day 2: Baseline implementation
- Day 3: Edge cases + refactor
- Day 4: Architecture note + interview story
- Day 5: Optional extension challenge

Repeat this loop for each project. Consistency beats intensity.