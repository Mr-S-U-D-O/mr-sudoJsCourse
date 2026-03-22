const solveDecorators = require('./03-Decorators.js');

describe('Decorators', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveDecorators([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Decorators',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveDecorators([])).toEqual({
      topic: 'Decorators',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveDecorators([NaN, -0, "0"])).toEqual({
      topic: 'Decorators',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveDecorators(null)).toThrow('values must be an array');
    expect(() => solveDecorators('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveDecorators(input);

    expect(input).toEqual(clone);
  });
});
