"use strict";

/**
 * SIMPLE TODO TRACKER - Task State Management
 * 
 * CORE CONCEPT: State machines enforce legal transitions.
 * Tasks can only move through predetermined states:
 *   pending → in-progress → done
 *   Any state → canceled (terminal state)
 * 
 * KEY PATTERNS:
 * 1. Immutability: Never modify original. Return new object with { ...original, change }
 * 2. Validation: Check preconditions FIRST (guard clauses)
 * 3. Consistency: Metadata (timestamps) always updated with state change
 * 4. History: Record every transition for audit trail
 * 
 * TESTING STRATEGY:
 * - Test each state transition separately
 * - Test guard clauses (what prevents illegal transitions?)
 * - Test idempotence (is it safe to repeat operations?)
 * - Test immutability (did original change? It shouldn't!)
 */

/**
 * Creates a new todo task.
 * 
 * EXAMPLE:
 *   const todo = createTodo("Buy milk");
 *   // { id: 1, title: "Buy milk", status: "pending", created: Date, ... }
 * 
 *   const todo2 = createTodo("Fix bug", "Critical null pointer");
 *   // { id: 2, title: "Fix bug", description: "...", status: "pending", ... }
 * 
 * REQUIREMENTS:
 * - Must have unique ID (increment counter or use timestamp+random)
 * - Title is REQUIRED (can't be empty or just whitespace)
 * - Description is OPTIONAL (default to empty string)
 * - Status starts as "pending" (not "in-progress" or "done")
 * - Must have created timestamp: new Date()
 * - Must have updated timestamp: new Date()
 * 
 * RETURN OBJECT SHAPE:
 *   {
 *     id: number (unique),
 *     title: string (required, trimmed),
 *     description: string (optional),
 *     status: "pending" | "in-progress" | "done",
 *     created: Date,
 *     updated: Date,
 *     histories: [] (empty array, will track transitions)
 *   }
 * 
 * GUARD CLAUSES:
 * - If title is empty or only whitespace, throw Error("Title required")
 * 
 * HINT: For ID generation, use a static counter:
 * - At module level: let nextId = 1
 * - In function: const id = nextId++
 * 
 * IMMUTABILITY: Return a NEW object, not a mutable reference
 * - Return { id, title: title.trim(), ... } not objects you'll modify later
 */
function createTodo(title, description = "") {
  // TODO: Implement following the spec above
  // Remember: title.trim() to remove leading/trailing spaces
  // Remember: throw new Error("message") for invalid input
}

/**
 * Adds a todo to an array and returns the updated array.
 * 
 * EXAMPLE:
 *   let todos = [];
 *   const newTodo = createTodo("Task 1");
 *   todos = addTodo(todos, newTodo);
 *   // todos is now [{ id: 1, title: "Task 1", ... }]
 * 
 * REQUIREMENTS:
 * - Accepts an array of todos and a new todo object
 * - Returns a NEW array (don't mutate the original)
 * - New todo is added to the end
 * - Validates that newTodo is a valid object
 * 
 * IMMUTABILITY: Don't do todos.push(newTodo)!
 * Instead: return [...todos, newTodo]
 * This creates a new array without modifying the original.
 * 
 * RETURN:
 *   New array with newTodo added to end
 * 
 * GUARD CLAUSES:
 * - If newTodo is missing or invalid, throw Error
 * - If todos is not an array, throw Error
 * 
 * HINT: The spread operator creates a new array:
 *   const arr = [1, 2];
 *   const newArr = [...arr, 3];  // [1, 2, 3], original arr unchanged
 */
function addTodo(todos, newTodo) {
  // TODO: Implement using spread operator
  // Return [...todos, newTodo]
  // NEVER do todos.push(newTodo)
}

/**
 * Updates a todo's status, enforcing legal state transitions.
 * 
 * EXAMPLES:
 *   const updated = updateTodoStatus(todos, 1, "in-progress");
 *   // Task 1 moves from "pending" to "in-progress"
 * 
 *   const updated = updateTodoStatus(todos, 1, "done");
 *   // Task 1 moves from "in-progress" to "done"
 * 
 * LEGAL TRANSITIONS (state machine):
 *   pending → in-progress
 *   pending → done (jump straight to done, skip in-progress)
 *   pending → canceled
 *   in-progress → done
 *   in-progress → pending (go back, it failed)
 *   in-progress → canceled
 *   done → pending (reopen, customer changed mind)
 *   done → canceled (void the completion)
 *   canceled → pending (re-activate)
 * 
 * ILLEGAL TRANSITIONS (your code must prevent):
 *   pending → pending (already pending!)
 *   in-progress → in-progress (already in progress!)
 *   done → done (already done!)
 *   done → in-progress (just go to pending to re-activate)
 * 
 * REQUIREMENTS:
 * - Find todo by ID in todos array
 * - Check if transition is legal
 * - If illegal, throw Error describing why
 * - If legal, return NEW array with updated todo
 * - Update the todo's 'updated' timestamp
 * - Record this transition in histories array
 * 
 * IMMUTABILITY:
 * - Return NEW array, not the original with mutations
 * - Return NEW todo object in the array:
 *   return todos.map(t => 
 *     t.id === todoId 
 *       ? { ...t, status: newStatus, updated: new Date(), histories: [...t.histories, ...] }
 *       : t
 *   )
 * 
 * HISTORY TRACKING:
 * Each todo has histories array. Track transitions:
 * {
 *   from: "pending",
 *   to: "in-progress",
 *   timestamp: Date,
 *   reason: "User started working"
 * }
 * 
 * GUARD CLAUSES:
 * - If todo not found: throw Error("Todo not found")
 * - If newStatus is invalid: throw Error("Invalid status")
 * - If transition is illegal: throw Error("Can't go from pending to in-progress... wait, that's legal. Bad example!")
 *   Actually: throw Error("Can't go from done directly to in-progress. Reactivate via pending.")
 * 
 * HINT: Define legal transitions as a data structure:
 *   const LEGAL = {
 *     "pending": ["in-progress", "done", "canceled"],
 *     "in-progress": ["done", "pending", "canceled"],
 *     ...
 *   }
 *   Then: if (!LEGAL[currentStatus]?.includes(newStatus)) throw Error(...)
 */
