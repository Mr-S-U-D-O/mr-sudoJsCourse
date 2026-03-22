/**
 * Student starter scaffold.
 * Goal: build a workflow orchestrator runtime.
 */

async function runWorkflow(workflow, handlers) {
  // TODO: validate workflow schema and execute nodes by dependencies
  if (!workflow || typeof workflow !== "object") {
    throw new TypeError("workflow must be an object");
  }

  if (!handlers || typeof handlers !== "object") {
    throw new TypeError("handlers must be an object");
  }

  return {
    status: "todo",
    steps: [],
  };
}

module.exports = {
  runWorkflow,
};