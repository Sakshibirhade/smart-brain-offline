import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, Play } from "lucide-react";

interface Pipe {
  x: number;
  gap: number;
  gapY: number;
  passed: boolean;
}

export const FlappyBird = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("flappyHighScore") || "0");
  });

  const gameStateRef = useRef({
    birdY: 250,
    birdVelocity: 0,
    gravity: 0.5,
    jumpStrength: -8,
    pipes: [] as Pipe[],
    animationId: 0,
  });

  const jump = () => {
    if (!gameStarted || gameOver) return;
    gameStateRef.current.birdVelocity = gameStateRef.current.jumpStrength;
  };

  useEffect(() => {
    const handleClick = () => jump();
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);

    const state = gameStateRef.current;
    state.birdY = 250;
    state.birdVelocity = 0;
    state.pipes = [
      { x: 400, gap: 150, gapY: 200, passed: false },
      { x: 650, gap: 150, gapY: 250, passed: false },
    ];

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
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, width, height);

    // Update bird physics
    state.birdVelocity += state.gravity;
    state.birdY += state.birdVelocity;

    // Draw bird
    const birdSize = 30;
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(80, state.birdY, birdSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Bird eye
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(85, state.birdY - 3, 3, 0, Math.PI * 2);
    ctx.fill();

    // Bird beak
    ctx.fillStyle = "#FF6347";
    ctx.beginPath();
    ctx.moveTo(95, state.birdY);
    ctx.lineTo(105, state.birdY);
    ctx.lineTo(95, state.birdY + 5);
    ctx.fill();

    // Check ground/ceiling collision
    if (state.birdY - birdSize / 2 < 0 || state.birdY + birdSize / 2 > height) {
      endGame();
      return;
    }

    // Update and draw pipes
    const pipeWidth = 60;
    for (let i = state.pipes.length - 1; i >= 0; i--) {
      const pipe = state.pipes[i];
      pipe.x -= 3;

      // Draw top pipe
      ctx.fillStyle = "#228B22";
      ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapY - pipe.gap / 2);
      ctx.strokeStyle = "#006400";
      ctx.lineWidth = 3;
      ctx.strokeRect(pipe.x, 0, pipeWidth, pipe.gapY - pipe.gap / 2);

      // Draw bottom pipe
      ctx.fillRect(pipe.x, pipe.gapY + pipe.gap / 2, pipeWidth, height);
      ctx.strokeRect(pipe.x, pipe.gapY + pipe.gap / 2, pipeWidth, height);

      // Check collision
      if (
        80 + birdSize / 2 > pipe.x &&
        80 - birdSize / 2 < pipe.x + pipeWidth
      ) {
        if (
          state.birdY - birdSize / 2 < pipe.gapY - pipe.gap / 2 ||
          state.birdY + birdSize / 2 > pipe.gapY + pipe.gap / 2
        ) {
          endGame();
          return;
        }

        // Score point
        if (!pipe.passed && 80 > pipe.x + pipeWidth) {
          pipe.passed = true;
          setScore((prev) => prev + 1);
        }
      }

      // Remove off-screen pipes
      if (pipe.x + pipeWidth < 0) {
        state.pipes.splice(i, 1);
      }
    }

    // Add new pipes
    if (state.pipes.length < 3 && state.pipes[state.pipes.length - 1].x < width - 250) {
      state.pipes.push({
        x: width,
        gap: 150,
        gapY: Math.random() * 200 + 150,
        passed: false,
      });
    }

    state.animationId = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("flappyHighScore", score.toString());
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
              <h2 className="text-2xl font-bold gradient-text mb-1">Flappy Bird 🐦</h2>
              <p className="text-sm text-muted-foreground">Tap to fly through the pipes!</p>
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
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-inner border-2 border-primary/20">
            <canvas
              ref={canvasRef}
              width={400}
              height={600}
              className="w-full cursor-pointer"
            />

            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold text-white mb-2">Ready to Fly? 🐦</h3>
                  <div className="text-white/90 space-y-2 mb-6">
                    <p className="text-sm">Click or press SPACE to fly</p>
                    <p className="text-sm">Avoid the pipes!</p>
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
                  <h3 className="text-4xl font-bold text-white mb-2">Game Over! 🎮</h3>
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
            <p>Click anywhere or press SPACE to fly</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
