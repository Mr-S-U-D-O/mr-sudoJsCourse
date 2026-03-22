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

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveSetsAndMaps([NaN, -0, '0'])).toEqual({
      topic: 'Sets-and-Maps',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
