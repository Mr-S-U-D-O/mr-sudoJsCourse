const solveCallbacks = require('./05-Callbacks.js');

describe('Callbacks', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveCallbacks([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Callbacks',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveCallbacks([])).toEqual({
      topic: 'Callbacks',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveCallbacks([NaN, -0, '0'])).toEqual({
      topic: 'Callbacks',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
