# Async Await Common Mistakes

## Mistake 1: Memorizing Syntax Without Runtime Model

Problem:
- Code looks correct but behavior is surprising.

Fix:
- Explain data flow and scope flow out loud before editing.

## Mistake 2: Mixing Multiple Concepts in One Refactor

Problem:
- Hard to know which change caused a regression.

Fix:
- Refactor in one-dimension steps and run tests each step.

## Mistake 3: Ignoring Edge Cases

Problem:
- Works on happy path only.

Fix:
- Add at least one empty, invalid, and boundary input test.

## Quick Debug Checklist

- What assumption failed?
- Which value changed unexpectedly?
- Is this a scope issue or data-shape issue?
