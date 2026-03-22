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

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveScopeAndHoisting([NaN, -0, '0'])).toEqual({
      topic: 'Scope-and-Hoisting',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
