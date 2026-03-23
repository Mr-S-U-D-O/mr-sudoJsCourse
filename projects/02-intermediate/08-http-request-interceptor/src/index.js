"use strict";

/**
 * HTTP REQUEST INTERCEPTOR STARTER
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

function createInterceptor() {
  // TODO: Create middleware chain system
}

function addMiddleware(interceptor, handler, position = "end") {
  // TODO: Register middleware handler to chain
}

function executeChain(interceptor, request) {
  // TODO: Run all middleware in sequence with request
}

function intercept(request, transformers) {
  // TODO: Apply transformation functions to request/response
}

function removeMiddleware(interceptor, handler) {
  // TODO: Unregister middleware by reference
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Http Request Interceptor",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createInterceptor,
  addMiddleware,
  executeChain,
  intercept,
  removeMiddleware,
  createProject,
};
