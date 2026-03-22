const solveArrowFunctions = require('./02-Arrow-Functions.js');

describe('Arrow-Functions', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveArrowFunctions([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Arrow-Functions',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveArrowFunctions([])).toEqual({
      topic: 'Arrow-Functions',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveArrowFunctions([NaN, -0, "0"])).toEqual({
      topic: 'Arrow-Functions',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveArrowFunctions(null)).toThrow('values must be an array');
    expect(() => solveArrowFunctions('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveArrowFunctions(input);

    expect(input).toEqual(clone);
  });
});
