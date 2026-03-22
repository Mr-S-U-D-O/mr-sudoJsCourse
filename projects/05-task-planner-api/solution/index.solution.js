/**
 * Reference solution for Project 05.
 * In-memory API core suitable for wiring into Express/Fastify handlers.
 */

const crypto = require("crypto");

function nowIso() {
  return new Date().toISOString();
}

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(4).toString("hex")}`;
}

function assertObject(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }
}

function createTaskPlanner() {
  const users = new Map();
  const usersByEmail = new Map();
  const projects = new Map();
  const tasks = new Map();
  const tokens = new Map();
  const activity = [];

  function hashPassword(rawPassword) {
    return crypto.createHash("sha256").update(rawPassword).digest("hex");
  }

  function requireUserByToken(token) {
    if (typeof token !== "string" || token.trim() === "") {
      throw new Error("token is required");
    }

    const userId = tokens.get(token);
    if (!userId) {
      throw new Error("unauthorized token");
    }

    const user = users.get(userId);
    if (!user) {
      throw new Error("user not found for token");
    }

    return user;
  }

  function registerUser(payload) {
    assertObject(payload, "payload");
    const { email, name, password } = payload;

    if (typeof email !== "string" || !email.includes("@")) {
      throw new Error("valid email is required");
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (usersByEmail.has(normalizedEmail)) {
      throw new Error("email already exists");
    }

    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("name is required");
    }

    if (typeof password !== "string" || password.length < 8) {
      throw new Error("password must be at least 8 characters");
    }

    const userId = id("usr");
    const user = {
      id: userId,
      email: normalizedEmail,
      name: name.trim(),
      passwordHash: hashPassword(password),
      createdAt: nowIso(),
    };

    users.set(userId, user);
    usersByEmail.set(normalizedEmail, userId);

    activity.push({ at: nowIso(), type: "user_registered", userId });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  function login(payload) {
    assertObject(payload, "payload");
    const { email, password } = payload;

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("email and password are required");
    }

    const userId = usersByEmail.get(email.trim().toLowerCase());
    if (!userId) throw new Error("invalid credentials");

    const user = users.get(userId);
    if (!user || user.passwordHash !== hashPassword(password)) {
      throw new Error("invalid credentials");
    }

    const token = id("tok");
    tokens.set(token, user.id);
    activity.push({ at: nowIso(), type: "user_logged_in", userId: user.id });

    return { token };
  }

  function createProject(token, payload) {
    const user = requireUserByToken(token);
    assertObject(payload, "payload");

    const { title, description = "" } = payload;
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("title is required");
    }

    const projectId = id("prj");
    const project = {
      id: projectId,
      ownerId: user.id,
      title: title.trim(),
      description,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    projects.set(projectId, project);
    activity.push({ at: nowIso(), type: "project_created", userId: user.id, projectId });

    return { ...project };
  }

  function updateProject(token, projectId, patch) {
    const user = requireUserByToken(token);
    if (typeof projectId !== "string" || projectId.trim() === "") {
      throw new Error("projectId is required");
    }
    assertObject(patch, "patch");

    const project = projects.get(projectId);
    if (!project) throw new Error("project not found");
    if (project.ownerId !== user.id) throw new Error("forbidden");

    if (patch.title !== undefined) {
      if (typeof patch.title !== "string" || patch.title.trim() === "") {
        throw new Error("title must be a non-empty string");
      }
      project.title = patch.title.trim();
    }

    if (patch.description !== undefined) {
      if (typeof patch.description !== "string") {
        throw new Error("description must be a string");
      }
      project.description = patch.description;
    }

    project.updatedAt = nowIso();
    activity.push({ at: nowIso(), type: "project_updated", userId: user.id, projectId });

    return { ...project };
  }

  function createTask(token, projectId, payload) {
    const user = requireUserByToken(token);
    if (typeof projectId !== "string" || projectId.trim() === "") {
      throw new Error("projectId is required");
    }
    assertObject(payload, "payload");

    const project = projects.get(projectId);
    if (!project) throw new Error("project not found");
    if (project.ownerId !== user.id) throw new Error("forbidden");

    const {
      title,
      description = "",
      dueAt = null,
      priority = "medium",
      status = "todo",
    } = payload;

    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("title is required");
    }

    const validPriority = new Set(["low", "medium", "high", "critical"]);
    const validStatus = new Set(["todo", "in_progress", "blocked", "done"]);

    if (!validPriority.has(priority)) throw new Error("invalid priority");
    if (!validStatus.has(status)) throw new Error("invalid status");
    if (dueAt !== null && Number.isNaN(new Date(dueAt).getTime())) {
      throw new Error("dueAt must be an ISO date or null");
    }

    const taskId = id("tsk");
    const task = {
      id: taskId,
      projectId,
      ownerId: user.id,
      title: title.trim(),
      description,
      dueAt,
      priority,
      status,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    tasks.set(taskId, task);
    activity.push({ at: nowIso(), type: "task_created", userId: user.id, projectId, taskId });

    return { ...task };
  }

  function updateTask(token, taskId, patch) {
    const user = requireUserByToken(token);
    if (typeof taskId !== "string" || taskId.trim() === "") {
      throw new Error("taskId is required");
    }
    assertObject(patch, "patch");

    const task = tasks.get(taskId);
    if (!task) throw new Error("task not found");
    if (task.ownerId !== user.id) throw new Error("forbidden");

    if (patch.title !== undefined) {
      if (typeof patch.title !== "string" || patch.title.trim() === "") {
        throw new Error("title must be a non-empty string");
      }
      task.title = patch.title.trim();
    }

    if (patch.description !== undefined) {
      if (typeof patch.description !== "string") {
        throw new Error("description must be a string");
      }
      task.description = patch.description;
    }

    if (patch.priority !== undefined) {
      const validPriority = new Set(["low", "medium", "high", "critical"]);
      if (!validPriority.has(patch.priority)) {
        throw new Error("invalid priority");
      }
      task.priority = patch.priority;
    }

    if (patch.status !== undefined) {
      const validStatus = new Set(["todo", "in_progress", "blocked", "done"]);
      if (!validStatus.has(patch.status)) {
        throw new Error("invalid status");
      }
      task.status = patch.status;
    }

    if (patch.dueAt !== undefined) {
      if (patch.dueAt !== null && Number.isNaN(new Date(patch.dueAt).getTime())) {
        throw new Error("dueAt must be an ISO date or null");
      }
      task.dueAt = patch.dueAt;
    }

    task.updatedAt = nowIso();
    activity.push({ at: nowIso(), type: "task_updated", userId: user.id, taskId });

    return { ...task };
  }

  function listTasks(token, query = {}) {
    const user = requireUserByToken(token);
    const {
      status,
      priority,
      projectId,
      sortBy = "createdAt",
      sortDirection = "desc",
      page = 1,
      pageSize = 20,
    } = query;

    const validSortBy = new Set(["createdAt", "updatedAt", "dueAt", "priority", "status"]);
    if (!validSortBy.has(sortBy)) {
      throw new Error("invalid sortBy");
    }

    const dir = sortDirection === "asc" ? 1 : -1;

    let rows = Array.from(tasks.values()).filter((task) => task.ownerId === user.id);

    if (status) rows = rows.filter((task) => task.status === status);
    if (priority) rows = rows.filter((task) => task.priority === priority);
    if (projectId) rows = rows.filter((task) => task.projectId === projectId);

    rows.sort((a, b) => {
      const left = a[sortBy] ?? "";
      const right = b[sortBy] ?? "";
      if (left < right) return -1 * dir;
      if (left > right) return 1 * dir;
      return 0;
    });

    const safePage = Math.max(1, Number(page) || 1);
    const safePageSize = Math.min(100, Math.max(1, Number(pageSize) || 20));
    const offset = (safePage - 1) * safePageSize;

    return {
      total: rows.length,
      page: safePage,
      pageSize: safePageSize,
      items: rows.slice(offset, offset + safePageSize).map((task) => ({ ...task })),
    };
  }

  function getActivity(token) {
    const user = requireUserByToken(token);
    return activity.filter((evt) => evt.userId === user.id).map((evt) => ({ ...evt }));
  }

  return {
    registerUser,
    login,
    createProject,
    updateProject,
    createTask,
    updateTask,
    listTasks,
    getActivity,
  };
}

module.exports = {
  createTaskPlanner,
};