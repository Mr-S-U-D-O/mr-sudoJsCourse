# Project 05: Task Planner API

## What You Are Building

A production-style REST API for personal/team task planning, with authentication, persistence, and auditability.

## Why This Is Real World

Building APIs is one of the highest-signal backend skills for recruiters and real product work.

## Skills You Should Know Before Starting

- Node.js and Express fundamentals
- HTTP methods and status codes
- JSON schema validation
- Basic authentication and authorization
- Integration testing

## Project Goals

- Implement CRUD for projects and tasks
- Add user accounts and auth tokens
- Support filtering, sorting, and pagination
- Add due-date reminders and status tracking
- Produce OpenAPI documentation

## Best Practices

- Keep route handlers thin; use service layer for business logic
- Validate all request payloads
- Centralize error handling
- Separate data models from transport concerns
- Add integration tests for API workflows

## Step-by-Step Build Guide

1. Define API contract and data models.
2. Set up Express app structure.
3. Implement auth flows (register/login/token verification).
4. Implement project and task CRUD endpoints.
5. Add filters, pagination, and sorting.
6. Add validation middleware for request bodies and query params.
7. Implement permission checks (owner/team roles).
8. Add activity logging and audit fields.
9. Add OpenAPI docs and example payloads.
10. Add integration tests with a test database.
11. Prepare deployment-ready config and environment docs.

## Deliverables

- API code in src/
- Endpoint tests in tests/
- Architecture and API docs in docs/
- Full reference implementation in solution/

## Suggested Extensions

- Webhooks
- Rate limiting and API keys
- Background jobs for reminders