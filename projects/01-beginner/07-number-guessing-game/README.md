# Number Guessing Game

## Quick Start

Build a state-based guessing game where players try to find a secret number within a limit. You'll implement game initialization, guess validation, feedback (too high/too low), win/loss detection, and game history. This teaches **state management, game loops, input validation, and conditional logic**.

**Difficulty:** 🟢 Beginner | **Time:** 5–7 hours | **Core Skills:** Objects, Functions, Conditionals, Game Logic

---

## Prerequisites

Before starting, complete these fundamentals lessons:

1. **01-Variables** – understand variable scope and state
2. **02-Data-Types** – work with numbers, strings, objects, booleans
3. **03-Operators** – comparison operators (<, >, ===, etc.)
4. **04-Control-Flow** – if/else conditionals for branching logic
5. **05-Loops** – understand why games use loops (repeated actions)
6. **06-Functions-Basics** – write functions with parameters and returns
7. **08-Objects-Basics** – create and modify objects to hold game state

_New students: If you haven't worked with objects to represent application state, review lesson 8 first._

---

## Visualize The Product

A simple guessing game with feedback and attempt tracking:

```
Player: "Guess a number 1-100. You have 10 attempts."
Attempt 1: Player guesses 50
Game: "Too high! Try lower."

Attempt 2: Player guesses 25
Game: "Too low! Try higher."

Attempt 3: Player guesses 37
Game: "Too high! Try lower."

Attempt 4: Player guesses 33
Game: "Correct! You won in 4 attempts!"
```

Your code manages:
- Secret number (hidden until won or lost)
- Attempt counter (track tries remaining)
- Guess validation (is it in valid range?)
- Feedback (higher/lower/correct)
- Win/loss state (game over conditions)

---

## Real-World Use Cases

- **Browser Games** – Web-based guessing games, educational games
- **Game Engines** – Core logic pattern for turn-based games
- **Training Apps** – Gamified learning with scoring and attempts
- **AI Testing** – Binary search algorithms for game-playing bots
- **Quiz Platforms** – Adaptive difficulty based on user performance

---

## Project Aim

Build testable game logic where state changes are explicit and randomness is controllable (for testing).

### The Problem
Games need:
- **Stateful**: Track whose turn, what's the score, game over or not?
- **Deterministic testing**: Random number should be injectable so tests don't fail randomly
- **Validated input**: Reject out-of-range guesses with clear errors
- **Clear feedback**: Tell player if they're getting warmer/colder

Most games mix UI (console, buttons) with logic. This makes testing hard.

### The Solution: Pure Game Logic
```
Approach:
1. Separate game logic from UI
2. Create game objects that hold all state
3. Make all state changes explicit (functions that modify state)
4. Allow secret number injection for testing (not just random)
5. Return structured feedback from each guess
```

### Key Insight
**Testable games have injectable state.** Instead of `Math.random()`, accept `secretNumber` parameter. Tests pass a known number; production uses random.

---

## Core Concepts You Must Learn

- **Game State**: Objects that hold all game data (secret, attempts, won status, history)
  Why? Games are stateful. You need to track whose turn it is, what happened, what's left to do.

- **State Transitions**: Moving from one game state to another (awaiting guess → processing → awaiting next)
  Why? Games have phases. Validating makes illegal transitions impossible.

- **Input Validation**: Ensuring guesses are in valid range before processing
  Why? Garbage input should error clearly, not crash or misbehave.

- **Feedback Generation**: Returning meaningful info (too high, too low, correct) not just true/false
  Why? Players need guidance. Computers need structured data to make decisions.

- **Game Termination**: Detecting win/loss and preventing further moves
  Why? Games must end. Continuing after game-over breaks physics.

---

## Accuracy Traps To Avoid

### Trap 1: Mixing UI and Logic
**What happens:** Game checks `console.log` for player input; testing is impossible.
```javascript
// WRONG:
function makeGuess() {
  const guess = readline.question("Guess: ");  // Hard to test!
}
```
**The Fix:** Logic functions receive data as parameters, return results:
```javascript
// RIGHT:
function makeGuess(game, guess) {
  return { result: "too-low", message: "Try higher" };
}
```

