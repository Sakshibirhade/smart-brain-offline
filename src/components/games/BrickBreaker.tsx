import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, Play, Heart } from "lucide-react";

interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  color: string;
}

export const BrickBreaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("brickHighScore") || "0");
  });

  const gameStateRef = useRef({
    paddleX: 175,
    paddleWidth: 80,
    paddleHeight: 12,
    ballX: 200,
    ballY: 400,
    ballDX: 4,
    ballDY: -4,
    ballRadius: 8,
    bricks: [] as Brick[],
    animationId: 0,
  });

  const initBricks = () => {
    const bricks: Brick[] = [];
    const rows = 5;
    const cols = 7;
    const brickWidth = 50;
    const brickHeight = 20;
    const padding = 5;
    const offsetX = 15;
    const offsetY = 50;

    const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#ee5a6f"];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        bricks.push({
          x: offsetX + col * (brickWidth + padding),
          y: offsetY + row * (brickHeight + padding),
          width: brickWidth,
          height: brickHeight,
          health: rows - row,
          color: colors[row],
        });
      }
    }
    return bricks;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!gameStarted || gameOver) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      gameStateRef.current.paddleX = Math.max(
        0,
        Math.min(x - gameStateRef.current.paddleWidth / 2, canvas.width - gameStateRef.current.paddleWidth)
      );
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!gameStarted || gameOver) return;
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * canvas.width;
      gameStateRef.current.paddleX = Math.max(
        0,
        Math.min(x - gameStateRef.current.paddleWidth / 2, canvas.width - gameStateRef.current.paddleWidth)
      );
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);

    const state = gameStateRef.current;
    state.paddleX = 175;
    state.ballX = 200;
    state.ballY = 400;
    state.ballDX = 4;
    state.ballDY = -4;
    state.bricks = initBricks();

    gameLoop();
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = gameStateRef.current;
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, width, height);

    // Draw paddle
    const gradient = ctx.createLinearGradient(0, height - 50, 0, height - 38);
    gradient.addColorStop(0, "#00d4ff");
    gradient.addColorStop(1, "#0077ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(state.paddleX, height - 50, state.paddleWidth, state.paddleHeight);
    ctx.strokeStyle = "#00ffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(state.paddleX, height - 50, state.paddleWidth, state.paddleHeight);

    // Update ball position
    state.ballX += state.ballDX;
    state.ballY += state.ballDY;

    // Ball collision with walls
    if (state.ballX + state.ballRadius > width || state.ballX - state.ballRadius < 0) {
      state.ballDX = -state.ballDX;
    }
    if (state.ballY - state.ballRadius < 0) {
      state.ballDY = -state.ballDY;
    }

    // Ball collision with paddle
    if (
      state.ballY + state.ballRadius > height - 50 &&
      state.ballY + state.ballRadius < height - 38 &&
      state.ballX > state.paddleX &&
      state.ballX < state.paddleX + state.paddleWidth
    ) {
      // Add some angle based on where the ball hits the paddle
      const hitPos = (state.ballX - state.paddleX) / state.paddleWidth;
      const angle = (hitPos - 0.5) * Math.PI / 3;
      const speed = Math.sqrt(state.ballDX * state.ballDX + state.ballDY * state.ballDY);
      state.ballDX = speed * Math.sin(angle);
      state.ballDY = -Math.abs(speed * Math.cos(angle));
    }

    // Ball falls below paddle
    if (state.ballY - state.ballRadius > height) {
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          endGame();
        } else {
          // Reset ball
          state.ballX = 200;
          state.ballY = 400;
          state.ballDX = 4;
          state.ballDY = -4;
        }
        return newLives;
      });
    }

    // Draw ball
    ctx.fillStyle = "#ffff00";
    ctx.beginPath();
    ctx.arc(state.ballX, state.ballY, state.ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ff9500";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw and check bricks
    for (let i = state.bricks.length - 1; i >= 0; i--) {
      const brick = state.bricks[i];

      // Draw brick
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);

      // Draw health indicator
      if (brick.health > 1) {
        ctx.fillStyle = "#fff";
        ctx.font = "12px Arial";
        ctx.fillText(brick.health.toString(), brick.x + brick.width / 2 - 4, brick.y + brick.height / 2 + 4);
      }

      // Ball collision with brick
      if (
        state.ballX + state.ballRadius > brick.x &&
        state.ballX - state.ballRadius < brick.x + brick.width &&
        state.ballY + state.ballRadius > brick.y &&
        state.ballY - state.ballRadius < brick.y + brick.height
      ) {
        state.ballDY = -state.ballDY;
        brick.health--;

        if (brick.health <= 0) {
          state.bricks.splice(i, 1);
          setScore((prev) => prev + 10);
        } else {
          setScore((prev) => prev + 5);
        }
      }
    }

    // Check win condition
    if (state.bricks.length === 0) {
      endGame(true);
      return;
    }

    state.animationId = requestAnimationFrame(gameLoop);
  };

  const endGame = (won = false) => {
    setGameOver(true);
    setGameStarted(false);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("brickHighScore", score.toString());
    }

    if (gameStateRef.current.animationId) {
      cancelAnimationFrame(gameStateRef.current.animationId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <Card className="glass-effect border-2 border-primary/30 shadow-glow">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-1">Brick Breaker 🧱</h2>
              <p className="text-sm text-muted-foreground">Break all the bricks!</p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-bold">{highScore}</span>
              </div>
              <p className="text-xs text-muted-foreground">High Score</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2 text-lg">
              Score: <span className="font-bold ml-1">{score}</span>
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg flex items-center gap-1">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="font-bold">{lives}</span>
            </Badge>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-inner border-2 border-primary/20">
            <canvas
              ref={canvasRef}
              width={400}
              height={600}
              className="w-full"
            />

            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold text-white mb-2">Ready to Break Bricks? 🧱</h3>
                  <div className="text-white/90 space-y-2 mb-6">
                    <p className="text-sm">Move your mouse or finger to control the paddle</p>
                    <p className="text-sm">Break all bricks to win!</p>
                    <p className="text-sm">Different colored bricks need multiple hits</p>
                  </div>
                  <Button
                    onClick={startGame}
                    size="lg"
                    className="bg-gradient-primary shadow-glow hover:scale-105 transition-transform"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Game
                  </Button>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                <div className="text-center space-y-4 p-6 rounded-xl bg-background/20">
                  <h3 className="text-4xl font-bold text-white mb-2">
                    {lives > 0 ? "Victory! 🎉" : "Game Over! 🎮"}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-2xl text-white">
                      Score: <span className="font-bold text-yellow-400">{score}</span>
                    </p>
                    {score >= highScore && score > 0 && (
                      <Badge className="bg-yellow-500 text-black mt-2">🏆 New High Score!</Badge>
                    )}
                  </div>
                  <Button
                    onClick={startGame}
                    size="lg"
                    className="bg-gradient-primary shadow-glow hover:scale-105 transition-transform"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Play Again
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Move your mouse or touch to control the paddle</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
