"use strict";

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
  createProject,
};
