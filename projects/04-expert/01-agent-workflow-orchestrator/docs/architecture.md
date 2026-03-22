# Agent Orchestrator Architecture Notes

## Scope

Workflow schema, scheduler, executor, retry policy, and runtime state logging.

## Components

- schema validator
- dependency scheduler
- node executor
- retry manager
- run-state store

## Reliability Principles

- fail fast on invalid graph definitions
- make retries explicit and bounded
- capture reason metadata for all failures

## Next Iterations

- parallel branch execution
- human approval nodes
- pluggable persistence backend