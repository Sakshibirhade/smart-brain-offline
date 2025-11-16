import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Lightbulb } from "lucide-react";

const words = [
  { word: "ELEPHANT", hint: "Large animal with a trunk" },
  { word: "RAINBOW", hint: "Colorful arc in the sky" },
  { word: "COMPUTER", hint: "Electronic device for work" },
  { word: "BUTTERFLY", hint: "Colorful flying insect" },
  { word: "MOUNTAIN", hint: "Very tall land formation" },
  { word: "CHOCOLATE", hint: "Sweet brown treat" },
  { word: "DINOSAUR", hint: "Extinct giant reptile" },
  { word: "SUNSHINE", hint: "Light from the sun" },
  { word: "PLAYGROUND", hint: "Where kids play outside" },
  { word: "ADVENTURE", hint: "Exciting journey" },
];

export function WordScramble() {
  const [currentWord, setCurrentWord] = useState({ word: "", hint: "" });
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState(3);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    generateWord();
  }, []);

  const scrambleWord = (word: string) => {
    return word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const generateWord = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setScrambled(scrambleWord(randomWord.word));
    setGuess("");
    setShowHint(false);
  };

  const handleSubmit = () => {
    if (guess.toUpperCase() === currentWord.word) {
      toast.success("Correct! 🎉");
      setScore(score + 1);
      generateWord();
    } else {
      toast.error("Try again! 🤔");
    }
  };

  const useHint = () => {
    if (hints > 0) {
      setHints(hints - 1);
      setShowHint(true);
      toast.info(currentWord.hint);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-effect shadow-card border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Score: {score}
            </Badge>
            <div className="flex gap-2">
              <Button
                onClick={useHint}
                variant="outline"
                disabled={hints === 0}
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Hints: {hints}
              </Button>
              <Button onClick={generateWord} variant="outline">
                Skip 🔄
              </Button>
            </div>
          </div>

          <div className="text-center space-y-8 py-8">
            <div>
              <p className="text-lg text-muted-foreground mb-4">
                Unscramble this word:
              </p>
              <div className="text-6xl font-bold gradient-text tracking-widest animate-scale-in mb-4">
                {scrambled}
              </div>
              {showHint && (
                <p className="text-lg text-accent animate-fade-in">
                  💡 Hint: {currentWord.hint}
                </p>
              )}
            </div>

            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full max-w-md mx-auto text-center text-3xl p-6 rounded-2xl border-4 border-primary/30 focus:border-primary bg-background focus:outline-none shadow-md uppercase"
              placeholder="Type your answer"
              autoFocus
            />

            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={!guess}
              className="text-xl px-12 py-6 shadow-glow"
            >
              Check Answer ✨
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
