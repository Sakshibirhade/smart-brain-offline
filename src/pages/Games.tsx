import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Gamepad2, Brain, Sparkles, Target, Zap, Trophy, Rocket, Bird, Flame, Box } from "lucide-react";
import { MemoryGame } from "@/components/games/MemoryGame";
import { MathQuiz } from "@/components/games/MathQuiz";
import { WordScramble } from "@/components/games/WordScramble";
import { ColorMatch } from "@/components/games/ColorMatch";
import { EndlessRunner } from "@/components/games/EndlessRunner";
import { FlappyBird } from "@/components/games/FlappyBird";
import { SpaceShooter } from "@/components/games/SpaceShooter";
import { BrickBreaker } from "@/components/games/BrickBreaker";

type GameType = "memory" | "math" | "word" | "color" | "runner" | "flappy" | "space" | "brick" | null;

export default function Games() {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const { t } = useLanguage();

  const games = [
    {
      id: "runner" as GameType,
      title: "Endless Runner",
      description: "Run, dodge obstacles & collect coins!",
      icon: Rocket,
      color: "from-purple-500 to-indigo-600",
      difficulty: "Hard",
    },
    {
      id: "flappy" as GameType,
      title: "Flappy Bird",
      description: "Tap to fly through the pipes!",
      icon: Bird,
      color: "from-cyan-500 to-blue-600",
      difficulty: "Medium",
    },
    {
      id: "space" as GameType,
      title: "Space Shooter",
      description: "Defend Earth from alien invaders!",
      icon: Flame,
      color: "from-red-500 to-pink-600",
      difficulty: "Hard",
    },
    {
      id: "brick" as GameType,
      title: "Brick Breaker",
      description: "Classic paddle and ball action!",
      icon: Box,
      color: "from-yellow-500 to-orange-600",
      difficulty: "Medium",
    },
    {
      id: "memory" as GameType,
      title: "Memory Match",
      description: "Find matching pairs!",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      difficulty: "Easy",
    },
    {
      id: "math" as GameType,
      title: "Math Challenge",
      description: "Solve problems fast!",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      difficulty: "Medium",
    },
    {
      id: "word" as GameType,
      title: "Word Scramble",
      description: "Unscramble the letters!",
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
      difficulty: "Medium",
    },
    {
      id: "color" as GameType,
      title: "Color Match",
      description: "Match colors quickly!",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      difficulty: "Easy",
    },
  ];

  if (activeGame) {
    return (
      <div className="pb-20">
        <div className="mb-6 animate-fade-in">
          <Button 
            variant="outline" 
            onClick={() => setActiveGame(null)}
            className="mb-4 hover:scale-105 transition-transform"
          >
            ← Back to Games
          </Button>
        </div>
        {activeGame === "runner" && <EndlessRunner />}
        {activeGame === "flappy" && <FlappyBird />}
        {activeGame === "space" && <SpaceShooter />}
        {activeGame === "brick" && <BrickBreaker />}
        {activeGame === "memory" && <MemoryGame />}
        {activeGame === "math" && <MathQuiz />}
        {activeGame === "word" && <WordScramble />}
        {activeGame === "color" && <ColorMatch />}
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-primary p-8 text-center shadow-glow animate-fade-in">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gamepad2 className="w-12 h-12 text-primary-foreground animate-float" />
            <Trophy className="w-10 h-10 text-yellow-300 animate-pulse-glow" />
          </div>
          <h1 className="text-4xl font-display font-bold text-primary-foreground">
            Fun Learning Games! 🎮
          </h1>
          <p className="text-primary-foreground/90 text-lg">
            Play offline anytime, anywhere!
          </p>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {games.map((game, index) => (
          <Card
            key={game.id}
            className="glass-effect shadow-card card-hover cursor-pointer border-2 border-border/50 hover:border-primary/40 overflow-hidden animate-fade-up group"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setActiveGame(game.id)}
          >
            <div className={`h-3 bg-gradient-to-r ${game.color}`}></div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform animate-float`}>
                  <game.icon className="w-8 h-8 text-white" />
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {game.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl mt-4 group-hover:text-primary transition-colors">
                {game.title}
              </CardTitle>
              <CardDescription className="text-base">
                {game.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full shadow-md group-hover:shadow-glow transition-all"
                size="lg"
              >
                Play Now! 🎯
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Offline Badge */}
      <div className="text-center animate-fade-in">
        <Badge variant="outline" className="text-sm px-4 py-2">
          ✨ All games work offline - No internet needed!
        </Badge>
      </div>
    </div>
  );
}
