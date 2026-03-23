/**
 * TICKET MANAGEMENT SYSTEM STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * architecture boundaries, resilience behavior, and observability
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

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