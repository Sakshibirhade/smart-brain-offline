import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quizzes } from "@/data/subjects";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { storage } from "@/utils/storage";
import { Progress } from "@/components/ui/progress";

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === quizId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  if (!quiz) {
    return <Layout><div>Quiz not found</div></Layout>;
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore = selectedAnswer === question.correctAnswer ? score + 1 : score;
      
      // Save result
      storage.saveQuizResult({
        quizId: quiz.id,
        subjectId: quiz.subjectId,
        score: finalScore,
        total: quiz.questions.length,
        date: new Date().toISOString(),
      });

      // Update profile
      const profile = storage.getUserProfile();
      const newTotal = profile.totalQuizzes + 1;
      const newAverage = Math.round(
        ((profile.averageScore * profile.totalQuizzes) +
          (finalScore / quiz.questions.length) * 100) /
          newTotal
      );
      storage.updateUserProfile({
        totalQuizzes: newTotal,
        averageScore: newAverage,
      });

      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="text-center">
            <CardContent className="pt-12 pb-12">
              <div className="mb-6">
                {percentage >= 70 ? (
                  <CheckCircle className="mx-auto text-accent" size={64} />
                ) : (
                  <XCircle className="mx-auto text-secondary" size={64} />
                )}
              </div>
              <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
              <p className="text-5xl font-bold text-primary my-6">
                {percentage}%
              </p>
              <p className="text-xl text-muted-foreground mb-8">
                You scored {score} out of {quiz.questions.length}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate(`/subjects/${quiz.subjectId}`)}
                  className="w-full"
                  size="lg"
                >
                  Back to Subject
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/subjects/${quiz.subjectId}`)}
        >
          <ArrowLeft className="mr-2" size={16} />
          Exit Quiz
        </Button>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </span>
            <span className="font-medium">Score: {score}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <h3 className="text-xl font-semibold">{question.question}</h3>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}
                    >
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="w-full"
              size="lg"
            >
              {currentQuestion < quiz.questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Quiz;
