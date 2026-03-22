const solveIteratorsGenerators = require('./02-Iterators-Generators.js');

describe('Iterators-Generators', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveIteratorsGenerators([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Iterators-Generators',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveIteratorsGenerators([])).toEqual({
      topic: 'Iterators-Generators',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveIteratorsGenerators([NaN, -0, "0"])).toEqual({
      topic: 'Iterators-Generators',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveIteratorsGenerators(null)).toThrow('values must be an array');
    expect(() => solveIteratorsGenerators('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveIteratorsGenerators(input);

    expect(input).toEqual(clone);
  });
});
