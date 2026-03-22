/**
 * Analyze values for the Explicit-Resource-Management lesson.
 *
 * @param {unknown[]} values - List of values to inspect.
 * @returns {{ topic: string, total: number, truthyCount: number, falsyCount: number }}
 * Summary object for this lesson challenge.
 * @throws {TypeError} When values is not an array.
 */
function solveExplicitResourceManagement(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array');
  }

  let truthyCount = 0;

  for (const value of values) {
    if (Boolean(value)) {
      truthyCount += 1;
    }
  }

  return {
    topic: 'Explicit-Resource-Management',
    total: values.length,
    truthyCount,
    falsyCount: values.length - truthyCount,
  };
}

module.exports = solveExplicitResourceManagement;
