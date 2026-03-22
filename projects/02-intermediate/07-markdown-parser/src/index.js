"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Markdown Parser",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