### Trap 2: Using true randomness in testable code
**What happens:** `Math.random()` makes secret unpredictable; tests fail randomly.
```javascript
// WRONG:
function createGame() {
  this.secret = Math.floor(Math.random() * 100) + 1;  // Can't control!
}
```
**The Fix:** Accept `secretNumber` parameter; use random only if not provided:
```javascript
// RIGHT:
function createGame(min = 1, max = 100, secretNumber = null) {
  this.secret = secretNumber !== null ? secretNumber : Math.floor(Math.random() * (max - min + 1)) + min;
}
```

### Trap 3: Not tracking game state explicitly
**What happens:** You have `attempts` counter but forget `won` flag; can't tell if game is over.
```javascript
// WRONG:
if (attempts >= 10) { /* game over */ }  // But what if they guessed correctly at attempt 5?
```
**The Fix:** Explicit flags:
```javascript
// RIGHT:
{ attempts: 7, maxAttempts: 10, won: true, lost: false }
```

### Trap 4: Modifying guess without validating
**What happens:** Player guesses "abc", you try `parseInt("abc")` = `NaN`, then compare NaN < secret (always false).
**The Fix:** Validate before processing:
```javascript
const guessNum = parseInt(guess);
if (isNaN(guessNum) || guessNum < min || guessNum > max) {
  throw new Error(`Guess must be ${min}-${max}`);
}
```

### Trap 5: Continuing game after win/loss
**What happens:** Player wins, can still make more guesses and change the outcome.
**The Fix:** Check game status at start:
```javascript
function makeGuess(game, guess) {
  if (game.won || game.attempts >= game.maxAttempts) {
    throw new Error("Game is over");
  }
  // ... process guess
}
```

---

## Quality Checks

Your solution must pass ALL of these:

- ✅ `createGame()` returns object with `secret`, `attempts`, `maxAttempts`, `won`, `lost` properties (or equivalent)
- ✅ `createGame(1, 100, 42)` sets secret to 42 (injectable for testing)
- ✅ `makeGuess(game, 50)` returns feedback object with `result` field ("too-low", "too-high", or "correct")
- ✅ After correct guess, `isGameWon(game)` returns true
- ✅ After 10 wrong guesses, `isGameLost(game)` returns true
- ✅ `makeGuess(game, 150)` throws error (out of range 1-100)
- ✅ `makeGuess(game, "abc")` throws error (not a valid number)
- ✅ Can't make guesses after winning or losing (throws error)
- ✅ `getGameState(game)` returns current state (attempts, won, lost flags)
- ✅ `getHints(game)` returns history of previous guesses

All checks must work with identical results on repeated runs (deterministic).

---

## How To Run

Run all commands from the repository root.

### Test Your Starter Code

```bash
node -e "const m=require('./projects/01-beginner/07-number-guessing-game/src'); console.log('Exports:', Object.keys(m));"
```

**Expected Output:**
```
Exports: [ 'createGame', 'makeGuess', 'isGameWon', 'isGameLost', 'getGameState', 'getHints', 'createProject' ]
```

### Test Game Creation With Known Secret

```bash
node -e "const m=require('./projects/01-beginner/07-number-guessing-game/src'); const game=m.createGame(1,100,42); console.log('Game created, secret is 42');"
```

**Expected Output:**
```
Game created, secret is 42
```

### Test a Guess (Too High)

```bash
node -e "const m=require('./projects/01-beginner/07-number-guessing-game/src'); const game=m.createGame(1,100,42); const result=m.makeGuess(game,50); console.log('Guess 50:', result);"
```

**Expected Output:**
```
Guess 50: { result: 'too-high', message: 'too-high' }
```

### Test Winning

