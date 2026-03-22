const solveGarbageCollection = require('./03-Garbage-Collection.js');

describe('Garbage-Collection', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveGarbageCollection([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Garbage-Collection',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveGarbageCollection([])).toEqual({
      topic: 'Garbage-Collection',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveGarbageCollection([NaN, -0, "0"])).toEqual({
      topic: 'Garbage-Collection',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveGarbageCollection(null)).toThrow('values must be an array');
    expect(() => solveGarbageCollection('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveGarbageCollection(input);

    expect(input).toEqual(clone);
  });
});
