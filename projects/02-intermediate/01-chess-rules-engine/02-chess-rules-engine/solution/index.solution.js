/**
 * Reference solution for Project 02.
 * Scope: standard piece movement, self-check prevention, check/checkmate/stalemate detection.
 */

const FILES = "abcdefgh";

function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

function toPos(square) {
  if (typeof square !== "string" || square.length !== 2) {
    throw new Error("invalid square format");
  }
  const file = FILES.indexOf(square[0]);
  const rank = Number(square[1]);
  if (file < 0 || rank < 1 || rank > 8) {
    throw new Error("invalid square format");
  }
  return [8 - rank, file];
}

function toSquare(r, c) {
  return `${FILES[c]}${8 - r}`;
}

function cloneBoard(board) {
  return board.map((row) => row.map((cell) => (cell ? { ...cell } : null)));
}

function createInitialBoard() {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null));
  const back = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

  for (let c = 0; c < 8; c += 1) {
    board[0][c] = { type: back[c], color: "black" };
    board[1][c] = { type: "pawn", color: "black" };
    board[6][c] = { type: "pawn", color: "white" };
    board[7][c] = { type: back[c], color: "white" };
  }

  return board;
}

function rayMoves(board, r, c, color, deltas) {
  const moves = [];
  for (const [dr, dc] of deltas) {
    let nr = r + dr;
    let nc = c + dc;
    while (inBounds(nr, nc)) {
      const target = board[nr][nc];
      if (!target) {
        moves.push([nr, nc]);
      } else {
        if (target.color !== color) moves.push([nr, nc]);
        break;
      }
      nr += dr;
      nc += dc;
    }
  }
  return moves;
}

function pseudoMovesForPiece(board, r, c) {
  const piece = board[r][c];
  if (!piece) return [];

  const { type, color } = piece;
  const moves = [];

  if (type === "pawn") {
    const dir = color === "white" ? -1 : 1;
    const start = color === "white" ? 6 : 1;
    if (inBounds(r + dir, c) && !board[r + dir][c]) {
      moves.push([r + dir, c]);
      if (r === start && !board[r + 2 * dir][c]) moves.push([r + 2 * dir, c]);
    }
    for (const dc of [-1, 1]) {
      const nr = r + dir;
      const nc = c + dc;
      if (inBounds(nr, nc) && board[nr][nc] && board[nr][nc].color !== color) {
        moves.push([nr, nc]);
      }
    }
    return moves;
  }

  if (type === "knight") {
    const deltas = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    for (const [dr, dc] of deltas) {
      const nr = r + dr;
      const nc = c + dc;
      if (!inBounds(nr, nc)) continue;
      const target = board[nr][nc];
      if (!target || target.color !== color) moves.push([nr, nc]);
    }
    return moves;
  }

  if (type === "bishop") return rayMoves(board, r, c, color, [[-1, -1], [-1, 1], [1, -1], [1, 1]]);
  if (type === "rook") return rayMoves(board, r, c, color, [[-1, 0], [1, 0], [0, -1], [0, 1]]);
  if (type === "queen") return rayMoves(board, r, c, color, [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]);

  if (type === "king") {
    for (let dr = -1; dr <= 1; dr += 1) {
      for (let dc = -1; dc <= 1; dc += 1) {
        if (dr === 0 && dc === 0) continue;
        const nr = r + dr;
        const nc = c + dc;
        if (!inBounds(nr, nc)) continue;
        const target = board[nr][nc];
        if (!target || target.color !== color) moves.push([nr, nc]);
      }
    }
    return moves;
  }

  return moves;
}

function findKing(board, color) {
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const p = board[r][c];
      if (p && p.type === "king" && p.color === color) return [r, c];
    }
  }
  throw new Error("king not found");
}

function isSquareAttacked(board, targetR, targetC, byColor) {
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const p = board[r][c];
      if (!p || p.color !== byColor) continue;
      const moves = pseudoMovesForPiece(board, r, c);
      if (moves.some(([mr, mc]) => mr === targetR && mc === targetC)) return true;
    }
  }
  return false;
}

function isInCheck(board, color) {
  const [kr, kc] = findKing(board, color);
  const enemy = color === "white" ? "black" : "white";
  return isSquareAttacked(board, kr, kc, enemy);
}

function applyMove(board, fromR, fromC, toR, toC) {
  const next = cloneBoard(board);
  next[toR][toC] = next[fromR][fromC];
  next[fromR][fromC] = null;

  const moved = next[toR][toC];
  if (moved.type === "pawn" && (toR === 0 || toR === 7)) {
    moved.type = "queen";
  }

  return next;
}

function legalMovesForPiece(board, r, c) {
  const piece = board[r][c];
  if (!piece) return [];

  const candidates = pseudoMovesForPiece(board, r, c);
  return candidates.filter(([toR, toC]) => {
    const next = applyMove(board, r, c, toR, toC);
    return !isInCheck(next, piece.color);
  });
}

function getAllLegalMoves(board, color) {
  const all = [];
  for (let r = 0; r < 8; r += 1) {
    for (let c = 0; c < 8; c += 1) {
      const p = board[r][c];
      if (!p || p.color !== color) continue;
      const moves = legalMovesForPiece(board, r, c);
      for (const [mr, mc] of moves) {
        all.push({ from: [r, c], to: [mr, mc] });
      }
    }
  }
  return all;
}

function computeStatus(board, turn) {
  const inCheck = isInCheck(board, turn);
  const legalMoves = getAllLegalMoves(board, turn);
  if (legalMoves.length > 0) {
    return inCheck ? "check" : "in_progress";
  }
  return inCheck ? "checkmate" : "stalemate";
}

function createGame() {
  let board = createInitialBoard();
  let turn = "white";
  let status = "in_progress";
  const history = [];

  function getLegalMoves(square) {
    const [r, c] = toPos(square);
    const piece = board[r][c];
    if (!piece) return [];
    if (piece.color !== turn) return [];
    return legalMovesForPiece(board, r, c).map(([mr, mc]) => toSquare(mr, mc));
  }

  function move(from, to) {
    if (status === "checkmate" || status === "stalemate") {
      throw new Error("game is already finished");
    }

    const [fromR, fromC] = toPos(from);
    const [toR, toC] = toPos(to);
    const piece = board[fromR][fromC];

    if (!piece) throw new Error("no piece on source square");
    if (piece.color !== turn) throw new Error("not your turn");

    const legalMoves = legalMovesForPiece(board, fromR, fromC);
    const legal = legalMoves.some(([r, c]) => r === toR && c === toC);
    if (!legal) throw new Error("illegal move");

    board = applyMove(board, fromR, fromC, toR, toC);
    history.push({ turn, from, to, piece: piece.type });
    turn = turn === "white" ? "black" : "white";
    status = computeStatus(board, turn);

    return getState();
  }

  function getState() {
    return {
      board: cloneBoard(board),
      turn,
      status,
      history: history.map((item) => ({ ...item })),
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