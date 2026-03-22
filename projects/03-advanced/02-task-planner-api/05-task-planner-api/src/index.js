/**
 * Student starter scaffold.
 * Goal: implement task planner domain + API-ready service methods.
 */

function createTaskPlanner() {
  const state = {
    users: new Map(),
    projects: new Map(),
    tasks: new Map(),
    tokens: new Map(),
  };

  function registerUser(payload) {
    // TODO: validate payload and create user record
    if (!payload || typeof payload !== "object") {
      throw new TypeError("payload must be an object");
    }

    return null;
  }

  function createProject(token, payload) {
    // TODO: validate token + payload and persist project
    if (typeof token !== "string") {
      throw new TypeError("token must be a string");
    }

    return null;
  }

  function createTask(token, projectId, payload) {
    // TODO: enforce ownership and create task record
    if (typeof projectId !== "string") {
      throw new TypeError("projectId must be a string");
    }

    return null;
  }

  return {
    registerUser,
    createProject,
    createTask,
  };
}

module.exports = {
  createTaskPlanner,
};