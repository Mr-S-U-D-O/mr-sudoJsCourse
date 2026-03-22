const solveSetsAndMaps = require('./09-Sets-and-Maps.js');

describe('Sets-and-Maps', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveSetsAndMaps([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Sets-and-Maps',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveSetsAndMaps([])).toEqual({
      topic: 'Sets-and-Maps',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: empty Set and Map are still truthy objects', () => {
    expect(solveSetsAndMaps([new Set(), new Map(), 0])).toEqual({
      topic: 'Sets-and-Maps',
      total: 3,
      truthyCount: 2,
      falsyCount: 1,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveSetsAndMaps(null)).toThrow('values must be an array');
    expect(() => solveSetsAndMaps('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveSetsAndMaps(input);

    expect(input).toEqual(clone);
  });
});
