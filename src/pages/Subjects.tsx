import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { subjects } from "@/data/subjects";
import { Code, Calculator, Atom, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, any> = {
  Code,
  Calculator,
  Atom,
  BookOpen,
};

const Subjects = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Subjects</h2>
          <p className="text-muted-foreground">
            Choose a subject to start learning
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const Icon = iconMap[subject.icon];
            return (
              <Card
                key={subject.id}
                className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                onClick={() => navigate(`/subjects/${subject.id}`)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${subject.color}`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {subject.chapters.length} chapters
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      {subject.chapters.filter((c) => c.completed).length} of{" "}
                      {subject.chapters.length} chapters completed
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Subjects;
