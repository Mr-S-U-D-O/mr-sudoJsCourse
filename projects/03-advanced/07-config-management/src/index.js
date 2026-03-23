"use strict";

/**
 * CONFIG MANAGEMENT STARTER
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

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Config Management",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
