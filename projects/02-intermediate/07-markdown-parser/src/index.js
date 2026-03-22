"use strict";

function tokenize(markdown) {
  // TODO: Break markdown into tokens (headings, lists, paragraphs, code, emphasis)
}

function parseMarkdown(markdown) {
  // TODO: Parse markdown string into AST or structured object
}

function generateHTML(ast) {
  // TODO: Convert AST to HTML output
}

function parseBlocks(markdown) {
  // TODO: Identify and extract markdown blocks
}

function applyInlineFormatting(text) {
  // TODO: Handle **bold**, *italic*, `code`, [links](url)
}

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
  tokenize,
  parseMarkdown,
  generateHTML,
  parseBlocks,
  applyInlineFormatting,
  createProject,
};
