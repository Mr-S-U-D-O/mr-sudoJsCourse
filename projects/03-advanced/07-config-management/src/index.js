"use strict";

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
