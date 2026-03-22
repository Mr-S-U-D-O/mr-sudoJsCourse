"use strict";

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
