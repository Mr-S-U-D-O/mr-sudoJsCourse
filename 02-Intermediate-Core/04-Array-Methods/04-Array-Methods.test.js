const solveArrayMethods = require('./04-Array-Methods.js');

describe('Array-Methods', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveArrayMethods([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Array-Methods',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveArrayMethods([])).toEqual({
      topic: 'Array-Methods',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveArrayMethods([NaN, -0, "0"])).toEqual({
      topic: 'Array-Methods',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveArrayMethods(null)).toThrow('values must be an array');
    expect(() => solveArrayMethods('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveArrayMethods(input);

    expect(input).toEqual(clone);
  });
});
