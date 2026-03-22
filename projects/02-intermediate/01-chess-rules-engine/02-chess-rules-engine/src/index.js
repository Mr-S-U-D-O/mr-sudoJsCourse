/**
 * Student starter scaffold.
 * Goal: create a chess engine with move validation.
 */

function createGame() {
  const state = {
    board: [],
    turn: "white",
    status: "in_progress",
    history: [],
  };

  function getLegalMoves(square) {
    // TODO: return legal destination squares for a piece
    if (typeof square !== "string") {
      throw new TypeError("square must be a string");
    }

    return [];
  }

  function move(from, to) {
    // TODO: validate and apply move, then update turn/status
    if (typeof from !== "string" || typeof to !== "string") {
      throw new TypeError("from and to must be strings");
    }

    return state;
  }

  function getState() {
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