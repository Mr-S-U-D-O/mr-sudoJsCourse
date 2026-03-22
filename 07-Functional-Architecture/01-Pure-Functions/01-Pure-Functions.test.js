const solvePureFunctions = require('./01-Pure-Functions.js');

describe('Pure-Functions', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solvePureFunctions([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Pure-Functions',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solvePureFunctions([])).toEqual({
      topic: 'Pure-Functions',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solvePureFunctions([NaN, -0, '0'])).toEqual({
      topic: 'Pure-Functions',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
