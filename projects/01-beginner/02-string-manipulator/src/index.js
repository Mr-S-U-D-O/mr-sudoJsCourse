"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "String Manipulator",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
