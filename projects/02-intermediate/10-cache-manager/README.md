# Cache Manager

**Difficulty:** Intermediate | **Time:** 8-12 hours | **Skills:** Caching Strategy, TTL Expiry, Eviction Policies

## Quick Start

Build an in-memory cache manager supporting set/get/invalidate/clear operations, optional TTL expiry, and basic hit/miss statistics. This project teaches stateful performance primitives with correctness rules.

---

## Prerequisites

Before starting, you should know:

1. Map/object data storage patterns
2. Time-based expiry logic
3. Validation and null-safe return design
4. Deterministic stats accounting
5. Capacity-bound data structures

---

## Visualize The Product

```txt
cache = createCache(maxSize=2, ttlMs=5000)

set(cache, "a", 10)
set(cache, "b", 20)
get(cache, "a") -> 10 (hit)

set(cache, "c", 30)
-> eviction occurs because max size reached

getStats(cache)
-> { size: 2, hits: X, misses: Y, hitRate: ... }
```

---

## Real-World Use Cases

1. API response caching
2. Session and token metadata storage
3. Expensive computation memoization
4. Config lookup acceleration
5. Read-heavy service optimization

---

## Project Aim

Implement a cache module that:

1. Stores/retrieves key-value entries
2. Enforces max-size eviction behavior
3. Expires entries by TTL when configured
4. Supports targeted invalidation and full clear
5. Reports hit/miss metrics deterministically

Architecture flow:

```txt
Set/Get -> TTL check -> eviction/return -> metrics update
```

---

## Core Concepts You Must Learn

1. Cache entry lifecycle (set/get/expire/invalidate)
2. Capacity and eviction policy behavior
3. TTL enforcement at read and/or write paths
4. Observability via hit/miss counters
5. API consistency for missing/expired keys

---

## Accuracy Traps To Avoid

1. Returning stale expired entries
   Fix: TTL-check before returning value.

2. Forgetting to update hit/miss counters
   Fix: instrument all get paths consistently.

3. No defined eviction policy when full
   Fix: choose and document deterministic policy.

4. Invalidate not handling missing keys safely
   Fix: define idempotent invalidate behavior.

5. Hit rate divide-by-zero on empty metrics
   Fix: guard against zero total requests.

---

## Quality Checks

1. `createCache` validates max size and ttl args
2. `set` stores value by key
3. `get` returns value for present key
4. `get` returns null for missing key
5. TTL-expired entry returns null
6. Max-size insertion triggers deterministic eviction
7. `invalidate` removes specific key
8. `clear` removes all entries
9. `getStats` returns stable shape and valid rates
10. Hits/misses update correctly across reads

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/10-cache-manager/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/10-cache-manager/src'); const c=m.createCache(2); m.set(c,'a',1); console.log(m.get(c,'a'));"
node -e "const m=require('./projects/02-intermediate/10-cache-manager/solution/index.solution'); console.log(Object.keys(m));"
```

---

## Learning Tips

1. Build set/get first with no TTL.
2. Add stats counters next.
3. Implement max-size eviction after base behavior is stable.
4. Add TTL checks with fixed-time tests.
5. Finish with invalidate/clear idempotency tests.

---

## Interview Narrative

Problem: Repeated expensive lookups increase latency and infrastructure cost.

Approach: I built a bounded in-memory cache with deterministic eviction, optional TTL expiry, and observability metrics for hit/miss behavior.

Outcome: The module improved read performance while retaining predictable correctness and transparent operational behavior.

---

## Code Comments in Starter

See `src/index.js` for TODO guidance on eviction, TTL checks, and stats updates.

---

## Acceptance Criteria

- Deterministic cache behavior for fixed operation order
- Clear missing/expired key semantics
- At least 10 manual checks passing
- One caching tradeoff documented
