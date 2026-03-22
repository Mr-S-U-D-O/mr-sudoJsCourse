"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "User Account System",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
