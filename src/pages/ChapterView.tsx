import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subjects } from "@/data/subjects";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { storage } from "@/utils/storage";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

const ChapterView = () => {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const subject = subjects.find((s) => s.id === id);
  const chapter = subject?.chapters.find((c) => c.id === chapterId);

  const handleMarkComplete = () => {
    if (chapterId) {
      storage.markChapterComplete(chapterId);
      const profile = storage.getUserProfile();
      storage.updateUserProfile({
        completedChapters: profile.completedChapters + 1,
      });
      toast({
        title: "Chapter Complete! 🎉",
        description: "Great job! Keep up the learning momentum.",
      });
      navigate(`/subjects/${id}`);
    }
  };

  if (!subject || !chapter) {
    return <Layout><div>Chapter not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/subjects/${id}`)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to {subject.name}
        </Button>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">{chapter.title}</h2>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown>{chapter.notes}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleMarkComplete}
          className="w-full"
          size="lg"
        >
          <CheckCircle className="mr-2" />
          Mark as Complete
        </Button>
      </div>
    </Layout>
  );
};

export default ChapterView;
