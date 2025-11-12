import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subjects, quizzes } from "@/data/subjects";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, FileText, Brain } from "lucide-react";
import { storage } from "@/utils/storage";
import { useEffect, useState } from "react";

const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find((s) => s.id === id);
  const quiz = quizzes.find((q) => q.subjectId === id);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  useEffect(() => {
    setCompletedChapters(storage.getCompletedChapters());
  }, []);

  if (!subject) {
    return <Layout><div>Subject not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/subjects")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Subjects
        </Button>

        <div className="bg-gradient-hero rounded-xl p-6 border border-border">
          <h2 className="text-3xl font-bold mb-2">{subject.name}</h2>
          <p className="text-muted-foreground">
            {subject.chapters.length} chapters • {subject.progress}% complete
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Chapters</h3>
          <div className="space-y-3">
            {subject.chapters.map((chapter) => {
              const isCompleted = completedChapters.includes(chapter.id);
              return (
                <Card
                  key={chapter.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/subjects/${id}/chapter/${chapter.id}`)}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="text-accent mt-1" size={20} />
                      ) : (
                        <Circle className="text-muted-foreground mt-1" size={20} />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{chapter.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {isCompleted ? "Completed" : "Not started"}
                        </p>
                      </div>
                      <FileText className="text-muted-foreground" size={20} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {quiz && (
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain size={32} />
                <div>
                  <h3 className="text-xl font-semibold">Take a Quiz</h3>
                  <p className="opacity-90">
                    Test your knowledge with {quiz.questions.length} questions
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default SubjectDetail;
