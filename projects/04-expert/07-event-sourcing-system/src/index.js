"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Event Sourcing System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
