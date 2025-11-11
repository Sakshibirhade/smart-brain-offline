import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, TrendingUp, BookMarked, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { storage } from "@/utils/storage";
import { subjects } from "@/data/subjects";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(storage.getUserProfile());
  const [recentResults, setRecentResults] = useState(storage.getQuizResults().slice(-3));

  useEffect(() => {
    setProfile(storage.getUserProfile());
    setRecentResults(storage.getQuizResults().slice(-3).reverse());
  }, []);

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-hero rounded-xl p-6 border border-border">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {profile.username}! 👋
          </h2>
          <p className="text-muted-foreground">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quizzes</p>
                  <p className="text-2xl font-bold">{profile.totalQuizzes}</p>
                </div>
                <Trophy className="text-secondary" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-bold">{profile.averageScore}%</p>
                </div>
                <TrendingUp className="text-accent" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chapters</p>
                  <p className="text-2xl font-bold">{profile.completedChapters}</p>
                </div>
                <BookMarked className="text-primary" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Streak</p>
                  <p className="text-2xl font-bold">{profile.studyStreak} days</p>
                </div>
                <Flame className="text-secondary" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {subject.progress}%
                  </span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {recentResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentResults.map((result, index) => {
                const subject = subjects.find((s) => s.id === result.subjectId);
                const percentage = Math.round((result.score / result.total) * 100);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted"
                  >
                    <div>
                      <p className="font-medium">{subject?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {percentage}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {result.score}/{result.total}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/subjects")}>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Continue Learning</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Pick up where you left off
              </p>
              <Button className="w-full">
                Go to Subjects <ArrowRight className="ml-2" size={16} />
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/games")}>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Play & Learn</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Test your knowledge with flashcards
              </p>
              <Button variant="secondary" className="w-full">
                Start Game <ArrowRight className="ml-2" size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
