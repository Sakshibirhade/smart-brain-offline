import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Trophy, Target, TrendingUp } from "lucide-react";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      if (profileData?.grade) {
        const { data: subjectsData } = await supabase
          .from("subjects")
          .select("*")
          .eq("grade", profileData.grade)
          .order("name");

        setSubjects(subjectsData || []);

        const { data: progressData } = await supabase
          .from("user_progress")
          .select("*, topics(*)")
          .eq("user_id", user.id)
          .order("last_accessed", { ascending: false })
          .limit(5);

        setProgress(progressData || []);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("welcome")}, {profile?.full_name || "Student"}!
        </h1>
        <p className="text-muted-foreground">
          {profile?.grade ? `${t("grade")} ${profile.grade}` : t("selectGrade")}
        </p>
      </div>

      {!profile?.grade && (
        <Card>
          <CardHeader>
            <CardTitle>{t("selectGrade")}</CardTitle>
            <CardDescription>Choose your grade to start learning</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/profile")} className="w-full">
              {t("editProfile")}
            </Button>
          </CardContent>
        </Card>
      )}

      {profile?.grade && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <BookOpen className="w-8 h-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{subjects.length}</p>
                  <p className="text-sm text-muted-foreground">{t("subjects")}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Target className="w-8 h-8 text-secondary mb-2" />
                  <p className="text-2xl font-bold">{progress.filter((p) => p.completed).length}</p>
                  <p className="text-sm text-muted-foreground">{t("completedTopics")}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <TrendingUp className="w-8 h-8 text-accent mb-2" />
                  <p className="text-2xl font-bold">{progress.length}</p>
                  <p className="text-sm text-muted-foreground">{t("inProgress")}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Badges</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("subjects")}</CardTitle>
              <CardDescription>Explore your subjects</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  onClick={() => navigate(`/subjects/${subject.id}`)}
                  className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: subject.color || "#3b82f6" }}
                  >
                    {subject.icon || "📚"}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </div>
                </div>
              ))}

              {subjects.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No subjects available for your grade yet.
                </p>
              )}
            </CardContent>
          </Card>

          {progress.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t("recentActivity")}</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {progress.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.topics?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.completed ? t("completed") : t("inProgress")}
                        </p>
                      </div>
                      {item.score && (
                        <Badge variant="secondary">{item.score}%</Badge>
                      )}
                    </div>
                    <Progress value={item.score || (item.completed ? 100 : 30)} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
