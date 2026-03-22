const solveTheEventLoop = require('./01-The-Event-Loop.js');

describe('The-Event-Loop', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveTheEventLoop([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'The-Event-Loop',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveTheEventLoop([])).toEqual({
      topic: 'The-Event-Loop',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveTheEventLoop([NaN, -0, '0'])).toEqual({
      topic: 'The-Event-Loop',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
