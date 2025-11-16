import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Clock, Award, Microscope } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/hooks/use-toast";
import { AudioPlayer } from "@/components/AudioPlayer";
import { CellDiagram } from "@/components/biology/CellDiagram";
import { DigestiveSystem } from "@/components/biology/DigestiveSystem";
import { HeartDiagram } from "@/components/biology/HeartDiagram";
import { DNAStructure } from "@/components/biology/DNAStructure";
import { Photosynthesis } from "@/components/biology/Photosynthesis";
import { RespiratorySystem } from "@/components/biology/RespiratorySystem";

// Lazy load chemistry components
const AtomStructure = lazy(() => import("@/components/chemistry/AtomStructure"));
const PeriodicTable = lazy(() => import("@/components/chemistry/PeriodicTable"));
const ChemicalBonding = lazy(() => import("@/components/chemistry/ChemicalBonding"));
const PHScale = lazy(() => import("@/components/chemistry/PHScale"));

export default function Topics() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [aiContent, setAiContent] = useState<string>("");
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    loadTopic();
  }, [topicId]);

  useEffect(() => {
    if (topic && !topic.content && topic.chapters?.subjects?.name) {
      generateContent();
    }
  }, [topic]);

  const generateContent = async () => {
    if (!topic) return;
    
    setIsGeneratingContent(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-topic-content', {
        body: {
          topicName: topic.name,
          subjectName: topic.chapters?.subjects?.name,
          difficulty: topic.difficulty || 'medium'
        }
      });

      if (error) {
        console.error('Error generating content:', error);
        toast({
          title: "Content Generation Failed",
          description: "Unable to generate detailed content. Please try again.",
          variant: "destructive"
        });
        return;
      }

      if (data?.content) {
        setAiContent(data.content);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const loadTopic = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: topicData } = await supabase
        .from("topics")
        .select("*, chapters(name, subjects(name))")
        .eq("id", topicId)
        .single();

      setTopic(topicData);

      const { data: progressData } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("topic_id", topicId)
        .maybeSingle();

      setProgress(progressData);
    } catch (error) {
      console.error("Error loading topic:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (progress) {
        await supabase
          .from("user_progress")
          .update({ completed: true })
          .eq("id", progress.id);
      } else {
        await supabase
          .from("user_progress")
          .insert({
            user_id: user.id,
            topic_id: topicId,
            completed: true,
          });
      }

      toast({
        title: t("success"),
        description: "Topic marked as complete!",
      });

      loadTopic();
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-12">{t("loading")}</div>;
  }

  if (!topic) {
    return <div className="text-center py-12">Topic not found</div>;
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
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            {topic.chapters?.subjects?.name} → {topic.chapters?.name}
          </p>
          <h1 className="text-2xl font-bold">{topic.name}</h1>
        </div>
        {(aiContent || topic.content) && (
          <AudioPlayer text={aiContent || topic.content} />
        )}
      </div>

      <div className="flex gap-2">
        <Badge variant="secondary">{t(topic.difficulty)}</Badge>
        {topic.estimated_time && (
          <Badge variant="outline" className="gap-1">
            <Clock className="w-3 h-3" />
            {t("estimatedTime", { minutes: topic.estimated_time.toString() })}
          </Badge>
        )}
        {progress?.completed && (
          <Badge className="gap-1">
            <Award className="w-3 h-3" />
            {t("completed")}
          </Badge>
        )}
      </div>

      {/* Biology and Chemistry Visualizations */}
      {(topic.chapters?.subjects?.name === "Biology" || topic.chapters?.subjects?.name === "Chemistry" || topic.chapters?.subjects?.name === "Science") && (
        <Card className="glass-effect shadow-card border-2 border-primary/30">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Microscope className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Interactive Visualization</h3>
                <p className="text-sm text-muted-foreground">Explore concepts visually</p>
              </div>
            </div>
            
            {/* Biology visualizations */}
            {topic.name.toLowerCase().includes("cell") && <CellDiagram />}
            {topic.name.toLowerCase().includes("digest") && <DigestiveSystem />}
            {(topic.name.toLowerCase().includes("heart") || topic.name.toLowerCase().includes("circulat")) && <HeartDiagram />}
            {(topic.name.toLowerCase().includes("dna") || topic.name.toLowerCase().includes("gene")) && <DNAStructure />}
            {(topic.name.toLowerCase().includes("photo") || topic.name.toLowerCase().includes("plant")) && <Photosynthesis />}
            {(topic.name.toLowerCase().includes("respirat") || topic.name.toLowerCase().includes("breath") || topic.name.toLowerCase().includes("lung")) && <RespiratorySystem />}
            
            {/* Chemistry visualizations */}
            <Suspense fallback={<div>Loading...</div>}>
              {(topic.name.toLowerCase().includes("atom") || topic.name.toLowerCase().includes("structure of atom")) && <AtomStructure />}
              {(topic.name.toLowerCase().includes("periodic") || topic.name.toLowerCase().includes("classification")) && <PeriodicTable />}
              {topic.name.toLowerCase().includes("bonding") && <ChemicalBonding />}
              {(topic.name.toLowerCase().includes("ph") || topic.name.toLowerCase().includes("acid") || topic.name.toLowerCase().includes("base")) && <PHScale />}
            </Suspense>
          </CardContent>
        </Card>
      )}

      {/* Main Content Section */}
      <Card className="glass-effect shadow-card border-2">
        <CardContent className="pt-6">
          {isGeneratingContent ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow animate-pulse">
                  <Microscope className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Generating Detailed Content...</h3>
                  <p className="text-sm text-muted-foreground">Our AI is creating a comprehensive explanation for you</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-muted/50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-5/6"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-4/6"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ) : (
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown>
                {aiContent || topic.content || "Content coming soon..."}
              </ReactMarkdown>
            </div>
          )}
          
          {aiContent && !isGeneratingContent && (
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="outline">AI-Generated Content</Badge>
                <span>This comprehensive explanation was created by AI to help you learn better</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {topic.video_url && (
        <Card>
          <CardContent className="pt-6">
            <video
              className="w-full rounded-lg"
              controls
              src={topic.video_url}
            >
              Your browser does not support the video tag.
            </video>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4">
        {!progress?.completed && (
          <Button onClick={markAsComplete} className="flex-1">
            {t("markComplete")}
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => navigate(`/quiz/${topicId}`)}
          className="flex-1"
        >
          {t("takeQuiz")}
        </Button>
      </div>
    </div>
  );
}
