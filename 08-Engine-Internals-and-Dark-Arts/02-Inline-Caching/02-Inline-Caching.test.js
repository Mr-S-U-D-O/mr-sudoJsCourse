const solveInlineCaching = require('./02-Inline-Caching.js');

describe('Inline-Caching', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveInlineCaching([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Inline-Caching',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveInlineCaching([])).toEqual({
      topic: 'Inline-Caching',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveInlineCaching([NaN, -0, '0'])).toEqual({
      topic: 'Inline-Caching',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
