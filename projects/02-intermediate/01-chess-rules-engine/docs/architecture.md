# Chess Engine Architecture Notes

## Scope

MVP includes legal movement, captures, turn management, check/checkmate/stalemate evaluation.

## Design

- board: 8x8 matrix
- game object: board + turn + status + history
- move pipeline: parse -> pseudo-legal -> legal -> apply -> recompute status

## Invariants

- exactly one king per side
- no move may leave current player's king in check
- turn alternates after successful move

## Future Work

- castling rights
- en passant
- promotion choice UI integration