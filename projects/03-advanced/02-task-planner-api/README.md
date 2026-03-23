# Project 05: Task Planner API

## Project Aim

Build backend core logic for a task-planning product: user auth, project/task CRUD, filtering, and access control.

## Visualize The Product

Imagine a product like a simplified Jira/Trello backend:

- users sign in;
- create projects;
- add tasks;
- filter by status/priority;
- paginate large task lists.

Your code is the API domain brain behind that product.

## Real-World Use Cases

- Team productivity SaaS tools
- Internal planning dashboards
- PM and engineering workflow systems
- Mobile task apps with server backend

## What You Should Know First

- async JavaScript basics
- request/response modeling
- auth fundamentals
- validation patterns

## Rules

- Validate all incoming data.
- Keep auth and domain logic separated.
- Enforce ownership checks on protected resources.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/05-task-planner-api/src'); console.log(Object.keys(m));"
```

2. Quick starter check

```bash
node -e "const m=require('./projects/05-task-planner-api/src'); const api=m.createTaskPlanner(); console.log(typeof api.registerUser);"
```

What this does:

- confirms the factory exists;
- confirms your starter returns callable domain methods.

3. Reference solution flow

```bash
node -e "const m=require('./projects/05-task-planner-api/solution/index.solution'); const api=m.createTaskPlanner(); api.registerUser({email:'a@b.com',name:'A',password:'secret123'}); const token=api.login({email:'a@b.com',password:'secret123'}).token; const p=api.createProject(token,{title:'Portfolio API'}); api.createTask(token,p.id,{title:'Design models'}); console.log(api.listTasks(token,{page:1,pageSize:10}));"
```

What this does:

- registers and logs in a user;
- creates a project;
- creates a task;
- retrieves paginated task results.

## Interview Narrative You Can Use

- Problem: auth-safe task and project operations.
- Design: service-style domain API with token-based ownership checks.
- Outcome: secure, extensible backend core ready to wire into Express/Fastify.

## Core Concepts You Must Learn

- state machines
- validation
- audit trail

## Accuracy Traps To Avoid

- Allowing illegal status jumps.
- Losing history when entities are updated.
- Mixing command logic with query logic.

## Quality Checks

- Only allowed transitions are accepted.
- Each transition writes an event to history.
- Computed metrics reflect current state correctly.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.

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

## Learning Tips

1. Implement the minimal happy path first.
2. Add validation before edge-case behavior.
3. Keep pure logic separate from side effects.
4. Add deterministic checks before refactoring.
