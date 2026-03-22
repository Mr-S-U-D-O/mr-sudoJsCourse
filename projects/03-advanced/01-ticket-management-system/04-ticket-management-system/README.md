# Project 04: Ticket Management System

## Project Aim

Build a helpdesk workflow engine that handles ticket lifecycle, assignment flow, SLA tracking, and reporting.

## Visualize The Product

Picture an internal support dashboard:

- incoming requests land as tickets;
- agents claim and transition them;
- managers track breach risk and backlog health.

Your project is the logic layer behind this operation.

## Real-World Use Cases

- IT support ticketing
- Customer support operations
- Incident management workflows
- Internal service desk tooling

## What You Should Know First

- state transitions and workflow rules
- date/time calculations
- validation and error strategy

## Rules

- Enforce allowed status transitions.
- Log timeline events for significant actions.
- Compute SLA status from deterministic logic.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/04-ticket-management-system/src'); console.log(Object.keys(m));"
```

2. Quick starter run

```bash
node -e "const m=require('./projects/04-ticket-management-system/src'); const s=m.createTicketSystem(); console.log(s.getMetrics());"
```

3. Reference solution run

```bash
node -e "const m=require('./projects/04-ticket-management-system/solution/index.solution'); const s=m.createTicketSystem(); const t=s.createTicket({title:'Login issue',priority:'high'}); s.transitionTicket(t.id,'triaged'); s.transitionTicket(t.id,'in_progress'); console.log(s.getMetrics());"
```

What this does:

- creates a high-priority ticket;
- transitions it through workflow states;
- prints operational metrics to validate behavior.

## Interview Narrative You Can Use

- Problem: consistent workflow enforcement and auditability.
- Design: transition guards + event timeline + SLA metrics.
- Outcome: measurable operational visibility.
