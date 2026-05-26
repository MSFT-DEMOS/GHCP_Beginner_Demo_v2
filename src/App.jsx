import { useEffect, useRef, useState } from 'react';

const BOARD = {
  width: 960,
  height: 540,
  paddleWidth: 16,
  paddleHeight: 92,
  ballRadius: 10,
};

const INITIAL_BALL_SPEED = 6;
const PLAYER_X = 40;
const AI_X = BOARD.width - 56;
const WINNING_SCORE = 7;

function createBall(direction = 1) {
  return {
    x: BOARD.width / 2,
    y: BOARD.height / 2,
    velocityX: INITIAL_BALL_SPEED * direction,
    velocityY: 3.2,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function drawRoundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
  context.fill();
}

function drawBoard(context, gameState) {
  context.clearRect(0, 0, BOARD.width, BOARD.height);

  const tableGradient = context.createLinearGradient(0, 0, BOARD.width, BOARD.height);
  tableGradient.addColorStop(0, '#10231f');
  tableGradient.addColorStop(0.48, '#132b35');
  tableGradient.addColorStop(1, '#241d2f');
  context.fillStyle = tableGradient;
  context.fillRect(0, 0, BOARD.width, BOARD.height);

  context.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  context.lineWidth = 3;
  context.setLineDash([12, 18]);
  context.beginPath();
  context.moveTo(BOARD.width / 2, 28);
  context.lineTo(BOARD.width / 2, BOARD.height - 28);
  context.stroke();
  context.setLineDash([]);

  context.fillStyle = '#e9f8f0';
  context.shadowColor = 'rgba(83, 219, 143, 0.5)';
  context.shadowBlur = 18;
  drawRoundedRect(context, PLAYER_X, gameState.playerY, BOARD.paddleWidth, BOARD.paddleHeight, 8);

  context.shadowColor = 'rgba(93, 207, 255, 0.45)';
  drawRoundedRect(context, AI_X, gameState.aiY, BOARD.paddleWidth, BOARD.paddleHeight, 8);

  context.shadowColor = 'rgba(255, 227, 135, 0.65)';
  context.beginPath();
  context.arc(gameState.ball.x, gameState.ball.y, BOARD.ballRadius, 0, Math.PI * 2);
  context.fillStyle = '#ffe387';
  context.fill();
  context.shadowBlur = 0;

  context.fillStyle = 'rgba(255, 255, 255, 0.14)';
  context.font = '700 88px Inter, system-ui, sans-serif';
  context.textAlign = 'center';
  context.fillText(gameState.playerScore, BOARD.width / 2 - 130, 116);
  context.fillText(gameState.aiScore, BOARD.width / 2 + 130, 116);
}

function App() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const inputYRef = useRef(BOARD.height / 2);
  const keysRef = useRef({ up: false, down: false });
  const gameRef = useRef({
    playerY: BOARD.height / 2 - BOARD.paddleHeight / 2,
    aiY: BOARD.height / 2 - BOARD.paddleHeight / 2,
    ball: createBall(),
    playerScore: 0,
    aiScore: 0,
    message: 'First to 7 wins',
  });

  const [isRunning, setIsRunning] = useState(true);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [status, setStatus] = useState('First to 7 wins');

  // Demo TODO 1: Ask Copilot Chat to add a useState value for a ball speed slider.
  // Suggested prompt: Add React state for a Pong speed slider from 3 to 12 with a default of 6.

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    drawBoard(context, gameRef.current);
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
        keysRef.current.up = true;
      }
      if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
        keysRef.current.down = true;
      }
      if (event.code === 'Space') {
        setIsRunning((current) => !current);
      }
    }

    function handleKeyUp(event) {
      if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') {
        keysRef.current.up = false;
      }
      if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') {
        keysRef.current.down = false;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');

    function scorePoint(winner) {
      const game = gameRef.current;
      const nextPlayerScore = game.playerScore + (winner === 'player' ? 1 : 0);
      const nextAiScore = game.aiScore + (winner === 'ai' ? 1 : 0);
      const hasWinner = nextPlayerScore >= WINNING_SCORE || nextAiScore >= WINNING_SCORE;

      game.playerScore = nextPlayerScore;
      game.aiScore = nextAiScore;
      game.ball = createBall(winner === 'player' ? 1 : -1);
      game.message = hasWinner ? `${winner === 'player' ? 'You' : 'Copilot CPU'} won. Reset for a rematch.` : 'Nice rally. Keep going.';

      setScore({ player: nextPlayerScore, ai: nextAiScore });
      setStatus(game.message);

      if (hasWinner) {
        setIsRunning(false);
      }
    }

    function update() {
      const game = gameRef.current;
      const paddleSpeed = 9;

      if (keysRef.current.up) {
        inputYRef.current -= paddleSpeed;
      }
      if (keysRef.current.down) {
        inputYRef.current += paddleSpeed;
      }

      inputYRef.current = clamp(inputYRef.current, BOARD.paddleHeight / 2, BOARD.height - BOARD.paddleHeight / 2);
      game.playerY = clamp(inputYRef.current - BOARD.paddleHeight / 2, 18, BOARD.height - BOARD.paddleHeight - 18);

      const aiCenter = game.aiY + BOARD.paddleHeight / 2;
      const aiTarget = game.ball.y - aiCenter;
      game.aiY = clamp(game.aiY + clamp(aiTarget, -5.2, 5.2), 18, BOARD.height - BOARD.paddleHeight - 18);

      game.ball.x += game.ball.velocityX;
      game.ball.y += game.ball.velocityY;

      if (game.ball.y <= BOARD.ballRadius || game.ball.y >= BOARD.height - BOARD.ballRadius) {
        game.ball.velocityY *= -1;
      }

      const hitsPlayer = game.ball.x - BOARD.ballRadius <= PLAYER_X + BOARD.paddleWidth
        && game.ball.x > PLAYER_X
        && game.ball.y >= game.playerY
        && game.ball.y <= game.playerY + BOARD.paddleHeight;

      const hitsAi = game.ball.x + BOARD.ballRadius >= AI_X
        && game.ball.x < AI_X + BOARD.paddleWidth
        && game.ball.y >= game.aiY
        && game.ball.y <= game.aiY + BOARD.paddleHeight;

      if (hitsPlayer || hitsAi) {
        const paddleY = hitsPlayer ? game.playerY : game.aiY;
        const relativeImpact = (game.ball.y - (paddleY + BOARD.paddleHeight / 2)) / (BOARD.paddleHeight / 2);
        game.ball.velocityX *= -1.04;
        game.ball.velocityY = relativeImpact * 6.5;
      }

      // Demo TODO 2: After adding slider state, use it here to control ball velocity.
      // Hint for learners: keep the direction from velocityX, but replace the speed value.

      if (game.ball.x < -BOARD.ballRadius) {
        scorePoint('ai');
      }

      if (game.ball.x > BOARD.width + BOARD.ballRadius) {
        scorePoint('player');
      }

      drawBoard(context, game);
      animationRef.current = requestAnimationFrame(update);
    }

    if (isRunning) {
      animationRef.current = requestAnimationFrame(update);
    } else {
      drawBoard(context, gameRef.current);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning]);

  function handlePointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * BOARD.height;
    inputYRef.current = pointerY;
  }

  function resetGame() {
    gameRef.current = {
      playerY: BOARD.height / 2 - BOARD.paddleHeight / 2,
      aiY: BOARD.height / 2 - BOARD.paddleHeight / 2,
      ball: createBall(),
      playerScore: 0,
      aiScore: 0,
      message: 'First to 7 wins',
    };
    inputYRef.current = BOARD.height / 2;
    setScore({ player: 0, ai: 0 });
    setStatus('First to 7 wins');
    setIsRunning(true);
  }

  return (
    <main className="app-shell">
      <section className="scorebar" aria-label="Game score and controls">
        <div className="score-block">
          <span className="score-label">Player</span>
          <strong>{score.player}</strong>
        </div>
        <p className="status-text" aria-live="polite">{status}</p>
        <div className="score-block score-block-right">
          <span className="score-label">Copilot CPU</span>
          <strong>{score.ai}</strong>
        </div>
      </section>

      <section className="game-stage" aria-label="Classic Pong game">
        <canvas
          ref={canvasRef}
          width={BOARD.width}
          height={BOARD.height}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
        />
      </section>

      <section className="controls" aria-label="Game controls">
        <button type="button" onClick={() => setIsRunning((current) => !current)}>
          {isRunning ? 'Pause' : 'Play'}
        </button>
        <button type="button" className="secondary" onClick={resetGame}>Reset</button>

        {/*
          Demo TODO 3: Add the speed adjustment slider here during the live demo.
          Suggested prompt: Create an accessible slider labeled Ball speed and wire it to the speed state.
        */}
      </section>
    </main>
  );
}

export default App;
