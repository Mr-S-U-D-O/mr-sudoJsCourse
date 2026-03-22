const solveTheTemporalAPI = require('./02-The-Temporal-API.js');

describe('The-Temporal-API', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveTheTemporalAPI([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'The-Temporal-API',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveTheTemporalAPI([])).toEqual({
      topic: 'The-Temporal-API',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveTheTemporalAPI([NaN, -0, "0"])).toEqual({
      topic: 'The-Temporal-API',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveTheTemporalAPI(null)).toThrow('values must be an array');
    expect(() => solveTheTemporalAPI('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveTheTemporalAPI(input);

    expect(input).toEqual(clone);
  });
});
