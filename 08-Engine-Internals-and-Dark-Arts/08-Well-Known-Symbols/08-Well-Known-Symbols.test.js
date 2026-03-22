const solveWellKnownSymbols = require('./08-Well-Known-Symbols.js');

describe('Well-Known-Symbols', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveWellKnownSymbols([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Well-Known-Symbols',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveWellKnownSymbols([])).toEqual({
      topic: 'Well-Known-Symbols',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveWellKnownSymbols([NaN, -0, '0'])).toEqual({
      topic: 'Well-Known-Symbols',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
