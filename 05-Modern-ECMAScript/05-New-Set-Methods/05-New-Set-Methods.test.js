const solveNewSetMethods = require('./05-New-Set-Methods.js');

describe('New-Set-Methods', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveNewSetMethods([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'New-Set-Methods',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveNewSetMethods([])).toEqual({
      topic: 'New-Set-Methods',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveNewSetMethods([NaN, -0, '0'])).toEqual({
      topic: 'New-Set-Methods',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
