# Simple Todo Tracker: Master State Management & Transitions

**Difficulty:** 🟢 Beginner | **Time:** 6-8 hours | **Skills:** State Machines, Validation, Immutability, Testing

---

## Quick Start

Build a todo tracker that manages task lifecycle: create → update → complete → archive. Master state machines by enforcing that only legal transitions are allowed. You'll prevent bugs like marking a task "done" twice, or completing a deleted task.

---

## Prerequisites

Before starting, ensure you can:

1. **Arrays & Objects** — Create arrays of objects, loop with `.forEach()` or `for` loops
2. **Object Methods** — Use `Object.keys()`, `Object.values()`, spread operator `{...obj}`
3. **Filter & Map** — Use `.filter()` to find items, `.map()` to transform
4. **Conditional Logic** — Use `if/else`, understand guard clauses (`if (!x) return`)
5. **Function Parameters** — Pass objects as parameters, destructure with `{id, name}`
6. **Error Handling Basics** — Understand `throw new Error()` and try-catch concepts
7. **Immutability Pattern** — Know that `{...original}` creates a shallow copy without mutations

If any feel unclear, review 04-Control-Flow and 07-Arrays-Basics first.

---

## Visualize The Product

You're building a **task state machine**. Here's what you'll implement:

```
TASK STATE DIAGRAM:

        ┌─────────────┐
        │   CREATED   │
        │  (new task) │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │   ACTIVE    │
        │  status='o' │  ◄── toggle(), updateTitle(), updateDesc()
        │  (working)  │
        └──────┬──────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
  ┌────────┐      ┌─────────┐
  │COMPLETE│      │ DELETED │
  │done=true       │forever! │
  └────────┘      └─────────┘
  complete()        delete()

LEGAL TRANSITIONS:
✓ ACTIVE → COMPLETE (mark done)      complete(id)
✓ ACTIVE → DELETED (remove)          delete(id)
✓ COMPLETE → ACTIVE (undo)           toggle(id)
✓ DELETED → DELETED (idempotent)     delete(id) on deleted = no error

ILLEGAL TRANSITIONS (YOUR CODE PREVENTS):
✗ COMPLETE → COMPLETE (already done!)
✗ DELETED → ACTIVE (can't un-delete)
✗ DELETED → COMPLETE (deleted task shouldn't move)
✗ Create task with empty title
✗ Update non-existent task


EXAMPLE USAGE:

const tracker = createTracker();
const id1 = tracker.createTask("Buy milk");
// { id: 1, title: "Buy milk", done: false, created: Date, updated: Date }

id1.updateTitle("Buy milk & eggs");
// { id: 1, title: "Buy milk & eggs", done: false, created: Date, updated: Date }

tracker.complete(id1);
// { id: 1, title: "Buy milk & eggs", done: true, completedAt: Date }

tracker.toggle(id1);
// { id: 1, title: "Buy milk & eggs", done: false, completedAt: null }

tracker.delete(id1);
// Marks task as deleted, no longer appears in getTasks()

tracker.getTasks();
// Returns only non-deleted active tasks
```

---

## Real-World Use Cases

1. **Issue Tracking Systems (GitHub, Jira)**
   - Create bug reports → mark in-progress → resolve → archive old tickets
   - State machine prevents closing a ticket that's already closed
   - History shows every transition (audit trail)

2. **Project Planning (Asana, Monday.com)**
   - Tasks move through states: Backlog → In Progress → Review → Done
   - Can't mark complete without completing review
   - Analytics: "50 of 200 tasks done, 30 in review, 20 blocked"

3. **Service Desk Workflows (Zendesk, ServiceNow)**
   - Ticket states: New → Assigned → Resolved → Closed
   - Can't resolve before assigned
   - Can reopen closed tickets (undo transition)
   - Audit trail for compliance: "who made this change when?"

