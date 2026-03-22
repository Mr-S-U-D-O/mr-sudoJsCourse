"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Message Queue System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
