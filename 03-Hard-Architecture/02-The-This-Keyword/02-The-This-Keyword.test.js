const solveTheThisKeyword = require('./02-The-This-Keyword.js');

describe('The-This-Keyword', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveTheThisKeyword([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'The-This-Keyword',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveTheThisKeyword([])).toEqual({
      topic: 'The-This-Keyword',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveTheThisKeyword([NaN, -0, "0"])).toEqual({
      topic: 'The-This-Keyword',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveTheThisKeyword(null)).toThrow('values must be an array');
    expect(() => solveTheThisKeyword('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveTheThisKeyword(input);

    expect(input).toEqual(clone);
  });
});
