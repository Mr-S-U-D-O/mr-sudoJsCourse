const solveWebAndServiceWorkers = require('./03-Web-and-Service-Workers.js');

describe('Web-and-Service-Workers', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveWebAndServiceWorkers([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Web-and-Service-Workers',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveWebAndServiceWorkers([])).toEqual({
      topic: 'Web-and-Service-Workers',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveWebAndServiceWorkers([NaN, -0, '0'])).toEqual({
      topic: 'Web-and-Service-Workers',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