function updateTodoStatus(todos, todoId, newStatus) {
  // TODO: Implement state machine validation
  // 1. Find todo by ID
  // 2. Check if transition is legal using LEGAL transition map
  // 3. If illegal, throw Error with explanation
  // 4. If legal, update status and updated timestamp
  // 5. Record transition in histories array
  // 6. Return NEW array (use .map() to create new one)
}

/**
 * Finds and returns a single todo by its ID.
 * 
 * EXAMPLES:
 *   const todo = getTodo(todos, 1);
 *   // { id: 1, title: "Buy milk", status: "pending", ... }
 * 
 *   const notFound = getTodo(todos, 999);
 *   // null or undefined (item not found)
 * 
 * REQUIREMENTS:
 * - Search todos array for item with matching ID
 * - Return the todo object if found
 * - Return null/undefined if not found (handle gracefully, no error thrown)
 * - Return a COPY, not the original (for immutability)
 * 
 * RETURN:
 *   Todo object or null
 * 
 * HINT: Use Array.find():
 *   todos.find(t => t.id === todoId)
 * 
 * IMMUTABILITY:
 *   return { ...foundTodo }  // Return copy, not original
 */
function getTodo(todos, todoId) {
  // TODO: Use .find() to locate todo by ID
  // Return copy with { ...foundTodo }
}

/**
 * Returns all todos.
 * 
 * EXAMPLES:
 *   const all = getAllTodos(todos);
 *   // [{ id: 1, ... }, { id: 2, ... }, ...]
 * 
 * REQUIREMENTS:
 * - Return array of all todos
 * - If empty, return empty array (not null)
 * - Return copies, not originals (for immutability)
 * 
 * RETURN:
 *   Array of todo objects (or empty array)
 * 
 * HINT: Return a copy of the array:
 *   return todos.map(t => ({ ...t }))
 * This creates new array with copy of each todo
 */
function getAllTodos(todos) {
  // TODO: Implement
  // Copy both the array AND each todo object
}

/**
 * Computes aggregate metrics from all todos.
 * 
 * EXAMPLES:
 *   const metrics = getMetrics(todos);
 *   // {
 *   //   total: 10,
 *   //   completed: 3,
 *   //   pending: 5,
 *   //   inProgress: 2,
 *   //   canceled: 0,
 *   //   percentComplete: 30
 *   // }
 * 
 * LOGIC:
 * - Count total todos
 * - Count by status (pending, in-progress, done, canceled)
 * - Calculate percentComplete = (completed / total) * 100
 * - Handle division by zero (if total = 0, percentage = 0)
 * 
 * RETURN SHAPE:
 *   {
 *     total: number,
 *     completed: number (how many have status = "done"),
 *     pending: number,
 *     inProgress: number,
 *     canceled: number,
 *     percentComplete: number (0-100)
 *   }
 * 
 * HINT: Use .filter() to count each status:
 *   const completed = todos.filter(t => t.status === "done").length
 * 
 * PERCENTAGE CALCULATION:
 *   const percent = todos.length > 0 ? (completed / todos.length) * 100 : 0
 */
function getMetrics(todos) {
  // TODO: Count todos by status
  // Tip: todos.filter(t => t.status === "done").length
}

/**
 * Returns the history of status transitions for a specific todo.
 * 
 * EXAMPLES:
 *   const history = getHistory(todos, 1);
 *   // [
 *   //   { from: "pending", to: "in-progress", timestamp: Date },
 *   //   { from: "in-progress", to: "done", timestamp: Date }
 *   // ]
 * 
 * REQUIREMENTS:
 * - Find todo by ID
 * - Return its histories array
 * - Return empty array if not found
 * - Return copy (immutability)
 * 
 * RETURN:
 *   Array of history objects (or empty array)
 * 
 * HISTORY OBJECT SHAPE:
 *   {
 *     from: string (previous status),
 *     to: string (new status),
 *     timestamp: Date,
 *     reason: string (optional, why did this happen?)
 *   }
 * 
 * HINT: Each todo maintains its own histories array
 *   const todo = getTodo(todos, todoId);
 *   return todo?.histories || []
 */
function getHistory(todos, todoId) {
  // TODO: Find todo, return its histories array or empty array
}

/**
 * HELPER FUNCTION (don't modify unless you understand the pattern)
 * Used for project initialization and state management.
 */
function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Simple Todo Tracker",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createTodo,
  addTodo,
  updateTodoStatus,
  getTodo,
  getAllTodos,
  getMetrics,
  getHistory,
  createProject,
};
