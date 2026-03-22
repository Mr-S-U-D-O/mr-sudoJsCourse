const solveMemoryManagement = require('./06-Memory-Management.js');

describe('Memory-Management', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveMemoryManagement([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Memory-Management',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveMemoryManagement([])).toEqual({
      topic: 'Memory-Management',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveMemoryManagement([NaN, -0, "0"])).toEqual({
      topic: 'Memory-Management',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveMemoryManagement(null)).toThrow('values must be an array');
    expect(() => solveMemoryManagement('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveMemoryManagement(input);

    expect(input).toEqual(clone);
  });
});
