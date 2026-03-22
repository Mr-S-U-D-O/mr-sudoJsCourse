/**
 * Analyze values for the Error-Handling lesson.
 *
 * @param {unknown[]} values - List of values to inspect.
 * @returns {{ topic: string, total: number, truthyCount: number, falsyCount: number }}
 * Summary object for this lesson challenge.
 * @throws {TypeError} When values is not an array.
 */
function solveErrorHandling(values) {
  if (!Array.isArray(values)) {
    throw new TypeError('values must be an array');
  }

  let truthyCount = 0;

  for (const value of values) {
    if (value) {
      truthyCount += 1;
    }
  }

  return {
    topic: 'Error-Handling',
    total: values.length,
    truthyCount,
    falsyCount: values.length - truthyCount,
  };
}

module.exports = solveErrorHandling;
