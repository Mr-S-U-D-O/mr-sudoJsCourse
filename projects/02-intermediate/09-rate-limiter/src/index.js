"use strict";

/**
 * RATE LIMITER STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * state transitions, composable helpers, and robust error handling
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

function createLimiter(maxRequests, timeWindowMs) {
  // TODO: Create rate limiter state tracker
}

function isAllowed(limiter, userId) {
  // TODO: Check if user can make request
}

function increment(limiter, userId) {
  // TODO: Record request for user
}

function getRemainingQuota(limiter, userId) {
  // TODO: Return how many requests user has left
}

function reset(limiter, userId) {
  // TODO: Reset quota for user
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Rate Limiter",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createLimiter,
  isAllowed,
  increment,
  getRemainingQuota,
  reset,
  createProject,
};
