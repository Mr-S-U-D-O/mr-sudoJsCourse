"use strict";

function createProject(initialState = {}) {
  const state = {
    ...initialState,
  };

  return {
    title: "File Organizer",
    getState() {
      return { ...state };
    },
  };
}

module.exports = {
  createProject,
};
