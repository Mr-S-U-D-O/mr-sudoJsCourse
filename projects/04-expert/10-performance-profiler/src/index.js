"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Performance Profiler",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
