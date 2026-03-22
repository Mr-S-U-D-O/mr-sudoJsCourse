const solvePromises = require('./06-Promises.js');

describe('Promises', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solvePromises([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Promises',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solvePromises([])).toEqual({
      topic: 'Promises',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solvePromises([NaN, -0, '0'])).toEqual({
      topic: 'Promises',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
