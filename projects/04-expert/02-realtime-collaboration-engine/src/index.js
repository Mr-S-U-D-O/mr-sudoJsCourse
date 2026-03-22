"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Realtime Collaboration Engine",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
