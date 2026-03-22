const solveAsyncAwait = require('./07-Async-Await.js');

describe('Async-Await', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveAsyncAwait([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Async-Await',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveAsyncAwait([])).toEqual({
      topic: 'Async-Await',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: Promise instances are truthy even when unresolved', () => {
    expect(solveAsyncAwait([Promise.resolve(1), 0, false])).toEqual({
      topic: 'Async-Await',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveAsyncAwait(null)).toThrow('values must be an array');
    expect(() => solveAsyncAwait('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveAsyncAwait(input);

    expect(input).toEqual(clone);
  });
});
