const solveScopeAndHoisting = require('./01-Scope-and-Hoisting.js');

describe('Scope-and-Hoisting', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveScopeAndHoisting([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Scope-and-Hoisting',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveScopeAndHoisting([])).toEqual({
      topic: 'Scope-and-Hoisting',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: treats undefined and empty string as falsy', () => {
    expect(solveScopeAndHoisting([undefined, "", "hoist"])).toEqual({
      topic: 'Scope-and-Hoisting',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveScopeAndHoisting(null)).toThrow('values must be an array');
    expect(() => solveScopeAndHoisting('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveScopeAndHoisting(input);

    expect(input).toEqual(clone);
  });
});
