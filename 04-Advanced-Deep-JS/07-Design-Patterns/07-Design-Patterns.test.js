const solveDesignPatterns = require('./07-Design-Patterns.js');

describe('Design-Patterns', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveDesignPatterns([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Design-Patterns',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveDesignPatterns([])).toEqual({
      topic: 'Design-Patterns',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveDesignPatterns([NaN, -0, "0"])).toEqual({
      topic: 'Design-Patterns',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveDesignPatterns(null)).toThrow('values must be an array');
    expect(() => solveDesignPatterns('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveDesignPatterns(input);

    expect(input).toEqual(clone);
  });
});