```bash
node -e "const m=require('./projects/01-beginner/07-number-guessing-game/src'); const game=m.createGame(1,100,42); m.makeGuess(game,42); console.log('Won:', m.isGameWon(game));"
```

**Expected Output:**
```
Won: true
```

### Test Invalid Guess

```bash
node -e "const m=require('./projects/01-beginner/07-number-guessing-game/src'); const game=m.createGame(1,100,42); try { m.makeGuess(game,999); } catch(e) { console.log('Error:', e.message); }"
```

**Expected Output:**
```
Error: Guess must be 1-100
```

---

## Learning Tips

### Tip 1: Start With Game State Object
**Strategy:** Define the object structure first:
```javascript
function createGame(min = 1, max = 100, secretNumber = null) {
  return {
    min,
    max,
    secret: secretNumber || Math.floor(Math.random() * (max - min + 1)) + min,
    attempts: 0,
    maxAttempts: 10,
    won: false,
    guesses: []
  };
}
```
Don't implement other functions until this returns the right structure.

### Tip 2: Test With Injected Secrets First
**Strategy:** Create games with known values, test logic without randomness:
```javascript
const game = createGame(1, 100, 42);  // Always 42
console.log(game.secret === 42);       // Should be true
```

### Tip 3: Implement Guess Validation Early
**Strategy:** Before processing logic, ensure guess is valid:
```javascript
function makeGuess(game, guess) {
  const num = parseInt(guess);
  if (isNaN(num) || num < game.min || num > game.max) {
    throw new Error(`Guess must be ${game.min}-${game.max}`);
  }
  // Now process valid guess
}
```

### Tip 4: Use Clear Result Codes
**Strategy:** Return structured feedback, not just true/false:
```javascript
// WRONG:
return game.secret === guess;  // true or false, not helpful

// RIGHT:
if (guess === game.secret) return { result: 'correct', message: 'You won!' };
if (guess < game.secret) return { result: 'too-low', message: 'Try higher' };
return { result: 'too-high', message: 'Try lower' };
```

### Tip 5: Model Game Endings Explicitly
**Strategy:** Check win/loss at function start:
```javascript
function makeGuess(game, guess) {
  if (game.won || game.attempts >= game.maxAttempts) {
    throw new Error("Game is over");
  }
  // ... process guess
}
```

---

## Interview Narrative

> "Tell me about a time you designed game logic or state management."

**Problem:**
Games are stateful systems. A guessing game needs to:
- Track the secret number and attempts
- Validate player input
- Provide feedback (you're getting closer)
- Detect win/loss conditions
- Prevent continued play after game ends

But testing is hard if logic is mixed with UI or if randomness is uncontrollable.

**Solution:**
I separated game logic from UI and designed a testable state object:
1. `createGame()` returns explicit state { secret, attempts, maxAttempts, won, lost }
2. Secret number is injectable (for testing) or random (for production)
3. `makeGuess()` validates input, updates state, returns structured feedback
4. Win/loss detection is explicit (can't miss edge cases)

**Technical Approach:**
- Modeled game state as a plain object
- Made all state changes explicit through functions
- Allowed secret injection for testability
- Returned structured feedback objects
- Enforced game-over rules before allowing new moves

**Outcome:**
The logic is fully testable without hacking around randomness. Tests pass known values, production uses `Math.random()`. Same code, different inputs.

**Key Lesson:**
Separate logic from presentation. Good design makes testing natural, not painful.

---

## Acceptance Criteria Checklist

- [ ] All 7 functions export and are callable
- [ ] All 10 quality checks pass
- [ ] Game state object has all required properties
- [ ] `createGame()` accepts `secretNumber` parameter for testing
- [ ] `makeGuess()` validates guess range and type
- [ ] Win condition: correct guess sets `won: true`
- [ ] Loss condition: 10 wrong guesses sets `lost: true`
- [ ] Can't play after game-over (throws error)
- [ ] Feedback includes "too-high" / "too-low" / "correct"
- [ ] You wrote explanation of your game state design
- [ ] You ran at least 5 test cases from "How To Run" section
