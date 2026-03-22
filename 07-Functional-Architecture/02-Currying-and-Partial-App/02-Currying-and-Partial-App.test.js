const solveCurryingAndPartialApp = require('./02-Currying-and-Partial-App.js');

describe('Currying-and-Partial-App', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveCurryingAndPartialApp([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Currying-and-Partial-App',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveCurryingAndPartialApp([])).toEqual({
      topic: 'Currying-and-Partial-App',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveCurryingAndPartialApp([NaN, -0, "0"])).toEqual({
      topic: 'Currying-and-Partial-App',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveCurryingAndPartialApp(null)).toThrow('values must be an array');
    expect(() => solveCurryingAndPartialApp('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveCurryingAndPartialApp(input);

    expect(input).toEqual(clone);
  });
});
