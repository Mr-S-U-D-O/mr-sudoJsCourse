# Rate Limiter

**Difficulty:** Intermediate | **Time:** 8-12 hours | **Skills:** Quota Windows, Request Accounting, Fairness Controls

## Quick Start

Build a per-user rate limiter that tracks request usage across a time window, decides allow/deny, and reports remaining quota. This project is about reliable request accounting and deterministic limit behavior.

---

## Prerequisites

Before starting, you should know:

1. Time arithmetic with timestamps
2. Map/object state storage per key
3. Validation and guard clauses
4. Deterministic accounting logic
5. Query vs mutation method separation

---

## Visualize The Product

```txt
createLimiter(5, 60_000)

userA requests:
1..5 -> allowed
6th -> denied

getRemainingQuota(userA)
-> 0

after window reset:
isAllowed(userA)
-> true
```

---

## Real-World Use Cases

1. API abuse prevention
2. Fair-usage control for SaaS endpoints
3. Authentication attempt throttling
4. Public service DoS mitigation layers
5. Tier-based quota enforcement

---

## Project Aim

Implement a limiter engine that:

1. Tracks request counts by user
2. Enforces max requests per time window
3. Exposes allow/deny decision API
4. Reports remaining quota clearly
5. Supports explicit reset behavior

Architecture flow:

```txt
Request -> window/account lookup -> decision -> optional increment
```

---

## Core Concepts You Must Learn

1. Fixed-window accounting basics
2. Timestamp-based window rollover
3. Decision-before-mutation patterns
4. Stable key-based state maps
5. Clear quota introspection responses

---

## Accuracy Traps To Avoid

1. Not resetting counters when window expires
   Fix: compare now with window start and rollover.

2. Mixing `isAllowed` with implicit increment unexpectedly
   Fix: define explicit contract for each method.

3. Negative remaining quota values
   Fix: clamp remaining quota at zero.

4. Shared state collisions across users
   Fix: isolate accounting by user key.

5. Time-unit mistakes (seconds vs milliseconds)
   Fix: document and enforce ms-based inputs.

---

## Quality Checks

1. Limiter validates constructor args
2. First request for new user is allowed
3. Requests up to max are allowed
4. Request above max is denied
5. Remaining quota decrements correctly
6. Window expiration resets allowance
7. `increment` records request correctly
8. `reset` clears a specific user state
9. Unknown user quota defaults correctly
10. Deterministic results for fixed timestamps

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/09-rate-limiter/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/09-rate-limiter/src'); const l=m.createLimiter(2,1000); console.log(m.isAllowed(l,'u1'));"
node -e "const m=require('./projects/02-intermediate/09-rate-limiter/solution/index.solution'); console.log(Object.keys(m));"
```

---

## Learning Tips

1. Implement state shape first.
2. Add window rollover logic before quota helpers.
3. Keep allow-check and increment logic explicit.
4. Use fixed timestamps in tests.
5. Add reset behavior after base flow is stable.

---

## Interview Narrative

Problem: APIs need fair traffic control to prevent abuse and preserve availability.

Approach: I implemented a fixed-window limiter keyed by user, with explicit accounting, deterministic decision rules, and quota introspection APIs.

Outcome: The limiter became easy to test and reliable for enforcing predictable request budgets.

---

## Code Comments in Starter

See `src/index.js` for TODO guidance on window rollovers and request accounting.

---

## Acceptance Criteria

- Deterministic allow/deny behavior
- Clear quota reporting
- At least 10 manual checks passing
- One design tradeoff documented
