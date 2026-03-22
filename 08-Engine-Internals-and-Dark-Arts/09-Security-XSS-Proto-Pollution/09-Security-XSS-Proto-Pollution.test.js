const solveSecurityXSSProtoPollution = require('./09-Security-XSS-Proto-Pollution.js');

describe('Security-XSS-Proto-Pollution', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveSecurityXSSProtoPollution([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Security-XSS-Proto-Pollution',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveSecurityXSSProtoPollution([])).toEqual({
      topic: 'Security-XSS-Proto-Pollution',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveSecurityXSSProtoPollution([NaN, -0, "0"])).toEqual({
      topic: 'Security-XSS-Proto-Pollution',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveSecurityXSSProtoPollution(null)).toThrow('values must be an array');
    expect(() => solveSecurityXSSProtoPollution('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveSecurityXSSProtoPollution(input);

    expect(input).toEqual(clone);
  });
});
