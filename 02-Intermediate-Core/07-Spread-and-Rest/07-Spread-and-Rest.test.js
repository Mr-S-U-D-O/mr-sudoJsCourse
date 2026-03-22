const solveSpreadAndRest = require('./07-Spread-and-Rest.js');

describe('Spread-and-Rest', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveSpreadAndRest([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Spread-and-Rest',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveSpreadAndRest([])).toEqual({
      topic: 'Spread-and-Rest',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveSpreadAndRest([NaN, -0, '0'])).toEqual({
      topic: 'Spread-and-Rest',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