4. **Todo Lists & Productivity Apps (Todoist, Things)**
   - Simple tasks with states: Active → Done → Archived
   - Can toggle back: "mark undone" recovers a task
   - Deleted tasks are really just marked (soft delete)

5. **Build Systems & CI/CD Pipelines**
   - Job states: Queued → Running → Success/Failed
   - Can't transition a successful job to running again
   - History matters: "what failed? when? in which step?"

---

## Project Aim

**The Problem:** Simple todo apps seem easy until you track state. What happens when you mark a task done twice? Can you undelete? Should you? Without explicit state transition rules, you get bugs: lost tasks, impossible states, inconsistent data.

**The Solution:** Build a **state machine** — an object that only allows legal state transitions. Tasks have explicit states (active/complete/deleted). Only defined transitions are permitted. Every change is recorded.

**Key Insight:** **Invariants** — rules that must always be true. Example: "Deleted tasks never re-appear." Your code enforces these by preventing illegal transitions.

---

## Core Concepts You Must Learn

These concepts will appear in almost every function:

1. **State Machines** — An object with defined states and legal transitions between them. Not any transition is allowed.

2. **Immutability** — Never modify the original task object. Always return a new object: `{...task, done: true}`

3. **Guard Clauses** — Check preconditions FIRST. If invalid, throw error immediately:
   ```javascript
   if (task.done) throw new Error("Already complete!");
   // Rest of function only runs if task isn't done
   ```

4. **Validations** — Check inputs before operations. Can't create task with empty title. Can't update non-existent task.

5. **Audit Trail** — Record every change with metadata: `{before, after, timestamp, operation}`

6. **Idempotence** — Some operations should be safe to repeat. Deleting a deleted task should not error.

7. **Return Types Consistency** — Functions return tasks, arrays of tasks, or boolean success indicators. Know which!

---

## Accuracy Traps To Avoid

Read these BEFORE coding. They'll save you 2-3 hours of debugging.

### Trap 1: State Mutations — "Did I actually change the state?"

**The Problem:**
```javascript
// ❌ WRONG - modifies original task object
function complete(id) {
  const task = tasks[id];
  task.done = true;  // ← Mutates original!
  return task;
}
```

**Why It Fails:** If another part of your code expects the task to be unchanged, you've broken it. Mutation makes debugging nearly impossible because you can't tell WHERE the change happened.

**The Fix:**
```javascript
function complete(id) {
  const task = tasks[id];
  if (task.done) throw new Error("Already complete");
  
  // CREATE NEW OBJECT instead of mutating
  const updated = { ...task, done: true, completedAt: new Date() };
  tasks[id] = updated;  // Store NEW object
  return updated;
}
```

**How to Avoid:** Use spread operator `{...obj, prop: newValue}` ALWAYS. Never do `obj.prop = x`.

---

### Trap 2: Illegal State Transitions — "Wait, why is task deleted but showing as active?"

**The Problem:**
```javascript
// ❌ WRONG - allows any transition
function setStateToActive(id) {
  tasks[id].done = false;
  return tasks[id];
}

// User can do this:
complete(id);          // Mark done
setStateToActive(id);  // Un-mark
delete(id);            // Delete
setStateToActive(id);  // ERROR: Task is gone but code tries to activate it!
```

**Why It Fails:** No validation that transitions are legal. Task can end up in impossible state.

**The Fix:**
```javascript
function toggle(id) {
  const task = tasks[id];
  // Guard: task must exist and not be deleted
  if (!task || task.deleted) {
    throw new Error("Can't toggle deleted task");
  }
  // Only active or complete tasks can toggle
  const updated = { ...task, done: !task.done };
  tasks[id] = updated;
  return updated;
}

function delete(id) {
  const task = tasks[id];
  if (!task) throw new Error("Task not found");
  if (task.deleted) return task;  // Idempotent: deleting deleted = no error
  
  const updated = { ...task, deleted: true, deletedAt: new Date() };
  tasks[id] = updated;
  return updated;
}
```

