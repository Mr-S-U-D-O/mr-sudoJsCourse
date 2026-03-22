# Guide: Ticket Management System

## Build Order

1. Define entities: ticket, agent, comment, event, SLA policy.
2. Implement ticket creation and validation.
3. Add transition rules (open -> in_progress -> resolved -> closed, etc).
4. Add assignment/reassignment flows.
5. Add SLA due-at calculation and breach checks.
6. Add timeline query and metrics summary.

## What To Search

- finite state machine javascript workflow
- sla breach calculation support systems
- issue tracker domain model
- append only event log pattern

## How To Think

- Treat status transitions as guarded commands.
- Keep a machine-friendly event timeline.
- Build reporting from timeline data.

## Suggested Learning Resources

- https://martinfowler.com/bliki/DDD_Aggregate.html
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- https://nodejs.org/en/learn