/**
 * Reference solution for Project 01.
 */

const PRECEDENCE = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

const OPERATORS = new Set(Object.keys(PRECEDENCE));

function isDigit(ch) {
  return ch >= "0" && ch <= "9";
}

function tokenize(expression) {
  if (typeof expression !== "string") {
    throw new TypeError("expression must be a string");
  }

  const input = expression.trim();
  if (input.length === 0) {
    throw new Error("expression cannot be empty");
  }

  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (ch === " ") {
      i += 1;
      continue;
    }

    if (ch === "(" || ch === ")") {
      tokens.push(ch);
      i += 1;
      continue;
    }

    if (OPERATORS.has(ch)) {
      const prev = tokens[tokens.length - 1];
      const unaryMinus = ch === "-" && (tokens.length === 0 || prev === "(" || OPERATORS.has(prev));

      if (unaryMinus) {
        let num = "-";
        i += 1;
        while (i < input.length && (isDigit(input[i]) || input[i] === ".")) {
          num += input[i];
          i += 1;
        }

        if (num === "-" || num === "-.") {
          throw new Error("invalid unary minus usage");
        }

        const parsed = Number(num);
        if (!Number.isFinite(parsed)) {
          throw new Error("invalid number token");
        }

        tokens.push(parsed);
        continue;
      }

      tokens.push(ch);
      i += 1;
      continue;
    }

    if (isDigit(ch) || ch === ".") {
      let num = "";
      while (i < input.length && (isDigit(input[i]) || input[i] === ".")) {
        num += input[i];
        i += 1;
      }

      if (num === ".") {
        throw new Error("invalid number token");
      }

      const parsed = Number(num);
      if (!Number.isFinite(parsed)) {
        throw new Error("invalid number token");
      }

      tokens.push(parsed);
      continue;
    }

    throw new Error(`unsupported token: ${ch}`);
  }

  return tokens;
}

function validateTokenFlow(tokens) {
  let balance = 0;
  let prevType = "start";

  for (const token of tokens) {
    const isNum = typeof token === "number";

    if (token === "(") {
      if (prevType === "number" || prevType === "close") {
        throw new Error("missing operator before '('");
      }
      balance += 1;
      prevType = "open";
      continue;
    }

    if (token === ")") {
      if (prevType === "operator" || prevType === "open" || prevType === "start") {
        throw new Error("invalid ')' placement");
      }
      balance -= 1;
      if (balance < 0) {
        throw new Error("unbalanced parentheses");
      }
      prevType = "close";
      continue;
    }

    if (OPERATORS.has(token)) {
      if (prevType === "operator" || prevType === "open" || prevType === "start") {
        throw new Error("invalid operator placement");
      }
      prevType = "operator";
      continue;
    }

    if (isNum) {
      if (prevType === "number" || prevType === "close") {
        throw new Error("missing operator between values");
      }
      prevType = "number";
      continue;
    }

    throw new Error("invalid token stream");
  }

  if (balance !== 0) {
    throw new Error("unbalanced parentheses");
  }

  if (prevType === "operator" || prevType === "open") {
    throw new Error("expression cannot end with operator/open parenthesis");
  }
}

function toRpn(tokens) {
  validateTokenFlow(tokens);

  const output = [];
  const stack = [];

  for (const token of tokens) {
    if (typeof token === "number") {
      output.push(token);
      continue;
    }

    if (OPERATORS.has(token)) {
      while (
        stack.length > 0 &&
        OPERATORS.has(stack[stack.length - 1]) &&
        PRECEDENCE[stack[stack.length - 1]] >= PRECEDENCE[token]
      ) {
        output.push(stack.pop());
      }

      stack.push(token);
      continue;
    }

    if (token === "(") {
      stack.push(token);
      continue;
    }

    if (token === ")") {
      while (stack.length > 0 && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }

      if (stack.length === 0 || stack[stack.length - 1] !== "(") {
        throw new Error("unbalanced parentheses");
      }

      stack.pop();
    }
  }

  while (stack.length > 0) {
    const op = stack.pop();
    if (op === "(" || op === ")") {
      throw new Error("unbalanced parentheses");
    }
    output.push(op);
  }

  return output;
}

function applyOperator(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") {
    if (b === 0) throw new Error("division by zero");
    return a / b;
  }
  throw new Error("unknown operator");
}

function evaluateRpn(rpnTokens) {
  if (!Array.isArray(rpnTokens)) {
    throw new TypeError("rpnTokens must be an array");
  }

  const stack = [];

  for (const token of rpnTokens) {
    if (typeof token === "number") {
      stack.push(token);
      continue;
    }

    if (!OPERATORS.has(token)) {
      throw new Error("invalid rpn token");
    }

    if (stack.length < 2) {
      throw new Error("malformed expression");
    }

    const b = stack.pop();
    const a = stack.pop();
    stack.push(applyOperator(a, b, token));
  }

  if (stack.length !== 1 || !Number.isFinite(stack[0])) {
    throw new Error("malformed expression");
  }

  return Number(stack[0].toFixed(10));
}

function evaluateExpression(expression) {
  const tokens = tokenize(expression);
  const rpn = toRpn(tokens);
  return evaluateRpn(rpn);
}

module.exports = {
  tokenize,
  toRpn,
  evaluateRpn,
  evaluateExpression,
};