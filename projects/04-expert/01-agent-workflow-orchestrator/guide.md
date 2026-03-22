# Guide: Agent Workflow Orchestrator

## Build Order

1. Define workflow schema (nodes, deps, retry policy).
2. Validate graph shape and reject cycles.
3. Build scheduler to find runnable nodes.
4. Execute nodes via tool adapters.
5. Add retry/backoff and timeout handling.
6. Persist run-state snapshots and logs.

## What To Search

- dag scheduler javascript
- retry backoff strategy node js
- idempotent workflow steps
- structured logging distributed systems

## How To Think

- Separate coordination from tool logic.
- Make each step replay-safe where possible.
- Design with failures as normal behavior.

## Suggested Learning Resources

- https://nodejs.org/en/learn/asynchronous-work
- https://martinfowler.com/articles/patterns-of-distributed-systems/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

## Phase 1: Model The Domain

- Define the entities and state transitions first.
- Write input and output contracts before implementation.
- List invariants that must always remain true.

## Phase 2: Build Minimal Correct Behavior

- Implement one end-to-end flow that works reliably.
- Keep pure logic separate from I/O side effects.
- Add guard clauses for invalid input paths.

## Phase 3: Add Resilience

- Add explicit error handling for expected failure modes.
- Add boundaries for untrusted or malformed data.
- Capture metadata useful for debugging and observability.

## Manual Test Matrix

- Happy path: one normal operation that should succeed.
- Edge path: smallest and largest valid values.
- Failure path: malformed input with expected error.
- Repeatability: same input run twice should match output.
- Explainability: each result can be traced to a rule.

## Quality Validation Checklist

- [ ] Core concepts are visible in code structure: timeouts, retries, backpressure, consistency.
- [ ] Error messages are actionable and consistent.
- [ ] At least 3 edge cases are documented and tested.
- [ ] Behavior aligns with all listed quality checks in README.
- [ ] One improvement idea is recorded after comparing with solution.

## Reflection Prompt

Write 5 lines:

1. Which invariant was hardest to preserve?
2. Which bug appeared first and why?
3. What would break first in production?
4. What metric would you monitor?
5. What would you refactor next?
