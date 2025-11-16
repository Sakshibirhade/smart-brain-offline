import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Timer } from "lucide-react";

export function MathQuiz() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      toast.success(`Game Over! Final Score: ${score}/${questions} 🎯`);
    }
  }, [timeLeft, gameActive]);

  const generateQuestion = () => {
    const operators = ["+", "-", "×"];
    const op = operators[Math.floor(Math.random() * operators.length)];
    const n1 = Math.floor(Math.random() * 20) + 1;
    const n2 = Math.floor(Math.random() * 20) + 1;

    setNum1(op === "-" ? Math.max(n1, n2) : n1);
    setNum2(op === "-" ? Math.min(n1, n2) : n2);
    setOperator(op);
    setAnswer("");
  };

  const getCorrectAnswer = () => {
    if (operator === "+") return num1 + num2;
    if (operator === "-") return num1 - num2;
    return num1 * num2;
  };

  const handleSubmit = () => {
    const userAnswer = parseInt(answer);
    const correct = getCorrectAnswer();

    if (userAnswer === correct) {
      setScore(score + 1);
      toast.success("Correct! 🎉");
    } else {
      toast.error(`Wrong! Answer was ${correct}`);
    }

    setQuestions(questions + 1);
    generateQuestion();
  };

  const resetGame = () => {
    setScore(0);
    setQuestions(0);
    setTimeLeft(60);
    setGameActive(true);
    generateQuestion();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-effect shadow-card border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Score: {score}/{questions}
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2 flex items-center gap-2">
                <Timer className="w-4 h-4" />
                {timeLeft}s
              </Badge>
            </div>
            <Button onClick={resetGame} variant="outline">
              New Game 🔄
            </Button>
          </div>

          <Progress value={(timeLeft / 60) * 100} className="mb-6 h-3" />

          {gameActive ? (
            <div className="text-center space-y-8 py-8">
              <div className="text-7xl font-bold gradient-text animate-scale-in">
                {num1} {operator} {num2} = ?
              </div>

              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full max-w-md mx-auto text-center text-4xl p-6 rounded-2xl border-4 border-primary/30 focus:border-primary bg-background focus:outline-none shadow-md"
                placeholder="Your answer"
                autoFocus
              />

              <Button
                onClick={handleSubmit}
                size="lg"
                disabled={!answer}
                className="text-xl px-12 py-6 shadow-glow"
              >
                Submit Answer 🚀
              </Button>
            </div>
          ) : (
            <div className="text-center p-8 rounded-2xl bg-gradient-primary animate-scale-in">
              <h2 className="text-4xl font-bold text-primary-foreground mb-4">
                Time's Up! ⏰
              </h2>
              <p className="text-2xl text-primary-foreground/90">
                Final Score: {score}/{questions}
              </p>
              <p className="text-xl text-primary-foreground/80 mt-2">
                {score === questions ? "Perfect! 🏆" : score > questions / 2 ? "Great job! 🎉" : "Keep practicing! 💪"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
