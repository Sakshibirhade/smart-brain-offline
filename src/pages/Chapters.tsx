import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";

export default function Chapters() {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState<any>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    loadChapter();
  }, [chapterId]);

  const loadChapter = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: chapterData } = await supabase
        .from("chapters")
        .select("*, subjects(name)")
        .eq("id", chapterId)
        .single();

      setChapter(chapterData);

      const { data: topicsData } = await supabase
        .from("topics")
        .select("*")
        .eq("chapter_id", chapterId)
        .order("order_index");

      setTopics(topicsData || []);

      if (user) {
        const { data: progressData } = await supabase
          .from("user_progress")
          .select("*")
          .eq("user_id", user.id)
          .in("topic_id", topicsData?.map((t) => t.id) || []);

        setProgress(progressData || []);
      }
    } catch (error) {
      console.error("Error loading chapter:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTopicProgress = (topicId: string) => {
    return progress.find((p) => p.topic_id === topicId);
  };

  if (loading) {
    return <div className="text-center py-12">{t("loading")}</div>;
  }

  if (!chapter) {
    return <div className="text-center py-12">Chapter not found</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4 animate-fade-in">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:scale-110 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{chapter.subjects?.name}</p>
          <h1 className="text-3xl font-display font-bold gradient-text">{chapter.name}</h1>
          {chapter.description && (
            <p className="text-muted-foreground mt-1">{chapter.description}</p>
          )}
        </div>
      </div>

      <Card className="glass-effect shadow-card border-2 border-border/50 animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl">{t("topics")}</CardTitle>
          <CardDescription className="text-base">
            <span className="font-semibold text-primary">
              {topics.filter((t) => getTopicProgress(t.id)?.completed).length}
            </span> of {topics.length} completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {topics.map((topic, index) => {
            const topicProgress = getTopicProgress(topic.id);
            const isCompleted = topicProgress?.completed;

            return (
              <div
                key={topic.id}
                onClick={() => navigate(`/topics/${topic.id}`)}
                className="group flex items-center justify-between p-5 rounded-xl border-2 border-border/50 cursor-pointer hover:border-primary/40 glass-effect card-hover transition-all duration-300 animate-fade-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                      : 'bg-muted group-hover:bg-primary/10'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 animate-scale-in" />
                    ) : (
                      <span className="font-bold text-lg">{topic.order_index}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{topic.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs font-medium ${
                          topic.difficulty === 'easy' ? 'border-success/50 text-success' :
                          topic.difficulty === 'medium' ? 'border-accent/50 text-accent' :
                          'border-destructive/50 text-destructive'
                        }`}
                      >
                        {t(topic.difficulty)}
                      </Badge>
                      {topic.estimated_time && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {topic.estimated_time} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {topics.length === 0 && (
            <div className="text-center py-12 animate-fade-in">
              <p className="text-muted-foreground text-lg">
                No topics available yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
