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

  test('Trap: Symbol values are always truthy', () => {
    expect(solveWellKnownSymbols([Symbol("id"), "", false])).toEqual({
      topic: 'Well-Known-Symbols',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveWellKnownSymbols(null)).toThrow('values must be an array');
    expect(() => solveWellKnownSymbols('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveWellKnownSymbols(input);

    expect(input).toEqual(clone);
  });
});
