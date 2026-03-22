const solveLet = require('./02-let.js');

describe('let', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveLet([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'let',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveLet([])).toEqual({
      topic: 'let',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: handles declaration-related coercion edge values', () => {
    expect(solveLet([0, false, 'block'])).toEqual({ topic: 'let', total: 3, truthyCount: 1, falsyCount: 2 });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveLet(null)).toThrow('values must be an array');
    expect(() => solveLet('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveLet(input);

    expect(input).toEqual(clone);
  });
});
