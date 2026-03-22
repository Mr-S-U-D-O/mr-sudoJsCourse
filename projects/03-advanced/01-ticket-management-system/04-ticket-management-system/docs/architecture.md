# Ticket System Architecture Notes

## Scope

Ticket lifecycle, assignment, SLA, and reporting in a domain service layer.

## Core Components

- ticket aggregate
- transition guard rules
- SLA calculator
- timeline/event store
- metrics service

## Invariants

- ticket has one valid status
- invalid transition is rejected
- timeline is append-only

## Next Iterations

- queue routing algorithms
- business-hour calendar support
- notifications/webhooks