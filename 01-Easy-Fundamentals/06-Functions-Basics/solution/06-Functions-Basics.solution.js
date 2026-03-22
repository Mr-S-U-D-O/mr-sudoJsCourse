/**
 * Analyze values for the Functions-Basics lesson.
 *
 * @param {unknown[]} values - List of values to inspect.
 * @returns {{ topic: string, total: number, truthyCount: number, falsyCount: number }}
 * Summary object for this lesson challenge.
 * @throws {TypeError} When values is not an array.
 */
function solveFunctionsBasics(values) {
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
    topic: 'Functions-Basics',
    total: values.length,
    truthyCount,
    falsyCount: values.length - truthyCount,
  };
}

module.exports = solveFunctionsBasics;
