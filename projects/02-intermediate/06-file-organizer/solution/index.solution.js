"use strict";

const metadata = {
  project: "File Organizer",
  level: "Intermediate",
  status: "reference",
};

function createProject(initialState = {}) {
  const state = {
    createdAt: new Date().toISOString(),
    ...initialState,
  };

  return {
    title: metadata.project,
    getState() {
      return { ...state };
    },
    describe() {
      return metadata.project + " (" + metadata.level + ")";
    },
  };
}

module.exports = {
  metadata,
  createProject,
};
