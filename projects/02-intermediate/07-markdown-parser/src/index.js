"use strict";

/**
 * MARKDOWN PARSER STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * state transitions, composable helpers, and robust error handling
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

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