**How to Avoid:** Write use-case tests: "Can I toggle a deleted task?" The answer is NO, so guard clause prevents it.

---

### Trap 3: Lost History — "When was this task marked done? Who did it?"

**The Problem:**
```javascript
// ❌ WRONG - doesn't record metadata
function complete(id) {
  tasks[id].done = true;  // No record of WHEN or confirmation it worked
  return tasks[id];
}
```

**Why It Fails:** Later you can't answer "When was task 42 completed?" or "How many tasks were completed today?" No audit trail.

**The Fix:**
```javascript
function complete(id) {
  const task = tasks[id];
  if (!task || task.done || task.deleted) {
    throw new Error("Can't complete: not an active task");
  }
  
  const updated = {
    ...task,
    done: true,
    completedAt: new Date(),
  };
  tasks[id] = updated;
  
  // Record the event for audit trail
  history.push({
    taskId: id,
    operation: 'complete',
    before: task,
    after: updated,
    timestamp: new Date(),
  });
  
  return updated;
}
```

**How to Avoid:** Every state change stores metadata. Ask yourself: "Would I need to know WHEN and BY WHOM this changed?"

---

### Trap 4: Forgetting Soft Deletes — "Why does getTasks() return 4 tasks when I deleted 1?"

**The Problem:**
```javascript
// ❌ WRONG - actually removes from array
function delete(id) {
  tasks.splice(id, 1);  // Gone forever! Can't audit trail!
}
```

**Why It Fails:** You lose all record of the task. Audit trail is broken. You can't show "deleted" as a state.

**The Fix:**
```javascript
function delete(id) {
  const task = tasks[id];
  if (!task) throw new Error("Task not found");
  if (task.deleted) return task;  // Idempotent
  
  // Mark as deleted, don't remove from storage
  const updated = { ...task, deleted: true, deletedAt: new Date() };
  tasks[id] = updated;
  return updated;
}

function getTasks() {
  // Only return non-deleted, non-archived tasks
  return Object.values(tasks).filter(t => !t.deleted && !t.archived);
}

function getAllTasksIncludingDeleted() {
  // For admin/audit view
  return Object.values(tasks);
}
```

**How to Avoid:** Use soft deletes (mark as deleted) not hard deletes (remove). Enables audit trail.

---

### Trap 5: Race Conditions & ID Conflicts — "Two tasks have the same ID!"

**The Problem:**
```javascript
// ❌ WRONG - ID counter not managed safely
let nextId = 1;
function createTask(title) {
  const id = nextId;  // Not atomic!
  nextId++;
  // If two calls happen at "same time", both get ID 1!
  tasks[id] = { id, title, done: false };
  return tasks[id];
}
```

**Why It Fails:** In real systems (servers, async code), two requests might slip through before `nextId` increments.

**The Fix:**
```javascript
class TaskTracker {
  constructor() {
    this.tasks = {};
    this.nextId = 1;
  }
  
  createTask(title) {
    if (!title || title.trim() === '') {
      throw new Error("Title required");
    }
    
    // Get ID FIRST, increment IMMEDIATELY (atomic within function)
    const id = this.nextId++;
    const task = {
      id,
      title: title.trim(),
      done: false,
      created: new Date(),
      updated: new Date(),
    };
    this.tasks[id] = task;
    return { ...task };  // Return copy, not original
  }
}
```

**How to Avoid:** ID generation happens once at function start. All IDs must be globally unique (check existing before assigning).

---

## Quality Checks — Test These Commands

Run these exact tests. Your implementation should pass all:

