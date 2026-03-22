const solveRecordsAndTuples = require('./09-Records-and-Tuples.js');

describe('Records-and-Tuples', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveRecordsAndTuples([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Records-and-Tuples',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveRecordsAndTuples([])).toEqual({
      topic: 'Records-and-Tuples',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveRecordsAndTuples([NaN, -0, '0'])).toEqual({
      topic: 'Records-and-Tuples',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
