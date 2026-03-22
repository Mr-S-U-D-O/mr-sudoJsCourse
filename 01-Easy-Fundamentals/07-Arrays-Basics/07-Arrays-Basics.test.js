const solveArraysBasics = require('./07-Arrays-Basics.js');

describe('Arrays-Basics', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveArraysBasics([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Arrays-Basics',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveArraysBasics([])).toEqual({
      topic: 'Arrays-Basics',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveArraysBasics([NaN, -0, "0"])).toEqual({
      topic: 'Arrays-Basics',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveArraysBasics(null)).toThrow('values must be an array');
    expect(() => solveArraysBasics('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveArraysBasics(input);

    expect(input).toEqual(clone);
  });
});
