import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, Play } from "lucide-react";

interface Enemy {
  x: number;
  y: number;
  speed: number;
}

interface Bullet {
  x: number;
  y: number;
}

export const SpaceShooter = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("spaceHighScore") || "0");
  });

  const gameStateRef = useRef({
    playerX: 200,
    playerY: 500,
    enemies: [] as Enemy[],
    bullets: [] as Bullet[],
    keys: {} as Record<string, boolean>,
    animationId: 0,
    lastShot: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      gameStateRef.current.keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouch = (e: TouchEvent) => {
      if (!gameStarted || gameOver) return;
      e.preventDefault();
      
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = ((touch.clientX - rect.left) / rect.width) * canvas.width;
      
      gameStateRef.current.playerX = x;
      
      // Auto shoot on touch
      const now = Date.now();
      if (now - gameStateRef.current.lastShot > 200) {
        gameStateRef.current.bullets.push({
          x: gameStateRef.current.playerX,
          y: gameStateRef.current.playerY - 20,
        });
        gameStateRef.current.lastShot = now;
      }
    };

    canvas.addEventListener("touchmove", handleTouch);
    canvas.addEventListener("touchstart", handleTouch);

    return () => {
      canvas.removeEventListener("touchmove", handleTouch);
      canvas.removeEventListener("touchstart", handleTouch);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);

    const state = gameStateRef.current;
    state.playerX = 200;
    state.playerY = 500;
    state.enemies = [];
    state.bullets = [];
    state.keys = {};
    state.lastShot = 0;

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

    // Clear canvas with space background
    ctx.fillStyle = "#000814";
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 50; i++) {
      const x = (i * 37) % width;
      const y = (i * 53 + Date.now() * 0.05) % height;
      ctx.fillRect(x, y, 1, 1);
    }

    // Handle player movement
    if (state.keys["ArrowLeft"] && state.playerX > 20) {
      state.playerX -= 5;
    }
    if (state.keys["ArrowRight"] && state.playerX < width - 20) {
      state.playerX += 5;
    }
    if (state.keys[" "]) {
      const now = Date.now();
      if (now - state.lastShot > 200) {
        state.bullets.push({ x: state.playerX, y: state.playerY - 20 });
        state.lastShot = now;
      }
    }

    // Draw player ship
    ctx.fillStyle = "#00d4ff";
    ctx.beginPath();
    ctx.moveTo(state.playerX, state.playerY - 20);
    ctx.lineTo(state.playerX - 15, state.playerY + 10);
    ctx.lineTo(state.playerX + 15, state.playerY + 10);
    ctx.closePath();
    ctx.fill();

    // Draw cockpit
    ctx.fillStyle = "#ff00ff";
    ctx.beginPath();
    ctx.arc(state.playerX, state.playerY - 5, 5, 0, Math.PI * 2);
    ctx.fill();

    // Update and draw bullets
    for (let i = state.bullets.length - 1; i >= 0; i--) {
      const bullet = state.bullets[i];
      bullet.y -= 10;

      ctx.fillStyle = "#ffff00";
      ctx.fillRect(bullet.x - 2, bullet.y, 4, 10);

      if (bullet.y < 0) {
        state.bullets.splice(i, 1);
      }
    }

    // Spawn enemies
    if (Math.random() < 0.02) {
      state.enemies.push({
        x: Math.random() * (width - 40) + 20,
        y: -30,
        speed: 2 + Math.random() * 2,
      });
    }

    // Update and draw enemies
    for (let i = state.enemies.length - 1; i >= 0; i--) {
      const enemy = state.enemies[i];
      enemy.y += enemy.speed;

      // Draw enemy
      ctx.fillStyle = "#ff4444";
      ctx.beginPath();
      ctx.moveTo(enemy.x, enemy.y + 15);
      ctx.lineTo(enemy.x - 15, enemy.y - 15);
      ctx.lineTo(enemy.x + 15, enemy.y - 15);
      ctx.closePath();
      ctx.fill();

      // Draw enemy eyes
      ctx.fillStyle = "#fff";
      ctx.fillRect(enemy.x - 8, enemy.y - 5, 5, 5);
      ctx.fillRect(enemy.x + 3, enemy.y - 5, 5, 5);

      // Check bullet collision
      for (let j = state.bullets.length - 1; j >= 0; j--) {
        const bullet = state.bullets[j];
        const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y);
        if (dist < 20) {
          state.enemies.splice(i, 1);
          state.bullets.splice(j, 1);
          setScore((prev) => prev + 10);
          break;
        }
      }

      // Check player collision
      const playerDist = Math.hypot(enemy.x - state.playerX, enemy.y - state.playerY);
      if (playerDist < 25) {
        endGame();
        return;
      }

      // Remove off-screen enemies
      if (enemy.y > height + 30) {
        state.enemies.splice(i, 1);
      }
    }

    state.animationId = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);

    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("spaceHighScore", score.toString());
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
              <h2 className="text-2xl font-bold gradient-text mb-1">Space Shooter 🚀</h2>
              <p className="text-sm text-muted-foreground">Defend Earth from alien invaders!</p>
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
              className="w-full"
            />

            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold text-white mb-2">Ready for Battle? 🚀</h3>
                  <div className="text-white/90 space-y-2 mb-6">
                    <p className="text-sm">⬅️ ➡️ Move left/right</p>
                    <p className="text-sm">SPACE to shoot</p>
                    <p className="text-sm">📱 Touch to move & auto-shoot on mobile</p>
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
            <p>Arrow keys to move, SPACE to shoot</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
