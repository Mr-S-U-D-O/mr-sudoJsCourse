const solveStrictVsSloppyMode = require('./06-Strict-vs-Sloppy-Mode.js');

describe('Strict-vs-Sloppy-Mode', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveStrictVsSloppyMode([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Strict-vs-Sloppy-Mode',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveStrictVsSloppyMode([])).toEqual({
      topic: 'Strict-vs-Sloppy-Mode',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveStrictVsSloppyMode([NaN, -0, "0"])).toEqual({
      topic: 'Strict-vs-Sloppy-Mode',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveStrictVsSloppyMode(null)).toThrow('values must be an array');
    expect(() => solveStrictVsSloppyMode('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveStrictVsSloppyMode(input);

    expect(input).toEqual(clone);
  });
});
