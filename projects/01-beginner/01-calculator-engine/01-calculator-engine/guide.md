# Guide: Calculator Engine

## Build Order

1. Create a tokenizer that converts a string into number/operator/parenthesis tokens.
2. Add syntax validation: balanced parentheses, valid operator placement, no empty expression.
3. Convert infix tokens to RPN using a stack-based algorithm.
4. Evaluate the RPN token list using a value stack.
5. Add error types and descriptive messages.
6. Add optional memory/history support.

## What To Search

- shunting-yard algorithm JavaScript
- reverse polish notation evaluator
- infix expression parser precedence
- handling unary minus parser

## How To Think

- Break one problem into three: parse, validate, evaluate.
- Test tiny pieces first, then integrate.
- Treat malformed input as normal, expected traffic.

## Suggested Learning Resources

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
- https://en.wikipedia.org/wiki/Shunting_yard_algorithm
- https://javascript.info/error-handling