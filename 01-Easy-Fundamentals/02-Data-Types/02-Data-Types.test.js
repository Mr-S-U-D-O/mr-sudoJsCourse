const solveDataTypes = require('./02-Data-Types.js');

describe('Data-Types', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveDataTypes([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Data-Types',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveDataTypes([])).toEqual({
      topic: 'Data-Types',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveDataTypes([NaN, -0, "0"])).toEqual({
      topic: 'Data-Types',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveDataTypes(null)).toThrow('values must be an array');
    expect(() => solveDataTypes('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveDataTypes(input);

    expect(input).toEqual(clone);
  });
});
