const solveCallbacks = require('./05-Callbacks.js');

describe('Callbacks', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveCallbacks([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Callbacks',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveCallbacks([])).toEqual({
      topic: 'Callbacks',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: Promise instances are truthy even when unresolved', () => {
    expect(solveCallbacks([Promise.resolve(1), 0, false])).toEqual({
      topic: 'Callbacks',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveCallbacks(null)).toThrow('values must be an array');
    expect(() => solveCallbacks('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveCallbacks(input);

    expect(input).toEqual(clone);
  });
});
