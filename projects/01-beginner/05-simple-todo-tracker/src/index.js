"use strict";

/**
 * SIMPLE TODO TRACKER STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * data modeling, input validation, and deterministic functions
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

function createTodo(title, description = "") {
  // TODO: Create a todo object with unique ID, timestamps
}

function addTodo(todos, newTodo) {
  // TODO: Add todo to array, return updated array
}

function updateTodoStatus(todos, todoId, newStatus) {
  // TODO: Update status (pending, in-progress, done) with validation
}

function getTodo(todos, todoId) {
  // TODO: Find and return todo by ID
}

function getAllTodos(todos) {
  // TODO: Return all todos (or empty if none)
}

function getMetrics(todos) {
  // TODO: Return { total, completed, pending, inProgress }
}

function getHistory(todos, todoId) {
  // TODO: Return event log of status changes for a todo
}

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
