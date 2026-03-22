# Guide: Chess Rules Engine

## Build Order

1. Decide board data model and piece representation.
2. Implement base movement logic per piece type.
3. Add a legal-move filter to prevent self-check.
4. Implement game status detection (check, checkmate, stalemate).
5. Add optional support for special rules and notation parsing.

## What To Search

- chess move generation JavaScript
- legal move filtering self check
- checkmate detection algorithm
- board coordinate mapping algebraic notation

## How To Think

- Split into pseudo-legal move generation first.
- Then apply legality constraints.
- Prefer tiny helper functions for each rule.

## Suggested Learning Resources

- https://www.chessprogramming.org/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
- https://en.wikipedia.org/wiki/Glossary_of_chess