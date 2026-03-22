"use strict";

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
