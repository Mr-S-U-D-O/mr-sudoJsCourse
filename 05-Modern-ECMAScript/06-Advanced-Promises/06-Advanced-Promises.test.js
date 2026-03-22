const solveAdvancedPromises = require('./06-Advanced-Promises.js');

describe('Advanced-Promises', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveAdvancedPromises([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Advanced-Promises',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveAdvancedPromises([])).toEqual({
      topic: 'Advanced-Promises',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveAdvancedPromises([NaN, -0, '0'])).toEqual({
      topic: 'Advanced-Promises',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
