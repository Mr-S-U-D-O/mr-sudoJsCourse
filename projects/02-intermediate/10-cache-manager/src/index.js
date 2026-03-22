"use strict";

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
