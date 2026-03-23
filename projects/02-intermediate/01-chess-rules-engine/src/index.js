/**
 * CHESS RULES ENGINE STARTER
 *
 * Purpose:
 * Implement production-style core logic with clear contracts and predictable behavior.
 *
 * Learning Focus:
 * state transitions, composable helpers, and robust error handling
 *
 * Implementation Strategy:
 * 1. Define and validate input contracts first.
 * 2. Implement a minimal happy path end-to-end.
 * 3. Add edge-case handling and deterministic error messages.
 * 4. Keep pure logic separated from side effects.
 * 5. Export testable helpers and verify behavior with manual checks.
 */

/**
 * Student starter scaffold.
 * Goal: create a chess engine with move validation.
 *
 * Suggested architecture:
 * 1) Parse square notation (e.g., "e2") to board coordinates.
 * 2) Generate pseudo-legal moves by piece movement rules.
 * 3) Filter pseudo-legal moves by king safety (self-check prevention).
 * 4) Apply move immutably, then update turn and game status.
 */

function createGame() {
  const state = {
    board: [],
    turn: "white",
    status: "in_progress",
    history: [],
  };

  function getLegalMoves(square) {
    // TODO: return legal destination squares for a piece.
    // Steps:
    // 1) Validate square format (for example, /^[a-h][1-8]$/).
    // 2) Find piece at source square; reject empty square.
    // 3) Ensure piece color matches current turn.
    // 4) Generate pseudo-legal moves for piece type.
    // 5) Filter out moves that leave own king in check.
    // 6) Return destination squares in stable deterministic order.
    if (typeof square !== "string") {
      throw new TypeError("square must be a string");
    }

    return [];
  }

  function move(from, to) {
    // TODO: validate and apply move, then update turn/status.
    // Steps:
    // 1) Validate both source and destination notation.
    // 2) Compute legal moves for source and ensure destination is allowed.
    // 3) Apply move on a cloned board state (avoid accidental mutation).
    // 4) Append move to history with enough data for replay/debug.
    // 5) Toggle turn exactly once after successful move.
    // 6) Recompute game status: in_progress/check/checkmate/stalemate.
    // 7) Return a safe state snapshot.
    if (typeof from !== "string" || typeof to !== "string") {
      throw new TypeError("from and to must be strings");
    }

    return state;
  }

  function getState() {
    // Return defensive copies so callers cannot mutate engine internals.
    return {
      ...state,
      board: state.board.map((row) => row.slice()),
      history: state.history.slice(),
    };
  }

  return {
    getLegalMoves,
    move,
    getState,
  };
}

module.exports = {
  createGame,
};
