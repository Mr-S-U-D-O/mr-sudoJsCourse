# Calculator Engine Architecture Notes

## Scope

Expression parsing and evaluation for +, -, *, /, parentheses, decimals, unary minus.

## Module Boundaries

- tokenizer: string -> tokens
- parser: infix tokens -> RPN
- evaluator: RPN -> number
- facade: evaluateExpression API

## Error Strategy

Throw typed errors with exact reason and token position where possible.

## Complexity Targets

- tokenization: O(n)
- infix to RPN: O(n)
- RPN evaluation: O(n)

## Production Extensions

- operator plugins
- variables and context injection
- expression caching