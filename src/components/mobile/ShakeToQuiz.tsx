import { useEffect, useState } from "react";
import { Motion } from "@capacitor/motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CheckCircle, XCircle } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizQuestions: Question[] = [
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    correctAnswer: 1,
  },
  {
    question: "What is the process by which plants make food?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
    correctAnswer: 1,
  },
  {
    question: "What is DNA's full form?",
    options: [
      "Deoxyribonucleic Acid",
      "Dinitrogen Acid",
      "Double Nucleic Acid",
      "Dynamic Nuclear Acid",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which organ pumps blood throughout the body?",
    options: ["Lungs", "Liver", "Heart", "Kidney"],
    correctAnswer: 2,
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Skin", "Brain"],
    correctAnswer: 2,
  },
];

export const ShakeToQuiz = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shakeEnabled, setShakeEnabled] = useState(false);

  useEffect(() => {
    let handler: any;

    const startShakeDetection = async () => {
      try {
        // Request permission and start listening for shake events
        await Motion.addListener("accel", (event) => {
          const { x, y, z } = event.acceleration;
          const totalAcceleration = Math.sqrt(x * x + y * y + z * z);

          // If acceleration is high enough, it's a shake!
          if (totalAcceleration > 25) {
            triggerQuiz();
          }
        });

        setShakeEnabled(true);
        console.log("Shake detection started");
      } catch (error) {
        console.error("Error setting up shake detection:", error);
      }
    };

    startShakeDetection();

    return () => {
      Motion.removeAllListeners();
    };
  }, []);

  const triggerQuiz = () => {
    // Don't trigger if already showing a quiz
    if (isQuizOpen) return;

    // Pick a random question
    const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsQuizOpen(true);
  };

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleClose = () => {
    setIsQuizOpen(false);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <>
      {/* Shake Indicator */}
      {shakeEnabled && (
        <div className="fixed bottom-24 right-4 z-50 animate-bounce">
          <Badge className="gap-2 bg-gradient-primary shadow-glow">
            <Smartphone className="w-4 h-4" />
            Shake for Quiz!
          </Badge>
        </div>
      )}

      {/* Quiz Dialog */}
      <Dialog open={isQuizOpen} onOpenChange={setIsQuizOpen}>
        <DialogContent className="glass-effect border-2 border-primary/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Smartphone className="w-6 h-6 text-primary-foreground" />
              </div>
              Surprise Quiz!
            </DialogTitle>
          </DialogHeader>

          {currentQuestion && (
            <div className="space-y-4 mt-4">
              <Card className="bg-muted/30 border-primary/20">
                <CardContent className="pt-6">
                  <p className="text-lg font-medium">{currentQuestion.question}</p>
                </CardContent>
              </Card>

              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedAnswer === index
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    } ${
                      showResult &&
                      index === currentQuestion.correctAnswer &&
                      "border-green-500 bg-green-500/10"
                    } ${
                      showResult &&
                      selectedAnswer === index &&
                      index !== currentQuestion.correctAnswer &&
                      "border-red-500 bg-red-500/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {!showResult ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full"
                >
                  Submit Answer
                </Button>
              ) : (
                <Card
                  className={`border-2 ${
                    isCorrect
                      ? "border-green-500 bg-green-500/10"
                      : "border-red-500 bg-red-500/10"
                  }`}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-2">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                      <p className="text-lg font-bold">
                        {isCorrect ? "Correct! 🎉" : "Wrong Answer"}
                      </p>
                    </div>
                    {!isCorrect && (
                      <p className="text-sm text-muted-foreground">
                        The correct answer is:{" "}
                        <strong>{currentQuestion.options[currentQuestion.correctAnswer]}</strong>
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}

              {showResult && (
                <Button onClick={handleClose} variant="outline" className="w-full">
                  Close
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
