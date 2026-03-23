"use strict";

/**
 * CACHE MANAGER STARTER
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

function createCache(maxSize = 100, ttlMs = null) {
  // TODO: Initialize cache with size limit and optional TTL
}

function set(cache, key, value) {
  // TODO: Store value with eviction when full
}

function get(cache, key) {
  // TODO: Retrieve value, return null if not found or expired
}

function invalidate(cache, key) {
  // TODO: Remove specific key
}

function clear(cache) {
  // TODO: Remove all entries
}

function getStats(cache) {
  // TODO: Return { size, hits, misses, hitRate }
}

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Cache Manager",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createCache,
  set,
  get,
  invalidate,
  clear,
  getStats,
  createProject,
};
