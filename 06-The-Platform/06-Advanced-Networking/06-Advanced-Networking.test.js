const solveAdvancedNetworking = require('./06-Advanced-Networking.js');

describe('Advanced-Networking', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveAdvancedNetworking([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Advanced-Networking',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveAdvancedNetworking([])).toEqual({
      topic: 'Advanced-Networking',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveAdvancedNetworking([NaN, -0, '0'])).toEqual({
      topic: 'Advanced-Networking',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
