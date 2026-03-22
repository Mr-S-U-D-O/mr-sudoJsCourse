# Project 04: Ticket Management System

## What You Are Building

A ticketing backend module that supports issue intake, assignment workflows, SLA tracking, and reporting.

## Why This Is Real World

Ticket systems are foundational in internal operations, IT support, customer service, and DevOps workflows.

## Skills You Should Know Before Starting

- JavaScript async patterns
- Data modeling for workflow states
- Input validation and authorization basics
- Testing edge cases and workflow transitions

## Project Goals

- Create and update tickets with statuses and priorities
- Assign/reassign tickets to agents
- Enforce state transitions and SLA rules
- Track comment history and escalation events
- Generate operational metrics

## Best Practices

- Model workflow transitions explicitly
- Keep SLA calculations deterministic and testable
- Store timeline events as append-only records
- Use clear error messages for invalid transitions
- Write scenario tests for full lifecycle flows

## Step-by-Step Build Guide

1. Define entities: Ticket, Agent, Comment, SLA, Escalation.
2. Design status flow (open, triaged, in_progress, blocked, resolved, closed).
3. Implement ticket creation with validation.
4. Add assignment and reassignment operations.
5. Enforce valid transition rules.
6. Implement SLA clocks and breach detection.
7. Add comment and activity timeline support.
8. Build escalation automation based on SLA/policy.
9. Add reporting endpoints/services for backlog and throughput.
10. Harden input sanitization and authorization checks.
11. Document architecture in docs/architecture.md.

## Deliverables

- Workflow logic in src/
- Lifecycle tests in tests/
- Architecture notes in docs/
- Full reference in solution/

## Suggested Extensions

- Team queues and routing strategies
- Custom SLA calendars
- Customer notification hooks