```bash
# Test 1: Create task
node -e "const {createTracker}=require('./src'); const t=createTracker(); const task=t.createTask('Buy milk'); console.log(task.id && task.title==='Buy milk' ? '✓ Test 1' : '✗ Test 1');"

# Test 2: Can't create with empty title
node -e "const {createTracker}=require('./src'); const t=createTracker(); try{t.createTask('')}catch(e){console.log(e.message.includes('required') ? '✓ Test 2' : '✗ Test 2')}"

# Test 3: Get all tasks
node -e "const {createTracker}=require('./src'); const t=createTracker(); t.createTask('A'); t.createTask('B'); const tasks=t.getTasks(); console.log(tasks.length===2 ? '✓ Test 3' : '✗ Test 3');"

# Test 4: Complete task
node -e "const {createTracker}=require('./src'); const t=createTracker(); const id=t.createTask('Fix bug').id; const completed=t.complete(id); console.log(completed.done===true ? '✓ Test 4' : '✗ Test 4');"

# Test 5: Can't complete already-done task
node -e "const {createTracker}=require('./src'); const t=createTracker(); const id=t.createTask('Task').id; t.complete(id); try{t.complete(id)}catch(e){console.log('✓ Test 5')}"

# Test 6: Toggle (undo completion)
node -e "const {createTracker}=require('./src'); const t=createTracker(); const id=t.createTask('Task').id; t.complete(id); const toggled=t.toggle(id); console.log(toggled.done===false ? '✓ Test 6' : '✗ Test 6');"

# Test 7: Delete task
node -e "const {createTracker}=require('./src'); const t=createTracker(); const id=t.createTask('Task').id; t.delete(id); const tasks=t.getTasks(); console.log(tasks.length===0 ? '✓ Test 7' : '✗ Test 7');"

# Test 8: Deleting deleted task is safe (idempotent)
node -e "const {createTracker}=require('./src'); const t=createTracker(); const id=t.createTask('Task').id; t.delete(id); t.delete(id); console.log('✓ Test 8');"

# Test 9: Update task title
node -e "const {createTracker}=require('./src'); const t=createTracker(); const id=t.createTask('A').id; const updated=t.updateTask(id,{title:'B'}); console.log(updated.title==='B' ? '✓ Test 9' : '✗ Test 9');"

# Test 10: Completed task reflects completed state
node -e "const {createTracker}=require('./src'); const t=createTracker(); const id=t.createTask('Task').id; t.complete(id); const tasks=t.getTasks(); console.log(tasks.length===0 ? '✓ Test 10' : '✗ Test 10');"
```

**Success Criteria:**
- ✅ All 10 tests pass
- ✅ getTasks() only shows active (not done, not deleted) tasks
- ✅ Can't complete a completed task (guard clause)
- ✅ Can't update/delete non-existent task
- ✅ Soft deletes work (deleted task marked but stored)

---

## How To Run

### Step 1: Test Your Implementation

```bash
cd projects/01-beginner/05-simple-todo-tracker

# See what functions exist
node -e "const m=require('./src'); console.log(Object.keys(m));"

# Test a simple flow
node -e "
const {createTracker} = require('./src');
const tracker = createTracker();
const task = tracker.createTask('Buy milk');
console.log('Created:', task);
const completed = tracker.complete(task.id);
console.log('Completed:', completed);
"
```

### Step 2: Compare With Solution

```bash
node -e "
const {createTracker} = require('./solution/index.solution');
const tracker = createTracker();
const task = tracker.createTask('Buy milk');
console.log('Solution created:', task);
"
```

---

## Learning Tips — Strategies For Success

### Tip 1: Understand State BEFORE Writing Code

Draw the state diagram on paper first:

```
STATES:         ACTIVE → COMPLETE ↔ ACTIVE → DELETED
                   ↑         ↓
Can transition:  create()  complete()
                toggle()   toggle()
                delete()   (delete possible?)
```

Ask: "What about transition from COMPLETE to DELETED?" If yes, allow it. If no, guard against it.

### Tip 2: Test Guard Clauses Independently

Before you write `complete()`, test the guard:

```javascript
function complete(id) {
  const task = this.tasks[id];
  
  // Guard 1: Task exists
  if (!task) throw new Error("Task not found");
  
  // Guard 2: Not already done
  if (task.done) throw new Error("Already complete");
  
  // Guard 3: Not deleted
  if (task.deleted) throw new Error("Can't complete deleted task");
  
  // NOW do the operation
  return { ...task, done: true, completedAt: new Date() };
}
```

