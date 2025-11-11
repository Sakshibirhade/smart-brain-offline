import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/utils/storage";
import { Trophy, TrendingUp, BookMarked, Flame, Edit2, Check } from "lucide-react";
import { subjects } from "@/data/subjects";

const Profile = () => {
  const [profile, setProfile] = useState(storage.getUserProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [quizResults, setQuizResults] = useState(storage.getQuizResults());

  useEffect(() => {
    setProfile(storage.getUserProfile());
    setQuizResults(storage.getQuizResults());
  }, []);

  const handleSave = () => {
    storage.updateUserProfile({ username });
    setProfile({ ...profile, username });
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gradient-hero">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              {isEditing ? (
                <div className="flex gap-2 flex-1">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button onClick={handleSave} size="icon" variant="secondary">
                    <Check size={18} />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">{profile.username}</h2>
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="icon"
                    variant="ghost"
                  >
                    <Edit2 size={18} />
                  </Button>
                </div>
              )}
            </div>
            <p className="text-muted-foreground">
              Keep learning, keep growing! 🌟
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="mx-auto mb-2 text-secondary" size={32} />
              <p className="text-2xl font-bold">{profile.totalQuizzes}</p>
              <p className="text-sm text-muted-foreground">Quizzes Taken</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="mx-auto mb-2 text-accent" size={32} />
              <p className="text-2xl font-bold">{profile.averageScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <BookMarked className="mx-auto mb-2 text-primary" size={32} />
              <p className="text-2xl font-bold">{profile.completedChapters}</p>
              <p className="text-sm text-muted-foreground">Chapters Done</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Flame className="mx-auto mb-2 text-secondary" size={32} />
              <p className="text-2xl font-bold">{profile.studyStreak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Recent Quiz History</h3>
            {quizResults.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No quizzes taken yet. Start learning!
              </p>
            ) : (
              <div className="space-y-3">
                {quizResults.slice(-10).reverse().map((result, index) => {
                  const subject = subjects.find((s) => s.id === result.subjectId);
                  const percentage = Math.round((result.score / result.total) * 100);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted"
                    >
                      <div>
                        <p className="font-medium">{subject?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(result.date).toLocaleDateString()} •{" "}
                          {new Date(result.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {percentage}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {result.score}/{result.total} correct
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-secondary text-secondary-foreground">
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-2">Keep Going! 💪</h3>
            <p className="mb-4">
              You're making great progress. Remember: consistent practice leads to
              mastery!
            </p>
            <ul className="space-y-2 text-sm">
              <li>✓ Review your notes regularly</li>
              <li>✓ Take quizzes to test your knowledge</li>
              <li>✓ Use flashcards for quick revision</li>
              <li>✓ Study a little bit every day</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
