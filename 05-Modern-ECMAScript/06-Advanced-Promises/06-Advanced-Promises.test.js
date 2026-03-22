const solveAdvancedPromises = require('./06-Advanced-Promises.js');

describe('Advanced-Promises', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveAdvancedPromises([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Advanced-Promises',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveAdvancedPromises([])).toEqual({
      topic: 'Advanced-Promises',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: Promise instances are truthy even when unresolved', () => {
    expect(solveAdvancedPromises([Promise.resolve(1), 0, false])).toEqual({
      topic: 'Advanced-Promises',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveAdvancedPromises(null)).toThrow('values must be an array');
    expect(() => solveAdvancedPromises('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveAdvancedPromises(input);

    expect(input).toEqual(clone);
  });
});
