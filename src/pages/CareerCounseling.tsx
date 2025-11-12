import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, TrendingUp, Target, Users, Wifi, WifiOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CareerCounseling() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [topic, setTopic] = useState("");
  const { toast } = useToast();

  // Monitor online status
  useState(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

  const careerPaths = [
    {
      title: "Software Engineering",
      description: "Build applications, systems, and innovative solutions",
      skills: ["Programming", "Problem Solving", "Algorithms"],
      icon: "💻",
    },
    {
      title: "Data Science & AI",
      description: "Analyze data and create intelligent systems",
      skills: ["Machine Learning", "Statistics", "Python"],
      icon: "🤖",
    },
    {
      title: "Cybersecurity",
      description: "Protect systems and data from threats",
      skills: ["Network Security", "Ethical Hacking", "Cryptography"],
      icon: "🔐",
    },
    {
      title: "Product Management",
      description: "Lead product development and strategy",
      skills: ["Leadership", "Communication", "Market Analysis"],
      icon: "📊",
    },
    {
      title: "UI/UX Design",
      description: "Create beautiful and intuitive user experiences",
      skills: ["Design Thinking", "Prototyping", "User Research"],
      icon: "🎨",
    },
    {
      title: "Cloud Architecture",
      description: "Design and manage scalable cloud infrastructure",
      skills: ["AWS/Azure", "DevOps", "System Design"],
      icon: "☁️",
    },
  ];

  const handleSearchCareer = () => {
    if (!isOnline) {
      toast({
        title: "No Internet Connection",
        description: "Career search requires an internet connection",
        variant: "destructive",
      });
      return;
    }

    if (topic.trim()) {
      // In a real app, this would call an AI API
      toast({
        title: "Feature Coming Soon!",
        description: `AI-powered career guidance for "${topic}" will be available soon.`,
      });
    }
  };

  return (
    <Layout>
      <div className="space-y-8 pb-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Briefcase className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Career Counseling
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover your career path and get personalized guidance for your future
          </p>

          {/* Online Status */}
          <div className="flex items-center justify-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-success" />
                <span className="text-sm text-success">Online - AI guidance available</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">Offline - Limited features</span>
              </>
            )}
          </div>
        </div>

        {/* AI Career Search (Requires Internet) */}
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              AI Career Assistant
            </CardTitle>
            <CardDescription>
              Ask our AI about career paths, skills needed, or job market trends
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="e.g., 'What skills do I need for AI engineering?'"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearchCareer()}
                disabled={!isOnline}
              />
              <Button onClick={handleSearchCareer} disabled={!isOnline}>
                Ask AI
              </Button>
            </div>
            {!isOnline && (
              <p className="text-sm text-muted-foreground">
                ⚠️ This feature requires an internet connection
              </p>
            )}
          </CardContent>
        </Card>

        {/* Career Paths */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Popular Career Paths</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerPaths.map((career, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{career.icon}</div>
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                  <CardDescription>{career.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-muted-foreground">Key Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Career Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Career Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold">Set Clear Goals</h3>
                  <p className="text-sm text-muted-foreground">
                    Define short-term and long-term career objectives
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">📚</span>
                <div>
                  <h3 className="font-semibold">Continuous Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay updated with industry trends and new technologies
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🤝</span>
                <div>
                  <h3 className="font-semibold">Build Your Network</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with professionals and join communities
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <h3 className="font-semibold">Gain Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Internships, projects, and real-world applications matter
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
