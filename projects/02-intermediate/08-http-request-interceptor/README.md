# Http Request Interceptor

**Difficulty:** Intermediate | **Time:** 8-12 hours | **Skills:** Middleware Chains, Request Transformation, Pipeline Control

## Quick Start

Build an HTTP interceptor pipeline where middleware handlers can inspect and transform requests (and optionally responses) in deterministic order. This project teaches chain execution rules and safe middleware composition.

---

## Prerequisites

Before starting, you should know:

1. Function composition and higher-order functions
2. Array-based pipeline execution
3. Validation and error propagation
4. Deterministic ordering constraints
5. Immutable request/response transformation style

---

## Visualize The Product

```txt
middleware chain:
1) add trace id
2) attach auth header
3) redact sensitive logs

executeChain(interceptor, request)
-> transformed request passed through all handlers in order
```

---

## Real-World Use Cases

1. API client request decorators
2. Security header enforcement layers
3. Observability and tracing injectors
4. Request validation gateways
5. Cross-cutting middleware frameworks

---

## Project Aim

Implement an interceptor engine that:

1. Registers middleware with explicit order control
2. Executes middleware chain deterministically
3. Supports request transformations safely
4. Allows middleware removal by reference
5. Exposes clear failure behavior

Architecture flow:

```txt
Request -> middleware[0..n] -> transformed output
```

---

## Core Concepts You Must Learn

1. Middleware contract design
2. Ordered pipeline execution
3. Error handling across chained handlers
4. Idempotent registration/removal semantics
5. Separation of orchestrator vs transformer responsibilities

---

## Accuracy Traps To Avoid

1. Nondeterministic middleware order
   Fix: preserve insertion or explicit position contract.

2. Mutating shared request object unexpectedly
   Fix: return transformed copies when possible.

3. Swallowing middleware exceptions
   Fix: surface clear chain execution errors.

4. Removing middleware by value instead of exact reference
   Fix: document and enforce reference-based removal.

5. Hidden side effects across middleware
   Fix: keep handlers focused and testable.

---

## Quality Checks

1. Interceptor initializes with stable shape
2. Middleware append/prepend behavior is predictable
3. Chain executes in declared order
4. Transformer output of one step feeds next step
5. Middleware errors are surfaced clearly
6. Removal by reference works correctly
7. Removing missing middleware is safe/explicit
8. Empty chain returns original request unchanged
9. `intercept` applies all transformers deterministically
10. Same input + same middleware list gives same output

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/08-http-request-interceptor/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/08-http-request-interceptor/src'); const i=m.createInterceptor(); console.log(i);"
node -e "const m=require('./projects/02-intermediate/08-http-request-interceptor/solution/index.solution'); console.log(Object.keys(m));"
```

---

## Learning Tips

1. Start with chain data structure and registration.
2. Implement execute flow before convenience helpers.
3. Add removal semantics after happy-path chain works.
4. Test ordering aggressively.
5. Add error tests for failed handlers.

---

## Interview Narrative

Problem: Cross-cutting request concerns (auth, tracing, validation) become messy when duplicated across call sites.

Approach: I built an interceptor chain that composes middleware in deterministic order with explicit registration and robust execution semantics.

Outcome: Request transformations became centralized, testable, and easier to evolve safely.

---

## Code Comments in Starter

See `src/index.js` for TODO guidance on middleware contracts and chain execution.

---

## Acceptance Criteria

- Deterministic middleware execution
- Clear error behavior
- At least 10 manual checks passing
- One design tradeoff documented
