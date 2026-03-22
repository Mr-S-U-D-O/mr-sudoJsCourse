"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Contact Manager",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
