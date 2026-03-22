const solveModules = require('./08-Modules.js');

describe('Modules', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveModules([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Modules',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveModules([])).toEqual({
      topic: 'Modules',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveModules([NaN, -0, "0"])).toEqual({
      topic: 'Modules',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveModules(null)).toThrow('values must be an array');
    expect(() => solveModules('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveModules(input);

    expect(input).toEqual(clone);
  });
});
