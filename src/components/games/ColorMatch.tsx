import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Timer } from "lucide-react";

const colors = [
  { name: "Red", hex: "#EF4444", bg: "bg-red-500" },
  { name: "Blue", hex: "#3B82F6", bg: "bg-blue-500" },
  { name: "Green", hex: "#10B981", bg: "bg-green-500" },
  { name: "Yellow", hex: "#F59E0B", bg: "bg-yellow-500" },
  { name: "Purple", hex: "#A855F7", bg: "bg-purple-500" },
  { name: "Pink", hex: "#EC4899", bg: "bg-pink-500" },
  { name: "Orange", hex: "#F97316", bg: "bg-orange-500" },
  { name: "Cyan", hex: "#06B6D4", bg: "bg-cyan-500" },
];

export function ColorMatch() {
  const [targetColor, setTargetColor] = useState(colors[0]);
  const [options, setOptions] = useState<typeof colors>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    generateRound();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      toast.success(`Game Over! Score: ${score} 🎨`);
    }
  }, [timeLeft, gameActive]);

  const generateRound = () => {
    const target = colors[Math.floor(Math.random() * colors.length)];
    const shuffled = [...colors]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    if (!shuffled.includes(target)) {
      shuffled[0] = target;
      shuffled.sort(() => Math.random() - 0.5);
    }

    setTargetColor(target);
    setOptions(shuffled);
  };

  const handleColorClick = (color: typeof colors[0]) => {
    if (color.name === targetColor.name) {
      toast.success("Perfect match! 🎉");
      setScore(score + 1);
      setTimeLeft(timeLeft + 2); // Bonus time
      generateRound();
    } else {
      toast.error("Wrong color! Try again!");
      setTimeLeft(Math.max(0, timeLeft - 3)); // Penalty
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    generateRound();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-effect shadow-card border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Score: {score}
            </Badge>
            <div className="flex gap-2 items-center">
              <Badge variant="outline" className="text-lg px-4 py-2 flex items-center gap-2">
                <Timer className="w-4 h-4" />
                {timeLeft}s
              </Badge>
              <Button onClick={resetGame} variant="outline">
                New Game 🔄
              </Button>
            </div>
          </div>

          <Progress value={(timeLeft / 30) * 100} className="mb-8 h-3" />

          {gameActive ? (
            <div className="text-center space-y-8">
              <div>
                <p className="text-2xl text-muted-foreground mb-4">
                  Find this color:
                </p>
                <div className="text-6xl font-bold animate-pulse-glow" style={{ color: targetColor.hex }}>
                  {targetColor.name}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                {options.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorClick(color)}
                    className={`${color.bg} h-32 rounded-2xl shadow-lg hover:scale-110 transition-all duration-300 border-4 border-white/20 hover:border-white/40 animate-scale-in cursor-pointer`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-8 rounded-2xl bg-gradient-primary animate-scale-in">
              <h2 className="text-4xl font-bold text-primary-foreground mb-4">
                Time's Up! ⏰
              </h2>
              <p className="text-2xl text-primary-foreground/90">
                Final Score: {score} colors matched!
              </p>
              <p className="text-xl text-primary-foreground/80 mt-2">
                {score >= 10 ? "Color Master! 🎨" : score >= 5 ? "Great job! 🌈" : "Keep practicing! 💪"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
