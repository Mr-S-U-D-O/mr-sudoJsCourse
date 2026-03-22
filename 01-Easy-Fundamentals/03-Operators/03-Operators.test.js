const solveOperators = require('./03-Operators.js');

describe('Operators', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveOperators([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Operators',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveOperators([])).toEqual({
      topic: 'Operators',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveOperators([NaN, -0, '0'])).toEqual({
      topic: 'Operators',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
