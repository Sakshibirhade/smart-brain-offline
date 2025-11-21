import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { queryClient } from "./lib/queryClient";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import Chapters from "./pages/Chapters";
import Topics from "./pages/Topics";
import Doubts from "./pages/Doubts";
import Progress from "./pages/Progress";
import UserProfile from "./pages/UserProfile";
import Games from "./pages/Games";
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/*"
                element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
            <Route path="/subjects/:subjectId" element={<Subjects />} />
            <Route path="/chapters/:chapterId" element={<Chapters />} />
            <Route path="/topics/:topicId" element={<Topics />} />
            <Route path="/doubts" element={<Doubts />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/games" element={<Games />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
