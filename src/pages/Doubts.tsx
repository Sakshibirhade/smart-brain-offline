import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2, MessageSquare, Send, Clock, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Doubt {
  id: string;
  question: string;
  answer: string | null;
  status: string;
  created_at: string;
  topic_id: string | null;
}

export default function Doubts() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    loadDoubts();
  }, []);

  const loadDoubts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("doubts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDoubts(data || []);
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

  const handleDelete = async (doubtId: string) => {
    try {
      const { error } = await supabase
        .from("doubts")
        .delete()
        .eq("id", doubtId);

      if (error) throw error;

      toast({
        title: t("success"),
        description: "Question deleted successfully",
      });

      await loadDoubts();
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Call AI to get answer
      const { data: aiData, error: aiError } = await supabase.functions.invoke(
        "solve-doubt",
        {
          body: { question: question.trim() },
        }
      );

      if (aiError) throw aiError;

      // Save to database
      const { error: dbError } = await supabase.from("doubts").insert({
        user_id: user.id,
        question: question.trim(),
        answer: aiData.answer,
        status: "answered",
      });

      if (dbError) throw dbError;

      toast({
        title: t("success"),
        description: "Your doubt has been answered!",
      });

      setQuestion("");
      await loadDoubts();
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message || "Failed to submit your question",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-20">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold">Ask a Question</h1>
        <p className="text-muted-foreground mt-2">
          Get instant AI-powered answers to your doubts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Ask Your Doubt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Type your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px]"
              disabled={submitting}
            />
            <Button type="submit" disabled={submitting || !question.trim()} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Getting Answer...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Ask Question
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Questions</h2>
        {doubts.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No questions asked yet. Start by asking your first doubt above!
            </CardContent>
          </Card>
        ) : (
          doubts.map((doubt) => (
            <Card key={doubt.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{doubt.question}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(doubt.created_at).toLocaleString()}
                      </span>
                      <Badge variant={doubt.status === "answered" ? "default" : "secondary"}>
                        {doubt.status}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(doubt.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              {doubt.answer && (
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap">{doubt.answer}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
