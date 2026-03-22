const solveMonadsAndFunctors = require('./04-Monads-and-Functors.js');

describe('Monads-and-Functors', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveMonadsAndFunctors([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Monads-and-Functors',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveMonadsAndFunctors([])).toEqual({
      topic: 'Monads-and-Functors',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveMonadsAndFunctors([NaN, -0, "0"])).toEqual({
      topic: 'Monads-and-Functors',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveMonadsAndFunctors(null)).toThrow('values must be an array');
    expect(() => solveMonadsAndFunctors('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveMonadsAndFunctors(input);

    expect(input).toEqual(clone);
  });
});
