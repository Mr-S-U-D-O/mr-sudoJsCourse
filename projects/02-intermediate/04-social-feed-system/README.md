# Social Feed System

**Difficulty:** Intermediate | **Time:** 8-12 hours | **Skills:** Feed Ranking, Mutations, Authorization, Data Integrity

## Quick Start

Build the core feed engine for posting, liking, commenting, reading feed timelines, and post deletion with authorization checks. The focus is clean domain logic, not frontend rendering.

---

## Prerequisites

Before starting, you should know:

1. Array/object modeling for posts and interactions
2. Validation and error handling patterns
3. Sorting and filtering collections
4. Immutable update strategy
5. Basic authorization checks by user ID

---

## Visualize The Product

```txt
createPost(userId=10, content="First post")
-> { id: 1, userId: 10, content: "First post", likes: [], comments: [] }

likePost(postId=1, userId=22)
-> likes: [22]

commentPost(postId=1, userId=30, comment="Nice one")
-> comments: [{ userId: 30, comment: "Nice one", at: ... }]

getFeed()
-> posts sorted newest-first

deletePost(postId=1, userId=10)
-> true (authorized owner)
```

---

## Real-World Use Cases

1. Social platform timelines
2. Internal company announcement feeds
3. Community/forum activity streams
4. Creator dashboards and engagement systems
5. Lightweight event stream products

---

## Project Aim

Implement a predictable social feed domain layer that:

1. Creates posts with metadata
2. Handles likes and comments safely
3. Returns timeline views in stable order
4. Enforces deletion authorization
5. Preserves data consistency

Architecture flow:

```txt
User Action -> Validation -> Mutation -> Timeline Query
```

---

## Core Concepts You Must Learn

1. Entity modeling for post/like/comment
2. Authorization checks for destructive actions
3. Deterministic feed sorting
4. Idempotency for repeated likes
5. Clear separation between command and query methods

---

## Accuracy Traps To Avoid

1. Allowing duplicate likes from same user
Fix: enforce set-like behavior for likes.

2. Missing ownership check on delete
Fix: only post owner can delete unless policy says otherwise.

3. Mutating arrays in place during reads
Fix: clone/sort copies for query responses.

4. Accepting empty post/comment content
Fix: validate non-empty trimmed text.

5. Nondeterministic feed order for same timestamp
Fix: apply stable tie-break rules.

---

## Quality Checks

1. Post creation rejects empty content
2. Post has deterministic required fields
3. Like is idempotent per user per post
4. Comment append preserves order
5. Feed is sorted newest-first
6. `getFeed(userId)` filters correctly
7. Unauthorized delete fails clearly
8. Authorized delete removes post
9. Invalid post IDs fail clearly
10. Same operations produce same final state

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/04-social-feed-system/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/04-social-feed-system/src'); const p=m.createPost(1,'hello'); console.log(p.userId,p.content);"
node -e "const m=require('./projects/02-intermediate/04-social-feed-system/solution/index.solution'); console.log(Object.keys(m));"
```

---

## Learning Tips

1. Implement create/get feed first.
2. Add likes with idempotency next.
3. Add comments with schema consistency.
4. Finish with delete authorization checks.
5. Validate every mutation path.

---

## Interview Narrative

Problem: Social features break quickly when interaction rules and authorization are loosely enforced.

Approach: I implemented post, like, comment, and feed-query operations with strict validation, deterministic ordering, and explicit ownership checks for deletion.

Outcome: The feed behavior remained predictable and secure enough for app-level integration.

---

## Code Comments in Starter

See `src/index.js` for TODO guidance on data shape validation, idempotent likes, and authorization-safe delete flow.

---

## Acceptance Criteria

- Deterministic outputs for same operations
- Clear authorization and validation errors
- At least 10 manual checks passing
- One architecture tradeoff documented
