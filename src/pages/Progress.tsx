import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Flame, Target, Award, TrendingUp, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProgressStats {
  totalTopics: number;
  completedTopics: number;
  completionPercentage: number;
  currentStreak: number;
  longestStreak: number;
  recentActivity: Array<{
    topic_name: string;
    completed_at: string;
  }>;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  criteria_type: string;
  criteria_value: number;
  unlocked_at?: string;
  is_unlocked: boolean;
}

export default function Progress() {
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    loadProgressData();
  }, []);

  const calculateStreak = (progressData: any[]) => {
    if (progressData.length === 0) return { current: 0, longest: 0 };

    // Sort by last_accessed descending
    const sorted = [...progressData]
      .filter(p => p.last_accessed)
      .sort((a, b) => new Date(b.last_accessed).getTime() - new Date(a.last_accessed).getTime());

    if (sorted.length === 0) return { current: 0, longest: 0 };

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if user has activity today or yesterday for current streak
    const lastActivity = new Date(sorted[0].last_accessed);
    lastActivity.setHours(0, 0, 0, 0);
    const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff <= 1) {
      currentStreak = 1;
      
      // Calculate current streak
      for (let i = 1; i < sorted.length; i++) {
        const current = new Date(sorted[i].last_accessed);
        current.setHours(0, 0, 0, 0);
        const prev = new Date(sorted[i - 1].last_accessed);
        prev.setHours(0, 0, 0, 0);
        
        const diff = Math.floor((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diff === 1) {
          currentStreak++;
        } else if (diff > 1) {
          break;
        }
      }
    }

    // Calculate longest streak
    for (let i = 1; i < sorted.length; i++) {
      const current = new Date(sorted[i].last_accessed);
      current.setHours(0, 0, 0, 0);
      const prev = new Date(sorted[i - 1].last_accessed);
      prev.setHours(0, 0, 0, 0);
      
      const diff = Math.floor((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diff === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else if (diff > 1) {
        tempStreak = 1;
      }
    }
    
    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    return { current: currentStreak, longest: longestStreak };
  };

  const loadProgressData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get all topics count
      const { count: totalTopics } = await supabase
        .from("topics")
        .select("*", { count: "exact", head: true });

      // Get user progress
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("*, topics(name)")
        .eq("user_id", user.id)
        .order("last_accessed", { ascending: false });

      const completedTopics = progressData?.filter(p => p.completed).length || 0;
      const completionPercentage = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;
      
      const streaks = calculateStreak(progressData || []);

      // Get recent activity (last 5 completed topics)
      const recentActivity = progressData
        ?.filter(p => p.completed)
        .slice(0, 5)
        .map(p => ({
          topic_name: p.topics?.name || "Unknown topic",
          completed_at: p.updated_at || p.created_at || "",
        })) || [];

      setStats({
        totalTopics: totalTopics || 0,
        completedTopics,
        completionPercentage,
        currentStreak: streaks.current,
        longestStreak: streaks.longest,
        recentActivity,
      });

      // Load achievements
      await loadAchievements(completedTopics, streaks.current);

      // Check and unlock achievements
      await checkAndUnlockAchievements(user.id, completedTopics, streaks.current);

    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAchievements = async (completedTopics: number, currentStreak: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get all achievements
      const { data: allAchievements } = await supabase
        .from("achievements")
        .select("*")
        .order("criteria_value");

      // Get user's unlocked achievements
      const { data: userAchievements } = await supabase
        .from("user_achievements")
        .select("achievement_id, unlocked_at")
        .eq("user_id", user.id);

      const unlockedIds = new Set(userAchievements?.map(ua => ua.achievement_id) || []);

      const achievementsWithStatus = allAchievements?.map(ach => ({
        ...ach,
        is_unlocked: unlockedIds.has(ach.id),
        unlocked_at: userAchievements?.find(ua => ua.achievement_id === ach.id)?.unlocked_at,
      })) || [];

      setAchievements(achievementsWithStatus);
    } catch (error: any) {
      console.error("Error loading achievements:", error);
    }
  };

  const checkAndUnlockAchievements = async (userId: string, completedTopics: number, currentStreak: number) => {
    try {
      // Get all achievements
      const { data: allAchievements } = await supabase
        .from("achievements")
        .select("*");

      // Get already unlocked
      const { data: userAchievements } = await supabase
        .from("user_achievements")
        .select("achievement_id")
        .eq("user_id", userId);

      const unlockedIds = new Set(userAchievements?.map(ua => ua.achievement_id) || []);

      // Check which achievements should be unlocked
      const toUnlock = allAchievements?.filter(ach => {
        if (unlockedIds.has(ach.id)) return false;

        if (ach.criteria_type === "topics_completed" && completedTopics >= ach.criteria_value) {
          return true;
        }
        if (ach.criteria_type === "streak_days" && currentStreak >= ach.criteria_value) {
          return true;
        }
        return false;
      }) || [];

      // Unlock new achievements
      if (toUnlock.length > 0) {
        const { error } = await supabase
          .from("user_achievements")
          .insert(
            toUnlock.map(ach => ({
              user_id: userId,
              achievement_id: ach.id,
            }))
          );

        if (!error && toUnlock.length > 0) {
          toast({
            title: "🎉 Achievement Unlocked!",
            description: toUnlock.map(a => a.name).join(", "),
          });
        }
      }
    } catch (error: any) {
      console.error("Error checking achievements:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-20">
        <Skeleton className="h-8 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold">{t("myProgress")}</h1>
        <p className="text-muted-foreground mt-2">Track your learning journey and achievements</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Target className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completionPercentage}%</div>
            <ProgressBar value={stats?.completionPercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {stats?.completedTopics} of {stats?.totalTopics} topics completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.currentStreak} days</div>
            <p className="text-xs text-muted-foreground mt-2">
              Longest: {stats?.longestStreak} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {achievements.filter(a => a.is_unlocked).length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              of {achievements.length} unlocked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-start gap-4 p-4 rounded-lg border ${
                  achievement.is_unlocked
                    ? "bg-accent/50 border-primary/50"
                    : "opacity-60 bg-muted/30"
                }`}
              >
                <div className="text-4xl">{achievement.icon || "🏆"}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{achievement.name}</h3>
                    {achievement.is_unlocked && (
                      <Badge variant="default" className="text-xs">Unlocked</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                  {achievement.is_unlocked && achievement.unlocked_at && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Unlocked on {new Date(achievement.unlocked_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats?.recentActivity.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No activity yet. Start learning to see your progress!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {stats?.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-medium">{activity.topic_name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(activity.completed_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
