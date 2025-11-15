import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";

export default function Subjects() {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    loadSubject();
  }, [subjectId]);

  const loadSubject = async () => {
    try {
      const { data: subjectData } = await supabase
        .from("subjects")
        .select("*")
        .eq("id", subjectId)
        .single();

      setSubject(subjectData);

      const { data: chaptersData } = await supabase
        .from("chapters")
        .select("*, topics(id)")
        .eq("subject_id", subjectId)
        .order("order_index");

      setChapters(chaptersData || []);
    } catch (error) {
      console.error("Error loading subject:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">{t("loading")}</div>;
  }

  if (!subject) {
    return <div className="text-center py-12">Subject not found</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{subject.name}</h1>
          <p className="text-muted-foreground">{subject.description}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("chapters")}</CardTitle>
          <CardDescription>Select a chapter to start learning</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              onClick={() => navigate(`/chapters/${chapter.id}`)}
              className="flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {chapter.order_index}
                </div>
                <div>
                  <h3 className="font-semibold">{chapter.name}</h3>
                  <p className="text-sm text-muted-foreground">{chapter.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>{chapter.topics?.length || 0} topics</span>
              </div>
            </div>
          ))}

          {chapters.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No chapters available yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
