const solveErrorHandling = require('./08-Error-Handling.js');

describe('Error-Handling', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveErrorHandling([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Error-Handling',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveErrorHandling([])).toEqual({
      topic: 'Error-Handling',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveErrorHandling([NaN, -0, '0'])).toEqual({
      topic: 'Error-Handling',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
