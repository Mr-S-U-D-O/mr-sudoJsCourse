const solveRegExpEnhancements = require('./08-RegExp-Enhancements.js');

describe('RegExp-Enhancements', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveRegExpEnhancements([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'RegExp-Enhancements',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveRegExpEnhancements([])).toEqual({
      topic: 'RegExp-Enhancements',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveRegExpEnhancements([NaN, -0, "0"])).toEqual({
      topic: 'RegExp-Enhancements',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveRegExpEnhancements(null)).toThrow('values must be an array');
    expect(() => solveRegExpEnhancements('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveRegExpEnhancements(input);

    expect(input).toEqual(clone);
  });
});
