const solveObjectMethods = require('./05-Object-Methods.js');

describe('Object-Methods', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveObjectMethods([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Object-Methods',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveObjectMethods([])).toEqual({
      topic: 'Object-Methods',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveObjectMethods([NaN, -0, '0'])).toEqual({
      topic: 'Object-Methods',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
