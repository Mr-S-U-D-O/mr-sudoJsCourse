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

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveAsyncAwait([NaN, -0, '0'])).toEqual({
      topic: 'Async-Await',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
