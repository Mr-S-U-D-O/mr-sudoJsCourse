const solveExplicitResourceManagement = require('./01-Explicit-Resource-Management.js');

describe('Explicit-Resource-Management', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveExplicitResourceManagement([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Explicit-Resource-Management',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveExplicitResourceManagement([])).toEqual({
      topic: 'Explicit-Resource-Management',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveExplicitResourceManagement([NaN, -0, "0"])).toEqual({
      topic: 'Explicit-Resource-Management',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveExplicitResourceManagement(null)).toThrow('values must be an array');
    expect(() => solveExplicitResourceManagement('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveExplicitResourceManagement(input);

    expect(input).toEqual(clone);
  });
});
