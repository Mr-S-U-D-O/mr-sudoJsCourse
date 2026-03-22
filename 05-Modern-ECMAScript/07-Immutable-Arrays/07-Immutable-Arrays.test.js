const solveImmutableArrays = require('./07-Immutable-Arrays.js');

describe('Immutable-Arrays', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveImmutableArrays([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Immutable-Arrays',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveImmutableArrays([])).toEqual({
      topic: 'Immutable-Arrays',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveImmutableArrays([NaN, -0, "0"])).toEqual({
      topic: 'Immutable-Arrays',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveImmutableArrays(null)).toThrow('values must be an array');
    expect(() => solveImmutableArrays('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveImmutableArrays(input);

    expect(input).toEqual(clone);
  });
});