Test EACH guard separately:
```bash
node -e "
const {createTracker} = require('./src');
const t = createTracker();
const id = t.createTask('Task').id;
t.complete(id);
try { t.complete(id); } catch(e) {
  console.log('Guard caught double-complete:', e.message);
}
"
```

### Tip 3: Use Console.log for State Debugging

```javascript
function complete(id) {
  console.log('Before:', JSON.stringify(this.tasks[id], null, 2));
  const task = this.tasks[id];
  
  // Guards...
  if (task.done) throw new Error("Already complete");
  
  const updated = { ...task, done: true, completedAt: new Date() };
  this.tasks[id] = updated;
  
  console.log('After:', JSON.stringify(this.tasks[id], null, 2));
  return updated;
}
```

When you see "Before" and "After", you know exactly what changed.

### Tip 4: Test Immutability Explicitly

```javascript
// After you implement createTask:
const tracker = createTracker();
const task1 = tracker.createTask('A');
const task2 = tracker.createTask('B');
task1.title = 'HACKED';  // Try to mutate

const refetched = tracker.getTasks()[0];
console.log(refetched.title);  // Should be 'A', NOT 'HACKED'
// If it shows 'HACKED', you're returning original not copy!
```

### Tip 5: Build Functions in This Order

1. **`createTracker()`** — Returns object with methods (easiest to test)
2. **`createTask(title)`** — Create task with ID, validate title
3. **`getTasks()`** — Return all non-deleted tasks
4. **`complete(id)`** — Mark done with guard clause
5. **`toggle(id)`** — Undo completion
6. **`delete(id)`** — Soft delete
7. **`updateTask(id, changes)`** — Update title/description safely
8. **History/Audit** — Record all changes if time permits

Each level depends on previous. Test as you go!

---

## Interview Narrative

**The Question:** "Tell me about a time you built state management code. How did you prevent bugs?"

**Your Answer (Problem):**
> "I built a todo tracker with a state machine. The challenge wasn't storing tasks—it was ensuring legal transitions. For example, you shouldn't be able to mark a task complete twice, or reactivate a deleted task."

**Technical Approach (Solution):**
> "I enforced transitions with guard clauses at the start of each function. Before allowing `complete(id)`, I checked three things: (1) task exists, (2) task isn't already done, (3) task isn't deleted. If any guard fails, I throw immediately. No partial state changes."
>
> "I also used immutability—never modifying the original task object. Instead, I'd return a new object using the spread operator: `{...task, done: true}`. This means if the caller expects the original unchanged, I haven't broken their code."
>
> "For deleted tasks, I used soft deletes—marking as deleted rather than removing from storage. This preserves audit trail. `getTasks()` filters out deleted items, but they're still in storage for history."

**Outcome (Result):**
> "The result was a state machine that prevents impossible states. No task can end up 'deleted and complete'—only legal transitions are allowed. Every change is recorded with metadata (when, what changed). The code is fully testable: given input state, output state is always predictable."

**Follow-Up Questions:**
- "What if async operations fail mid-transition?" → Transactions, rollbacks
- "How do you test all state transitions?" → Enumerate all pairs, test each
- "Can you un-delete a task?" → Depends on business rule; soft delete makes it possible

---

## Code Comments in Starter

See [src/index.js](./src/index.js) — each function has detailed TODOs explaining the state machine logic and guard clauses needed.

---

## Next Steps After Completion

1. **Review Solution** — Compare your approach to [solution/index.solution.js](./solution/index.solution.js)
2. **Add Audit Trail** — Extend with history logging (optional)
3. **Add Priority** — Tasks can be high/medium/low priority
4. **Add Categories** — Group tasks by "work", "personal", "shopping"
5. **Add Persistence** — Save tasks to file or localStorage (prepares for databases)
