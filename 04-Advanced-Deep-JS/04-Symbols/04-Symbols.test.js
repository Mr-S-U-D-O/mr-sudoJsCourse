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

  test('Trap: Symbol values are always truthy', () => {
    expect(solveSymbols([Symbol("id"), "", false])).toEqual({
      topic: 'Symbols',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveSymbols(null)).toThrow('values must be an array');
    expect(() => solveSymbols('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveSymbols(input);

    expect(input).toEqual(clone);
  });
});
