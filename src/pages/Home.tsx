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
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-center shadow-glow animate-fade-in">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="relative z-10 space-y-3">
          <h1 className="text-4xl font-display font-bold text-primary-foreground animate-scale-in">
            {t("welcome")}, {profile?.full_name || "Student"}! 🎓
          </h1>
          <p className="text-primary-foreground/90 text-lg font-medium">
            {profile?.grade ? `${t("grade")} ${profile.grade}` : t("selectGrade")}
          </p>
        </div>
      </div>

      {!profile?.grade && (
        <Card className="glass-effect shadow-card card-hover border-2">
          <CardHeader>
            <CardTitle className="gradient-text">{t("selectGrade")}</CardTitle>
            <CardDescription>Choose your grade to start learning</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/profile")} className="w-full shadow-md">
              {t("editProfile")}
            </Button>
          </CardContent>
        </Card>
      )}

      {profile?.grade && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-effect shadow-card card-hover border-primary/20 animate-fade-up">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-3 animate-float">
                    <BookOpen className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">{subjects.length}</p>
                  <p className="text-sm text-muted-foreground font-medium">{t("subjects")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect shadow-card card-hover border-accent/20 animate-fade-up" style={{animationDelay: '0.1s'}}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-secondary flex items-center justify-center mb-3 animate-float" style={{animationDelay: '0.5s'}}>
                    <Target className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">{progress.filter((p) => p.completed).length}</p>
                  <p className="text-sm text-muted-foreground font-medium">{t("completedTopics")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect shadow-card card-hover border-success/20 animate-fade-up" style={{animationDelay: '0.2s'}}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-success to-success/70 flex items-center justify-center mb-3 animate-float" style={{animationDelay: '1s'}}>
                    <TrendingUp className="w-7 h-7 text-success-foreground" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">{progress.length}</p>
                  <p className="text-sm text-muted-foreground font-medium">{t("inProgress")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect shadow-card card-hover border-accent/20 animate-fade-up" style={{animationDelay: '0.3s'}}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-accent flex items-center justify-center mb-3 animate-float shimmer" style={{animationDelay: '1.5s'}}>
                    <Trophy className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">0</p>
                  <p className="text-sm text-muted-foreground font-medium">Badges</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-display font-bold mb-6 gradient-text">{t("subjects")}</h2>
            <div className="grid gap-5">
              {subjects.map((subject, index) => (
                <Card
                  key={subject.id}
                  className="glass-effect shadow-card card-hover cursor-pointer border-2 border-border/50 hover:border-primary/30 transition-all duration-300 animate-fade-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                  onClick={() => navigate(`/subjects/${subject.id}`)}
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-2xl shadow-md">
                        {subject.icon || "📚"}
                      </div>
                      <span className="text-xl">{subject.name}</span>
                    </CardTitle>
                    {subject.description && (
                      <CardDescription className="text-base ml-15">{subject.description}</CardDescription>
                    )}
                  </CardHeader>
                </Card>
              ))}

              {subjects.length === 0 && (
                <Card className="glass-effect">
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                      No subjects available for your grade yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {progress.length > 0 && (
            <div>
              <h2 className="text-3xl font-display font-bold mb-6 gradient-text">{t("recentActivity")}</h2>
              <div className="space-y-4">
                {progress.map((item, index) => (
                  <Card key={item.id} className="glass-effect shadow-card card-hover border-2 border-border/50 animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-lg">{item.topics?.name}</p>
                          <Badge 
                            variant={item.completed ? "default" : "secondary"}
                            className={item.completed ? "shadow-sm bg-gradient-primary" : ""}
                          >
                            {item.completed ? t("completed") : t("inProgress")}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Progress value={item.score || (item.completed ? 100 : 30)} className="h-3" />
                          <p className="text-sm text-muted-foreground font-medium">
                            Score: <span className="text-foreground font-bold">{item.score || 0}%</span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
