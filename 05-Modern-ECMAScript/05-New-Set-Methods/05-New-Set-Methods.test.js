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

  test('Trap: empty Set and Map are still truthy objects', () => {
    expect(solveNewSetMethods([new Set(), new Map(), 0])).toEqual({
      topic: 'New-Set-Methods',
      total: 3,
      truthyCount: 2,
      falsyCount: 1,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveNewSetMethods(null)).toThrow('values must be an array');
    expect(() => solveNewSetMethods('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveNewSetMethods(input);

    expect(input).toEqual(clone);
  });
});
