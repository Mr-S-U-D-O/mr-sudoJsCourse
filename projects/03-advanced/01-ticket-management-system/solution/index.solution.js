/**
 * Reference solution for Project 04.
 */

const STATUS_TRANSITIONS = {
  open: ["triaged", "closed"],
  triaged: ["in_progress", "blocked", "closed"],
  in_progress: ["blocked", "resolved", "closed"],
  blocked: ["in_progress", "closed"],
  resolved: ["closed", "in_progress"],
  closed: [],
};

function nowIso() {
  return new Date().toISOString();
}

function assertObject(value, name) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${name} must be an object`);
  }
}

function createTicketSystem(config = {}) {
  const slaByPriority = {
    low: 72,
    medium: 24,
    high: 8,
    critical: 4,
    ...(config.slaByPriority || {}),
  };

  const tickets = new Map();
  const events = [];
  let idCounter = 1;

  function recordEvent(ticketId, type, payload) {
    events.push({
      ticketId,
      type,
      payload: payload ? { ...payload } : null,
      at: nowIso(),
    });
  }

  function computeDueAt(priority, createdAt) {
    const hours = slaByPriority[priority] ?? slaByPriority.medium;
    const dueMs = new Date(createdAt).getTime() + hours * 60 * 60 * 1000;
    return new Date(dueMs).toISOString();
  }

  function createTicket(input) {
    assertObject(input, "input");
    const {
      title,
      description = "",
      priority = "medium",
      reporterId = null,
      assigneeId = null,
    } = input;

    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("title is required");
    }

    if (!Object.prototype.hasOwnProperty.call(slaByPriority, priority)) {
      throw new Error("invalid priority");
    }

    const id = `T-${String(idCounter).padStart(4, "0")}`;
    idCounter += 1;

    const createdAt = nowIso();
    const ticket = {
      id,
      title: title.trim(),
      description,
      priority,
      reporterId,
      assigneeId,
      status: "open",
      createdAt,
      updatedAt: createdAt,
      dueAt: computeDueAt(priority, createdAt),
      comments: [],
    };

    tickets.set(id, ticket);
    recordEvent(id, "ticket_created", { status: ticket.status, priority });

    if (assigneeId) {
      recordEvent(id, "ticket_assigned", { assigneeId });
    }

    return { ...ticket, comments: ticket.comments.slice() };
  }

  function getTicketOrThrow(ticketId) {
    if (typeof ticketId !== "string" || ticketId.trim() === "") {
      throw new Error("ticketId is required");
    }
    const ticket = tickets.get(ticketId);
    if (!ticket) {
      throw new Error("ticket not found");
    }
    return ticket;
  }

  function transitionTicket(ticketId, nextStatus) {
    const ticket = getTicketOrThrow(ticketId);

    if (typeof nextStatus !== "string" || nextStatus.trim() === "") {
      throw new Error("nextStatus is required");
    }

    const allowed = STATUS_TRANSITIONS[ticket.status] || [];
    if (!allowed.includes(nextStatus)) {
      throw new Error(`invalid transition ${ticket.status} -> ${nextStatus}`);
    }

    ticket.status = nextStatus;
    ticket.updatedAt = nowIso();
    recordEvent(ticket.id, "status_changed", { status: nextStatus });

    return { ...ticket, comments: ticket.comments.slice() };
  }

  function assignTicket(ticketId, assigneeId) {
    const ticket = getTicketOrThrow(ticketId);
    if (typeof assigneeId !== "string" || assigneeId.trim() === "") {
      throw new Error("assigneeId is required");
    }

    ticket.assigneeId = assigneeId;
    ticket.updatedAt = nowIso();
    recordEvent(ticket.id, "ticket_assigned", { assigneeId });

    return { ...ticket, comments: ticket.comments.slice() };
  }

  function addComment(ticketId, authorId, message) {
    const ticket = getTicketOrThrow(ticketId);

    if (typeof authorId !== "string" || authorId.trim() === "") {
      throw new Error("authorId is required");
    }

    if (typeof message !== "string" || message.trim() === "") {
      throw new Error("message is required");
    }

    const comment = {
      authorId,
      message: message.trim(),
      at: nowIso(),
    };

    ticket.comments.push(comment);
    ticket.updatedAt = nowIso();
    recordEvent(ticket.id, "comment_added", { authorId });

    return { ...comment };
  }

  function isBreached(ticket, referenceDate = nowIso()) {
    if (ticket.status === "closed") return false;
    return new Date(referenceDate).getTime() > new Date(ticket.dueAt).getTime();
  }

  function listTickets(filter = {}) {
    const entries = Array.from(tickets.values());
    return entries
      .filter((ticket) => (filter.status ? ticket.status === filter.status : true))
      .filter((ticket) => (filter.priority ? ticket.priority === filter.priority : true))
      .map((ticket) => ({ ...ticket, comments: ticket.comments.slice() }));
  }

  function getTimeline(ticketId = null) {
    const source = ticketId ? events.filter((e) => e.ticketId === ticketId) : events;
    return source.map((event) => ({
      ...event,
      payload: event.payload ? { ...event.payload } : null,
    }));
  }

  function getMetrics(referenceDate = nowIso()) {
    const statusCounts = {};
    let breachedTickets = 0;

    for (const ticket of tickets.values()) {
      statusCounts[ticket.status] = (statusCounts[ticket.status] || 0) + 1;
      if (isBreached(ticket, referenceDate)) {
        breachedTickets += 1;
      }
    }

    return {
      totalTickets: tickets.size,
      statusCounts,
      breachedTickets,
      totalEvents: events.length,
    };
  }

  return {
    createTicket,
    transitionTicket,
    assignTicket,
    addComment,
    listTickets,
    getTimeline,
    getMetrics,
  };
}

module.exports = {
  createTicketSystem,
};