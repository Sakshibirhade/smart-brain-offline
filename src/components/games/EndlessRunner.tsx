import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, Play } from "lucide-react";

type Lane = 0 | 1 | 2; // Left, Center, Right

interface Obstacle {
  lane: Lane;
  position: number;
  type: "barrier" | "coin";
}

export const EndlessRunner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("runnerHighScore") || "0");
  });

  const gameStateRef = useRef({
    playerLane: 1 as Lane,
    isJumping: false,
    jumpHeight: 0,
    obstacles: [] as Obstacle[],
    speed: 5,
    distance: 0,
    animationId: 0,
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;
      
      const state = gameStateRef.current;
      
      if (e.key === "ArrowLeft" && state.playerLane > 0) {
        state.playerLane = (state.playerLane - 1) as Lane;
      } else if (e.key === "ArrowRight" && state.playerLane < 2) {
        state.playerLane = (state.playerLane + 1) as Lane;
      } else if (e.key === "ArrowUp" && !state.isJumping) {
        state.isJumping = true;
        state.jumpHeight = 0;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver]);

  // Touch controls for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!gameStarted || gameOver) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      const state = gameStateRef.current;

      // Horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50 && state.playerLane < 2) {
          state.playerLane = (state.playerLane + 1) as Lane;
        } else if (deltaX < -50 && state.playerLane > 0) {
          state.playerLane = (state.playerLane - 1) as Lane;
        }
      } 
      // Vertical swipe up for jump
      else if (deltaY < -50 && !state.isJumping) {
        state.isJumping = true;
        state.jumpHeight = 0;
      }
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCoins(0);
    
    const state = gameStateRef.current;
    state.playerLane = 1;
    state.isJumping = false;
    state.jumpHeight = 0;
    state.obstacles = [];
    state.speed = 5;
    state.distance = 0;
    
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

    // Draw road
    const laneWidth = width / 3;
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2;
    
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.setLineDash([20, 15]);
      ctx.moveTo(i * laneWidth, 0);
      ctx.lineTo(i * laneWidth, height);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Update jump
    if (state.isJumping) {
      state.jumpHeight += 15;
      if (state.jumpHeight > 120) {
        state.isJumping = false;
        state.jumpHeight = 120;
      }
    } else if (state.jumpHeight > 0) {
      state.jumpHeight -= 15;
      if (state.jumpHeight < 0) state.jumpHeight = 0;
    }

    // Draw player
    const playerX = state.playerLane * laneWidth + laneWidth / 2;
    const playerY = height - 150 - state.jumpHeight;
    const playerSize = 40;

    // Player shadow when jumping
    if (state.jumpHeight > 0) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.beginPath();
      ctx.ellipse(playerX, height - 150, playerSize / 2, 10, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw player (blue cube)
    ctx.fillStyle = "#00d4ff";
    ctx.fillRect(playerX - playerSize / 2, playerY - playerSize / 2, playerSize, playerSize);
    
    // Player face
    ctx.fillStyle = "#fff";
    ctx.fillRect(playerX - 10, playerY - 5, 5, 5);
    ctx.fillRect(playerX + 5, playerY - 5, 5, 5);

    // Update obstacles
    state.distance += state.speed;
    
    // Add new obstacles
    if (state.obstacles.length === 0 || state.obstacles[state.obstacles.length - 1].position > 150) {
      const shouldAddCoin = Math.random() > 0.6;
      const lane = Math.floor(Math.random() * 3) as Lane;
      
      state.obstacles.push({
        lane,
        position: -50,
        type: shouldAddCoin ? "coin" : "barrier",
      });
    }

    // Draw and update obstacles
    for (let i = state.obstacles.length - 1; i >= 0; i--) {
      const obstacle = state.obstacles[i];
      obstacle.position += state.speed;

      const obstacleX = obstacle.lane * laneWidth + laneWidth / 2;
      const obstacleY = obstacle.position;

      if (obstacle.type === "coin") {
        // Draw coin
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(obstacleX, obstacleY, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#FFA500";
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // Draw barrier
        ctx.fillStyle = "#ff4444";
        ctx.fillRect(obstacleX - 30, obstacleY - 20, 60, 40);
        ctx.fillStyle = "#fff";
        ctx.fillRect(obstacleX - 25, obstacleY - 15, 10, 10);
        ctx.fillRect(obstacleX + 15, obstacleY - 15, 10, 10);
      }

      // Check collision
      const distance = Math.abs(obstacleY - (height - 150 - state.jumpHeight));
      const sameRow = obstacle.lane === state.playerLane;
      
      if (distance < 40 && sameRow) {
        if (obstacle.type === "coin") {
          // Collect coin
          setCoins(prev => prev + 1);
          setScore(prev => prev + 10);
          state.obstacles.splice(i, 1);
        } else if (state.jumpHeight < 30) {
          // Hit barrier - game over
          endGame();
          return;
        }
      }

      // Remove off-screen obstacles
      if (obstacle.position > height) {
        state.obstacles.splice(i, 1);
        if (obstacle.type === "barrier") {
          setScore(prev => prev + 5);
        }
      }
    }

    // Increase speed gradually
    if (state.distance % 1000 < state.speed) {
      state.speed += 0.1;
    }

    state.animationId = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("runnerHighScore", score.toString());
    }
    
    if (gameStateRef.current.animationId) {
      cancelAnimationFrame(gameStateRef.current.animationId);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <Card className="glass-effect border-2 border-primary/30 shadow-glow">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-1">Endless Runner 🏃</h2>
              <p className="text-sm text-muted-foreground">Dodge obstacles and collect coins!</p>
            </div>
            <div className="text-right space-y-1">
              <div className="flex items-center gap-2 justify-end">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-lg font-bold">{highScore}</span>
              </div>
              <p className="text-xs text-muted-foreground">High Score</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2 text-lg">
              Score: <span className="font-bold ml-1">{score}</span>
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-lg">
              💰 <span className="font-bold ml-1">{coins}</span>
            </Badge>
          </div>

          {/* Game Canvas */}
          <div className="relative rounded-xl overflow-hidden shadow-inner border-2 border-primary/20">
            <canvas
              ref={canvasRef}
              width={360}
              height={600}
              className="w-full bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900"
            />
            
            {/* Overlay messages */}
            {!gameStarted && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold text-white mb-2">Ready to Run? 🏃‍♂️</h3>
                  <div className="text-white/90 space-y-2 mb-6">
                    <p className="text-sm">⬅️ ➡️ Change lanes</p>
                    <p className="text-sm">⬆️ Jump over barriers</p>
                    <p className="text-sm">📱 Swipe left/right/up on mobile</p>
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
                    <p className="text-2xl text-white">Score: <span className="font-bold text-yellow-400">{score}</span></p>
                    <p className="text-xl text-white">Coins: <span className="font-bold text-yellow-400">{coins}</span></p>
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

          {/* Controls Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Use arrow keys or swipe gestures to play</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
