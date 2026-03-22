const solveConst = require('./03-const.js');

describe('const', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveConst([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'const',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveConst([])).toEqual({
      topic: 'const',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: handles declaration-related coercion edge values', () => {
    expect(solveConst([NaN, -0, 'immutable'])).toEqual({ topic: 'const', total: 3, truthyCount: 1, falsyCount: 2 });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveConst(null)).toThrow('values must be an array');
    expect(() => solveConst('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveConst(input);

    expect(input).toEqual(clone);
  });
});
