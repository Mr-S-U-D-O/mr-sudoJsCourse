/**
 * Analyze values for the Security-XSS-Proto-Pollution lesson.
 *
 * @param {unknown[]} values - List of values to inspect.
 * @returns {{ topic: string, total: number, truthyCount: number, falsyCount: number }}
 * Summary object for this lesson challenge.
 * @throws {TypeError} When values is not an array.
 */
function solveSecurityXSSProtoPollution(values) {
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
    topic: 'Security-XSS-Proto-Pollution',
    total: values.length,
    truthyCount,
    falsyCount: values.length - truthyCount,
  };
}

module.exports = solveSecurityXSSProtoPollution;
