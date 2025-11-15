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
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <p className="text-sm text-muted-foreground">{chapter.subjects?.name}</p>
          <h1 className="text-2xl font-bold">{chapter.name}</h1>
          <p className="text-muted-foreground">{chapter.description}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("topics")}</CardTitle>
          <CardDescription>
            {topics.filter((t) => getTopicProgress(t.id)?.completed).length} of {topics.length} completed
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {topics.map((topic) => {
            const topicProgress = getTopicProgress(topic.id);
            const isCompleted = topicProgress?.completed;

            return (
              <div
                key={topic.id}
                onClick={() => navigate(`/topics/${topic.id}`)}
                className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{topic.order_index}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{topic.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {t(topic.difficulty)}
                      </Badge>
                      {topic.estimated_time && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
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
            <p className="text-center text-muted-foreground py-8">
              No topics available yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
