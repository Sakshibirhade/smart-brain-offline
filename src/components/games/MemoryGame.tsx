import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

interface CardType {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(id)) return;
    if (cards[id].matched) return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setMatches(matches + 1);
        setFlippedCards([]);
        toast.success("Match found! 🎉");

        if (matches + 1 === emojis.length) {
          setTimeout(() => {
            setGameWon(true);
            toast.success(`You won in ${moves + 1} moves! 🏆`);
          }, 500);
        }
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-effect shadow-card border-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <Badge variant="outline" className="text-lg px-4 py-2">
                Moves: {moves}
              </Badge>
              <Badge variant="outline" className="text-lg px-4 py-2">
                Matches: {matches}/{emojis.length}
              </Badge>
            </div>
            <Button onClick={initGame} variant="outline">
              New Game 🔄
            </Button>
          </div>

          {gameWon && (
            <div className="text-center mb-6 p-6 rounded-2xl bg-gradient-primary animate-scale-in">
              <h2 className="text-3xl font-bold text-primary-foreground mb-2">
                🎉 You Won! 🎉
              </h2>
              <p className="text-primary-foreground/90 text-lg">
                Completed in {moves} moves!
              </p>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                  card.flipped || card.matched
                    ? "bg-gradient-primary shadow-glow"
                    : "bg-gradient-secondary"
                } flex items-center justify-center text-5xl animate-scale-in`}
                style={{ animationDelay: `${card.id * 0.05}s` }}
              >
                {card.flipped || card.matched ? card.emoji : "❓"}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
