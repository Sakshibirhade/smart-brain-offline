import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "./pages/Home";
import BookSlot from "./pages/BookSlot";
import ScanQR from "./pages/ScanQR";
import TrackCar from "./pages/TrackCar";
import UserProfile from "./pages/UserProfile";
import PhoneAuth from "./pages/PhoneAuth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/phone-auth" element={<PhoneAuth />} />
            <Route path="/" element={<Home />} />
            <Route path="/book-slot" element={<BookSlot />} />
            <Route path="/scan" element={<ScanQR />} />
            <Route path="/track-car" element={<TrackCar />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
