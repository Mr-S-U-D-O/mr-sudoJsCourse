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