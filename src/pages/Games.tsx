import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { flashCards, subjects } from "@/data/subjects";
import { RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Games = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredCards =
    selectedSubject === "all"
      ? flashCards
      : flashCards.filter((card) => card.subjectId === selectedSubject);

  const card = filteredCards[currentCard];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCard(
      (prev) => (prev - 1 + filteredCards.length) % filteredCards.length
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-hero rounded-xl p-6 border border-border">
          <h2 className="text-3xl font-bold mb-2">Flashcard Game 🎮</h2>
          <p className="text-muted-foreground">
            Test your memory and learn through repetition
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Filter by Subject</p>
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Card {currentCard + 1} of {filteredCards.length}
            </div>
          </CardContent>
        </Card>

        {card && (
          <div
            className="perspective-1000 cursor-pointer"
            onClick={handleFlip}
          >
            <div
              className={`relative h-80 transition-transform duration-500 transform-style-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front of card */}
              <Card
                className={`absolute w-full h-full backface-hidden ${
                  isFlipped ? "invisible" : "visible"
                }`}
              >
                <CardContent className="h-full flex flex-col items-center justify-center p-8">
                  <p className="text-sm text-muted-foreground mb-2">Question</p>
                  <h3 className="text-2xl font-bold text-center mb-4">
                    {card.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Click to reveal answer
                  </p>
                </CardContent>
              </Card>

              {/* Back of card */}
              <Card
                className={`absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-primary text-primary-foreground ${
                  isFlipped ? "visible" : "invisible"
                }`}
              >
                <CardContent className="h-full flex flex-col items-center justify-center p-8">
                  <p className="text-sm opacity-90 mb-2">Answer</p>
                  <h3 className="text-2xl font-bold text-center mb-4">
                    {card.answer}
                  </h3>
                  <p className="text-sm opacity-90">Click to see question</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex-1"
            size="lg"
          >
            <ChevronLeft className="mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleFlip}
            className="flex-1"
            size="lg"
          >
            <RotateCcw className="mr-2" />
            Flip
          </Button>
          <Button onClick={handleNext} className="flex-1" size="lg">
            Next
            <ChevronRight className="ml-2" />
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">How to Play:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Read the question on the front of the card</li>
              <li>• Think about the answer before flipping</li>
              <li>• Click the card or "Flip" button to reveal the answer</li>
              <li>• Use Next/Previous to navigate through cards</li>
              <li>• Filter by subject to focus on specific topics</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Games;
