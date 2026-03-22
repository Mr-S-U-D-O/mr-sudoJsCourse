# Project 06: Agent Workflow Orchestrator

## Project Aim

Build a workflow runtime that executes dependency graphs safely, retries failures when allowed, and records full execution traces.

## Visualize The Product

Imagine an automation pipeline:

- step A fetches data;
- step B transforms it;
- step C sends a report.

If one step fails, the orchestrator decides whether to retry, fail fast, or continue later.

## Real-World Use Cases

- AI/agent automation pipelines
- ETL and internal operations workflows
- Multi-step backend jobs with dependency chains
- Reliability-focused task orchestration

## What You Should Know First

- async/await and promises
- graph traversal basics
- retry/backoff patterns
- structured logging

## Rules

- Validate workflow schema before execution.
- Reject cyclic dependencies.
- Bound retries per step.
- Emit execution metadata for observability.

## How To Run

Run from repository root.

1. Inspect starter exports

```bash
node -e "const m=require('./projects/06-agent-workflow-orchestrator/src'); console.log(Object.keys(m));"
```

2. Starter behavior check

```bash
node -e "const m=require('./projects/06-agent-workflow-orchestrator/src'); m.runWorkflow({nodes:[]},{}).then(console.log).catch(err=>console.log(err.message));"
```

What this does:

- calls your unfinished starter with empty nodes;
- demonstrates current error/validation path;
- confirms async call flow works.

3. Reference solution run

```bash
node -e "const m=require('./projects/06-agent-workflow-orchestrator/solution/index.solution'); const wf={nodes:[{id:'a',type:'echo',dependsOn:[]},{id:'b',type:'echo',dependsOn:['a']}]}; const handlers={echo: async ({id}) => ({ok:true,id})}; m.runWorkflow(wf,handlers).then(r=>console.log(r.status,r.completedNodeIds));"
```

What this does:

- defines a 2-node DAG where `b` depends on `a`;
- provides an async handler for node type `echo`;
- prints final status and completed node IDs.

## Interview Narrative You Can Use

- Problem: reliable execution of dependent async tasks.
- Design: schema validator + cycle detection + scheduler + retry wrapper.
- Outcome: debuggable orchestration with deterministic behavior.
