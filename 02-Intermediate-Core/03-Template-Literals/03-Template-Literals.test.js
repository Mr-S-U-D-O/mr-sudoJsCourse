const solveTemplateLiterals = require('./03-Template-Literals.js');

describe('Template-Literals', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveTemplateLiterals([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Template-Literals',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveTemplateLiterals([])).toEqual({
      topic: 'Template-Literals',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveTemplateLiterals([NaN, -0, '0'])).toEqual({
      topic: 'Template-Literals',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
