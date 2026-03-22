"use strict";

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
