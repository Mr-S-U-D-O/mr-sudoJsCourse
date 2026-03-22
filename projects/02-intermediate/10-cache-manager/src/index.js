"use strict";

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
  createProject,
};
