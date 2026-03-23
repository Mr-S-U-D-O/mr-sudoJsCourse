<!-- enriched-v2: projects/tools/enrich-project-lessons-v2.js -->
# Job Scheduler

**Difficulty:** 🟠 Advanced | **Time:** 12-18 hours | **Focus:** state machines, transition validation, audit trail

## Quick Start

Build a workflow engine with valid transitions, history tracking, and deterministic state metrics.

## Prerequisites

Before starting, review:

1. 01-Closures
2. 03-Prototypes
3. 04-Classes
4. 05-Callbacks
5. 06-Promises
6. 07-Async-Await
7. 08-Modules

## Visualize The Product

```txt
Input: new -> triaged -> in_progress -> done
Pipeline: validate -> transform -> enforce rules -> return result
Output: valid timeline with metrics
```

Your implementation should keep this behavior deterministic and testable.

## Real-World Use Cases

- service desks
- issue trackers
- operations workflow systems

## Project Aim

Model lifecycle transitions as explicit rules and enforce invariants with event history.

## Core Concepts You Must Learn

- state machines
- transition validation
- audit trail

## Accuracy Traps To Avoid

- Allowing illegal status jumps.
- Updating records without timeline events.
- Mixing command writes and query reads in one method.

## Quality Checks

- Only allowed transitions succeed.
- Every transition appends an event.
- Metrics reflect current lifecycle distribution.
- Starter API exports are discoverable.
- Solution behavior can be reproduced from one command.

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/03-advanced/08-job-scheduler/src'); console.log('Starter exports:', Object.keys(m));"
node -e "const m=require('./projects/03-advanced/08-job-scheduler/solution/index.solution'); console.log('Solution exports:', Object.keys(m));"
```

## Acceptance Criteria

- Deterministic outputs for identical inputs
- Explicit validation for malformed input
- At least 5 manual checks documented in guide.md
- One architecture tradeoff explained in notes

## Learning Tips

1. Implement the minimal happy path first.
2. Add validation before adding edge-case behavior.
3. Keep pure logic separate from side effects.
4. Add deterministic checks before refactoring.

## Interview Narrative

Problem: this domain needs consistent behavior under real constraints.

Approach: I modeled inputs explicitly, enforced rule boundaries, and separated core logic from orchestration concerns.

Outcome: the module became testable, deterministic, and easier to extend without regressions.
