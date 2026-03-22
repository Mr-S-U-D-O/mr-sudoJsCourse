const solveSymbols = require('./04-Symbols.js');

describe('Symbols', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveSymbols([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Symbols',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveSymbols([])).toEqual({
      topic: 'Symbols',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveSymbols([NaN, -0, '0'])).toEqual({
      topic: 'Symbols',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
