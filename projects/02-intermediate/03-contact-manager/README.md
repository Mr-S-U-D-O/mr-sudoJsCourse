# Contact Manager

**Difficulty:** Intermediate | **Time:** 8-12 hours | **Skills:** CRUD, Search, Validation, Data Modeling

## Quick Start

Build a contact manager engine that supports creating, updating, deleting, searching, and listing contacts with reliable validation. This project is about clean data modeling and deterministic query behavior, not UI.

---

## Prerequisites

Before starting, you should be comfortable with:

1. Objects and arrays for entity storage
2. Input validation and guard clauses
3. Filtering and search patterns with `map`/`filter`/`find`
4. Immutable update style
5. Error-first API behavior

---

## Visualize The Product

```txt
addContact({ name: "Alice", email: "alice@company.com", phone: "+1-555-1000" })
-> { id: 1, name: "Alice", ... }

addContact({ name: "Bob", email: "bob@company.com", phone: "+1-555-1001" })
-> { id: 2, name: "Bob", ... }

searchContacts("alice")
-> [{ id: 1, name: "Alice", ... }]

updateContact(1, { notes: "Team lead" })
-> updated contact

deleteContact(2)
-> true
```

---

## Real-World Use Cases

1. CRM dashboards
2. Internal employee directories
3. Sales outreach tooling
4. Helpdesk contact lookups
5. Address-book style mobile/web apps

---

## Project Aim

Implement a deterministic contact data layer that:

1. Creates valid contact records
2. Rejects duplicates and invalid input
3. Updates and deletes by ID safely
4. Supports predictable text search
5. Returns stable output shapes

Architecture flow:

```txt
Command -> Validation -> State Update -> Query
```

---

## Core Concepts You Must Learn

1. Entity design and required fields
2. Referential consistency by ID
3. Case-insensitive search behavior
4. Immutable updates to avoid accidental side effects
5. Explicit error messages for invalid operations

---

## Accuracy Traps To Avoid

1. Allowing duplicate email entries
Fix: enforce unique email check before insert.

2. Mutating contact objects in place
Fix: return new arrays/objects when updating.

3. Unclear search semantics
Fix: define exact behavior (case-insensitive contains match).

4. Silent failures on missing IDs
Fix: throw actionable errors for not-found IDs.

5. Inconsistent return types
Fix: keep each method output shape deterministic.

---

## Quality Checks

1. Creating contact validates required fields
2. Duplicate email is rejected clearly
3. Updating missing contact ID fails explicitly
4. Delete removes only targeted contact
5. Search is case-insensitive
6. Search by name/email/phone works
7. `getAllContacts` returns stable list shape
8. Invalid input types throw clear errors
9. Same input sequence yields same state
10. APIs do not mutate caller-provided input objects

---

## How To Run

Run from repository root.

```bash
node -e "const m=require('./projects/02-intermediate/03-contact-manager/src'); console.log(Object.keys(m));"
node -e "const m=require('./projects/02-intermediate/03-contact-manager/src'); const c=m.createContact('Alice','alice@company.com','+1'); console.log(c.name);"
node -e "const m=require('./projects/02-intermediate/03-contact-manager/solution/index.solution'); console.log(Object.keys(m));"
```

---

## Learning Tips

1. Implement create and list operations first.
2. Add update/delete by ID next.
3. Add search only after entity validation is solid.
4. Write failure-path tests before success-path tests.
5. Keep operations pure where possible.

---

## Interview Narrative

Problem: Contact data quickly becomes unreliable without strong validation and deterministic query behavior.

Approach: I modeled contacts as explicit entities, enforced required fields and uniqueness constraints, and built CRUD/search methods with predictable return shapes and clear error paths.

Outcome: The module remained easy to test, dependable for downstream UI, and simple to extend.

---

## Code Comments in Starter

See `src/index.js` for function-level TODO guidance on validation, immutable updates, and search behavior.

---

## Acceptance Criteria

- Deterministic behavior for same operation sequence
- Clear validation errors
- At least 10 manual checks passing
- Design notes explain one tradeoff
