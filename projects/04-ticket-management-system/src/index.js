/**
 * Student starter scaffold.
 * Goal: build a ticket workflow domain service.
 */

function createTicketSystem() {
  const state = {
    tickets: new Map(),
    events: [],
  };

  function createTicket(input) {
    // TODO: validate and create ticket
    if (!input || typeof input !== "object") {
      throw new TypeError("input must be an object");
    }

    return null;
  }

  function transitionTicket(ticketId, nextStatus) {
    // TODO: enforce transition rules and log event
    if (typeof ticketId !== "string" || typeof nextStatus !== "string") {
      throw new TypeError("ticketId and nextStatus must be strings");
    }

    return null;
  }

  function getMetrics() {
    // TODO: compute backlog and SLA metrics
    return {
      totalTickets: state.tickets.size,
      statusCounts: {},
      breachedTickets: 0,
    };
  }

  return {
    createTicket,
    transitionTicket,
    getMetrics,
  };
}

module.exports = {
  createTicketSystem,
};