const solveIteratorHelpers = require('./04-Iterator-Helpers.js');

describe('Iterator-Helpers', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveIteratorHelpers([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Iterator-Helpers',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveIteratorHelpers([])).toEqual({
      topic: 'Iterator-Helpers',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveIteratorHelpers([NaN, -0, '0'])).toEqual({
      topic: 'Iterator-Helpers',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
