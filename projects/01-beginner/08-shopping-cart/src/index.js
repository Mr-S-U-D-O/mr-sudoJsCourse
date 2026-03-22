"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "Shopping Cart",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
