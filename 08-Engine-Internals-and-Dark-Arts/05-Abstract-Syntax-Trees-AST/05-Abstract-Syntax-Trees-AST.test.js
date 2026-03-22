const solveAbstractSyntaxTreesAST = require('./05-Abstract-Syntax-Trees-AST.js');

describe('Abstract-Syntax-Trees-AST', () => {
  test('Happy Path: counts truthy and falsy values', () => {
    expect(solveAbstractSyntaxTreesAST([1, 0, 'JS', '', true, false])).toEqual({
      topic: 'Abstract-Syntax-Trees-AST',
      total: 6,
      truthyCount: 3,
      falsyCount: 3,
    });
  });

  test('Edge Case: handles an empty input array', () => {
    expect(solveAbstractSyntaxTreesAST([])).toEqual({
      topic: 'Abstract-Syntax-Trees-AST',
      total: 0,
      truthyCount: 0,
      falsyCount: 0,
    });
  });

  test('Trap: counts NaN and -0 as falsy while "0" is truthy', () => {
    expect(solveAbstractSyntaxTreesAST([NaN, -0, '0'])).toEqual({
      topic: 'Abstract-Syntax-Trees-AST',
      total: 3,
      truthyCount: 1,
      falsyCount: 2,
    });
  });
});
