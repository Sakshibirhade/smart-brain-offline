import { useEffect, useState } from "react";
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
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: 1,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: 2,
  },
  {
    question: "Which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2,
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: 1,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yuan", "Won", "Yen", "Baht"],
    correctAnswer: 2,
  },
  {
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Benjamin Franklin"],
    correctAnswer: 1,
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
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastTime = Date.now();

    const handleMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current || current.x === null || current.y === null || current.z === null) return;

      const currentTime = Date.now();
      const timeDiff = currentTime - lastTime;

      if (timeDiff > 100) {
        const deltaX = Math.abs(current.x - lastX);
        const deltaY = Math.abs(current.y - lastY);
        const deltaZ = Math.abs(current.z - lastZ);

        const acceleration = deltaX + deltaY + deltaZ;

        // If acceleration is high enough, it's a shake!
        if (acceleration > 25) {
          triggerQuiz();
        }

        lastX = current.x;
        lastY = current.y;
        lastZ = current.z;
        lastTime = currentTime;
      }
    };

    const startShakeDetection = () => {
      if (typeof DeviceMotionEvent !== 'undefined') {
        // Request permission for iOS 13+
        if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
          (DeviceMotionEvent as any).requestPermission()
            .then((response: string) => {
              if (response === 'granted') {
                window.addEventListener('devicemotion', handleMotion);
                setShakeEnabled(true);
                console.log("Shake detection started");
              }
            })
            .catch((error: Error) => {
              console.error("Error requesting motion permission:", error);
            });
        } else {
          // Non-iOS or older iOS
          window.addEventListener('devicemotion', handleMotion);
          setShakeEnabled(true);
          console.log("Shake detection started");
        }
      } else {
        console.log("DeviceMotion not supported");
      }
    };

    startShakeDetection();

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
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
