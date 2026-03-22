const solveAlgebraicDataTypes = require('./05-Algebraic-Data-Types.js');

describe('Algebraic-Data-Types', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveAlgebraicDataTypes([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Algebraic-Data-Types',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveAlgebraicDataTypes([])).toEqual({
      topic: 'Algebraic-Data-Types',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveAlgebraicDataTypes([NaN, -0, '0'])).toEqual({
      topic: 'Algebraic-Data-Types',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
