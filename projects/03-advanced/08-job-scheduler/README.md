<!-- enriched: projects/tools/enrich-project-lessons.js -->
# Job Scheduler

## Project Aim

Build reliability-focused systems with explicit resilience strategies.

## Real-World Use Cases

- API gateways
- distributed jobs
- real-time systems

## Core Concepts You Must Learn

- timeouts
- retries
- backpressure

## Accuracy Traps To Avoid

- Retrying non-idempotent operations blindly.
- Ignoring timeout and cancellation propagation.
- No visibility into failure reasons and latency.

## Quality Checks

- Timeout, retry, and failure behavior are deterministic in tests.
- Backpressure or queue bounds prevent unbounded growth.
- Operational metrics expose throughput and error rate.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/03-advanced/08-job-scheduler/src'); console.log(Object.keys(m));"
```

2. Inspect solution metadata

```bash
node -e "const m=require('./projects/03-advanced/08-job-scheduler/solution/index.solution'); console.log(m.metadata || Object.keys(m));"
```

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
