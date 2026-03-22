const solvePersistence = require('./07-Persistence.js');

describe('Persistence', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solvePersistence([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Persistence',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solvePersistence([])).toEqual({
      topic: 'Persistence',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solvePersistence([NaN, -0, "0"])).toEqual({
      topic: 'Persistence',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solvePersistence(null)).toThrow('values must be an array');
    expect(() => solvePersistence('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solvePersistence(input);

    expect(input).toEqual(clone);
  });
});
