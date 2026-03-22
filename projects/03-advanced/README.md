# 🟠 Level 3: Advanced Projects

**Difficulty:** ⭐⭐⭐ (Professional Level)  
**Focus:** Scalability, Architecture Patterns, API Design

Welcome to the Advanced level! These 10 projects tackle real-world architecture challenges, scalable system design, and production-quality patterns.

## 📋 Projects Overview

| #   | Project                                                    | Concepts                             | Est. Time |
| --- | ---------------------------------------------------------- | ------------------------------------ | --------- |
| 1   | [Ticket Management System](./01-ticket-management-system/) | State Machines, Workflows, SLA       | 14-18h    |
| 2   | [Task Planner API](./02-task-planner-api/)                 | Full Backend API, Auth, Ownership    | 14-18h    |
| 3   | [E-commerce Platform](./03-ecommerce-platform/)            | Orders, Inventory Sync, Transactions | 16-20h    |
| 4   | [User Account System](./04-user-account-system/)           | Auth, Profiles, Permissions          | 12-16h    |
| 5   | [Data Migration Engine](./05-data-migration-engine/)       | Batch Processing, Validation         | 12-14h    |
| 6   | [Log Analysis System](./06-log-analysis-system/)           | Parsing, Filtering, Aggregation      | 12-14h    |
| 7   | [Config Management](./07-config-management/)               | Merging, Validation, Overrides       | 10-12h    |
| 8   | [Job Scheduler](./08-job-scheduler/)                       | Cron, Persistence, Reliability       | 12-14h    |
| 9   | [GraphQL API Builder](./09-graphql-api-builder/)           | Schema, Execution, Composition       | 14-16h    |
| 10  | [Message Queue System](./10-message-queue-system/)         | Pub/Sub, Persistence, Reliability    | 14-16h    |

**Total Estimated Time:** 130-160 hours

---

## 🎯 Learning Path

### Prerequisites

- Complete Level 1 & 2 (all 20 projects)
- Understand API design principles
- Familiar with distributed system concepts
- Comfortable with async/await

### Recommended Order

1. Start with **Ticket Management** for state machines
2. Move to **Task Planner API** for full backend design
3. Progress to **User Account System** for auth patterns
4. Tackle **E-commerce** for complex transactions
5. Learn **Job Scheduler** for reliability patterns
6. Master **Config Management** and **Data Migration** for system integration
7. Explore **Log Analysis** for operational concerns
8. Build **Message Queue** and **GraphQL API** for advanced patterns

### Key Skills You'll Gain

- ✅ API design and REST conventions
- ✅ Authentication and authorization
- ✅ State machines and workflows
- ✅ Transaction and consistency patterns
- ✅ Error handling at scale
- ✅ Data validation and transformation
- ✅ System integration patterns
- ✅ Caching and performance optimization
- ✅ Operational patterns (logging, monitoring)
- ✅ Testing complex systems

---

## 💡 Tips for Success

1. **Design First** - Sketch your architecture before writing code
2. **Plan for Failures** - Think about error cases and edge conditions
3. **Use Transactions** - Understand consistency requirements deeply
4. **Build APIs Thoughtfully** - Design clear contracts between modules
5. **Test End-to-End** - Don't just unit test; test full workflows

---

## 📊 Progression Guide

```
Ticket Management (State Machines)
       ↓
Task Planner API (Backend Architecture)
       ↓
User Account System (Authentication)
       ↓
E-commerce Platform (Complex Transactions)
       ↓
Job Scheduler, Message Queue (Reliability Patterns)
       ↓
GraphQL API, Config Management (Advanced Patterns)
       ↓
Data Migration, Log Analysis (System Integration)
```

---

## 🚀 How To Run Projects

```bash
# Test any advanced project starter
node -e "const m = require('./projects/03-advanced/PROJECT-NAME/src'); console.log(Object.keys(m));"

# Test any advanced project solution
node -e "const m = require('./projects/03-advanced/PROJECT-NAME/solution/index.solution'); console.log(m);"
```

Replace `PROJECT-NAME` with the actual folder name.

---

## Interview Talking Points

These projects are interview-ready. Be prepared to discuss:

- Your architectural decisions and tradeoffs
- How you handle edge cases and failures
- Your testing strategies for complex systems
- Performance optimizations you made
- How you would scale the system further

---

## ✅ Completion Checklist

- [ ] Completed Levels 1 & 2 (all 20 projects)
- [ ] Implemented all 10 advanced projects
- [ ] Can articulate architectural decisions
- [ ] Understood trade-offs in each system
- [ ] Know how to extend each system
- [ ] Comfortable discussing patterns in interviews
- [ ] Ready to move to Level 4

---

**Next Step:** Pick an advanced project and start building! Begin with [Ticket Management System](./01-ticket-management-system/README.md) or [Task Planner API](./02-task-planner-api/README.md).
