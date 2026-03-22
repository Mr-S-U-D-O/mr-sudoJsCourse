const solveShapesAndHiddenClasses = require('./01-Shapes-and-Hidden-Classes.js');

describe('Shapes-and-Hidden-Classes', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveShapesAndHiddenClasses([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Shapes-and-Hidden-Classes',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveShapesAndHiddenClasses([])).toEqual({
      topic: 'Shapes-and-Hidden-Classes',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveShapesAndHiddenClasses([NaN, -0, "0"])).toEqual({
      topic: 'Shapes-and-Hidden-Classes',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });

  test('Validation: throws when input is not an array', () => {
    expect(() => solveShapesAndHiddenClasses(null)).toThrow('values must be an array');
    expect(() => solveShapesAndHiddenClasses('not-an-array')).toThrow('values must be an array');
  });

  test('Safety: does not mutate the input array', () => {
    const input = [1, 0, 'x'];
    const clone = [...input];

    solveShapesAndHiddenClasses(input);

    expect(input).toEqual(clone);
  });
});
