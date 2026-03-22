const solveDestructuring = require('./06-Destructuring.js');

describe('Destructuring', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveDestructuring([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Destructuring',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveDestructuring([])).toEqual({
      topic: 'Destructuring',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveDestructuring([NaN, -0, "0"])).toEqual({
      topic: 'Destructuring',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveDestructuring(null)).toThrow('values must be an array');
    expect(() => solveDestructuring('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveDestructuring(input);

    expect(input).toEqual(clone);
  });
});
