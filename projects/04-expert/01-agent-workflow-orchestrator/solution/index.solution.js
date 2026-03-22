/**
 * Reference solution for Project 06.
 */

function assertWorkflowSchema(workflow) {
  if (!workflow || typeof workflow !== "object" || Array.isArray(workflow)) {
    throw new TypeError("workflow must be an object");
  }

  if (!Array.isArray(workflow.nodes) || workflow.nodes.length === 0) {
    throw new Error("workflow.nodes must be a non-empty array");
  }

  const ids = new Set();
  for (const node of workflow.nodes) {
    if (!node || typeof node !== "object") {
      throw new Error("each node must be an object");
    }

    if (typeof node.id !== "string" || node.id.trim() === "") {
      throw new Error("each node must have a non-empty id");
    }

    if (ids.has(node.id)) {
      throw new Error(`duplicate node id: ${node.id}`);
    }

    ids.add(node.id);
  }

  for (const node of workflow.nodes) {
    const deps = Array.isArray(node.dependsOn) ? node.dependsOn : [];
    for (const depId of deps) {
      if (!ids.has(depId)) {
        throw new Error(`unknown dependency '${depId}' for node '${node.id}'`);
      }
      if (depId === node.id) {
        throw new Error(`node '${node.id}' cannot depend on itself`);
      }
    }
  }
}

function detectCycle(workflow) {
  const graph = new Map();
  const indegree = new Map();

  for (const node of workflow.nodes) {
    graph.set(node.id, []);
    indegree.set(node.id, 0);
  }

  for (const node of workflow.nodes) {
    const deps = Array.isArray(node.dependsOn) ? node.dependsOn : [];
    for (const dep of deps) {
      graph.get(dep).push(node.id);
      indegree.set(node.id, indegree.get(node.id) + 1);
    }
  }

  const queue = [];
  for (const [id, degree] of indegree) {
    if (degree === 0) queue.push(id);
  }

  let visited = 0;
  while (queue.length > 0) {
    const id = queue.shift();
    visited += 1;

    for (const neighbor of graph.get(id)) {
      const next = indegree.get(neighbor) - 1;
      indegree.set(neighbor, next);
      if (next === 0) queue.push(neighbor);
    }
  }

  if (visited !== workflow.nodes.length) {
    throw new Error("workflow contains a cycle");
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function executeNodeWithRetry(node, handlers, context, logs) {
  const handler = handlers[node.type];
  if (typeof handler !== "function") {
    throw new Error(`missing handler for node type '${node.type}'`);
  }

  const retry = node.retry || {};
  const maxAttempts = Number.isInteger(retry.maxAttempts) ? retry.maxAttempts : 1;
  const delayMs = Number.isFinite(retry.delayMs) ? retry.delayMs : 0;

  let attempt = 0;
  let lastError = null;

  while (attempt < maxAttempts) {
    attempt += 1;
    const startedAt = new Date().toISOString();

    try {
      const output = await handler({
        id: node.id,
        input: node.input || {},
        context,
      });

      logs.push({
        nodeId: node.id,
        attempt,
        startedAt,
        endedAt: new Date().toISOString(),
        status: "success",
      });

      return output;
    } catch (error) {
      lastError = error;
      logs.push({
        nodeId: node.id,
        attempt,
        startedAt,
        endedAt: new Date().toISOString(),
        status: "failed",
        error: error instanceof Error ? error.message : String(error),
      });

      if (attempt < maxAttempts && delayMs > 0) {
        await sleep(delayMs);
      }
    }
  }

  throw lastError;
}

async function runWorkflow(workflow, handlers) {
  assertWorkflowSchema(workflow);
  detectCycle(workflow);

  if (!handlers || typeof handlers !== "object") {
    throw new TypeError("handlers must be an object");
  }

  const byId = new Map(workflow.nodes.map((node) => [node.id, node]));
  const depsById = new Map(
    workflow.nodes.map((node) => [
      node.id,
      new Set(Array.isArray(node.dependsOn) ? node.dependsOn : []),
    ]),
  );

  const completed = new Set();
  const failed = new Set();
  const outputs = {};
  const logs = [];

  while (completed.size + failed.size < workflow.nodes.length) {
    const runnable = workflow.nodes.filter((node) => {
      if (completed.has(node.id) || failed.has(node.id)) return false;
      for (const depId of depsById.get(node.id)) {
        if (!completed.has(depId)) return false;
      }
      return true;
    });

    if (runnable.length === 0) {
      const pending = workflow.nodes
        .map((n) => n.id)
        .filter((id) => !completed.has(id) && !failed.has(id));
      throw new Error(`no runnable nodes left; pending: ${pending.join(", ")}`);
    }

    for (const node of runnable) {
      const context = {
        outputs: { ...outputs },
        getOutput(nodeId) {
          if (!Object.prototype.hasOwnProperty.call(outputs, nodeId)) {
            throw new Error(`output for '${nodeId}' not available`);
          }
          return outputs[nodeId];
        },
      };

      try {
        const output = await executeNodeWithRetry(node, handlers, context, logs);
        outputs[node.id] = output;
        completed.add(node.id);
      } catch (error) {
        failed.add(node.id);
        return {
          status: "failed",
          failedNodeId: node.id,
          error: error instanceof Error ? error.message : String(error),
          completedNodeIds: Array.from(completed),
          failedNodeIds: Array.from(failed),
          outputs,
          logs,
        };
      }
    }
  }

  return {
    status: "completed",
    completedNodeIds: Array.from(completed),
    failedNodeIds: Array.from(failed),
    outputs,
    logs,
  };
}

module.exports = {
  runWorkflow,
};