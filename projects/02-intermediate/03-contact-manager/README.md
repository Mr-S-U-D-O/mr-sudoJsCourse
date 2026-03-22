# Contact Manager

**Difficulty:** 🟡 Intermediate | **Time:** 8-10 hours | **Skills:** CRUD, Search, Filtering, Advanced Queries

## Project Aim

Build a contact management system with full CRUD operations, advanced search, filtering, and tag-based organization. Master relational data patterns and query optimization.

## Visualize The Product

Imagine a contact app where you can organize your professional network:

```
contacts = [
  { id: 1, name: "Alice", email: "alice@company.com", tags: ["manager", "tech"] },
  { id: 2, name: "Bob", email: "bob@company.com", tags: ["developer", "mentor"] }
]

manager.searchByName("Alice")
  → [{ id: 1, name: "Alice", ... }]

manager.filterByTag("developer")
  → [{ id: 2, name: "Bob", ... }]
```

## Real-World Use Cases

1. **CRM Systems** - Manage customer relationships with search and filtering
2. **Team Directories** - Company contact lists with department and role filtering
3. **Email Clients** - Manage and search contacts with custom tags
4. **Social Networks** - Build contact graphs with relationship tracking
5. **Address Books** - Category-based organization and quick search

## What You Should Know

- **Data relationships**: How contacts relate to tags, groups, metadata
- **Search algorithms**: Linear search vs indexed search for performance
- **Filtering patterns**: Combining multiple filter conditions
- **Data consistency**: Maintaining integrity when contacts reference tags
- **Query optimization**: Building indexes, caching search results

## Rules & Requirements

Your implementation should:

- ✅ Support 12+ operations (create, read, update, delete, search, filter, etc.)
- ✅ Handle relationships between contacts and tags
- ✅ Provide efficient search (by name, email, phone)
- ✅ Support filtering by multiple tags
- ✅ Maintain data consistency (deleting a tag updates all contacts)
- ✅ Handle edge cases (duplicate emails, special characters)
- ✅ Implement proper error handling

## How To Run

### Test the Starter (your implementation)

```bash
node -e "const m=require('./projects/02-intermediate/03-contact-manager/src'); const cm=m.createContactManager(); console.log(Object.keys(cm));"
```

### Test the Solution

```bash
node -e "const m=require('./projects/02-intermediate/03-contact-manager/solution/index.solution'); const cm=m.createContactManager(); cm.addContact({id:1, name:'Alice', email:'alice@example.com', tags:['tech']}); console.log(cm.searchByName('Alice'));"
```

## Interview Talking Points

- How would you handle searching across millions of contacts?
- Explain your data structure choices and trade-offs
- How do you maintain consistency when relationships change?
- What indexing strategies would improve search performance?
- How would you extend this for real contact apps (groups, organizations)?

---

**Start with:** [guide.md](./guide.md) for step-by-step implementation  
**Reference:** [solution/index.solution.js](./solution/index.solution.js) after attempting  
**Explore:** [docs/architecture.md](./docs/architecture.md) for design decisions

## Core Concepts You Must Learn

- clear interfaces
- error handling
- deterministic behavior

## Accuracy Traps To Avoid

- No explicit input validation.
- Implicit state mutations that are hard to debug.
- No measurable correctness checks.

## Quality Checks

- Core behavior passes normal and edge-case examples.
- Invalid input paths return actionable errors.
- Design choices are explained at Intermediate depth.
- Starter API exports can be inspected and documented.
- Solution output can be reproduced from a single command.

## Acceptance Criteria

- Behavior is deterministic for the same input.
- Invalid inputs return consistent error messages.
- At least 5 representative manual checks are documented in guide.md.
- Architecture notes explain one key tradeoff.
