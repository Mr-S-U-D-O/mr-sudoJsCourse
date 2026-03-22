"use strict";

const metadata = {
  project: "Simple Todo Tracker",
  level: "Beginner",
  status: "reference",
};

let nextId = 1;

function createTodo(title, description = "") {
  return {
    id: nextId++,
    title,
    description,
    status: "pending",
    createdAt: new Date().toISOString(),
    history: []
  };
}

function addTodo(todos, newTodo) {
  const updated = [...todos, newTodo];
  newTodo.history.push({ timestamp: new Date().toISOString(), status: "pending", action: "created" });
  return updated;
}

function updateTodoStatus(todos, todoId, newStatus) {
  const validStatuses = ["pending", "in-progress", "done"];
  if (!validStatuses.includes(newStatus)) {
    throw new Error(`Invalid status: ${newStatus}`);
  }
  
  const todo = todos.find(t => t.id === todoId);
  if (!todo) {
    throw new Error(`Todo ${todoId} not found`);
  }

  const statusOrder = { pending: 0, "in-progress": 1, done: 2 };
  if (statusOrder[newStatus] <= statusOrder[todo.status]) {
    throw new Error(`Cannot move from ${todo.status} back to ${newStatus}`);
  }

  todo.status = newStatus;
  todo.history.push({ timestamp: new Date().toISOString(), status: newStatus, action: "updated" });
  return todos;
}

function getTodo(todos, todoId) {
  return todos.find(t => t.id === todoId) || null;
}

function getAllTodos(todos) {
  return todos;
}

function getMetrics(todos) {
  return {
    total: todos.length,
    completed: todos.filter(t => t.status === "done").length,
    pending: todos.filter(t => t.status === "pending").length,
    inProgress: todos.filter(t => t.status === "in-progress").length
  };
}

function getHistory(todos, todoId) {
  const todo = getTodo(todos, todoId);
  return todo ? todo.history : [];
}

function createProject(initialState = {}) {
  const state = {
    createdAt: new Date().toISOString(),
    ...initialState,
  };

  return {
    title: metadata.project,
    getState() {
      return { ...state };
    },
    describe() {
      return metadata.project + " (" + metadata.level + ")";
    },
  };
}

module.exports = {
  metadata,
  createTodo,
  addTodo,
  updateTodoStatus,
  getTodo,
  getAllTodos,
  getMetrics,
  getHistory,
  createProject,
};
