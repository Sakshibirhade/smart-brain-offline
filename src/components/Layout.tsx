import { NavLink } from "@/components/NavLink";
import { Home, BookOpen, Brain, Gamepad2, User } from "lucide-react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-gradient-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">SmartStudy</h1>
          <p className="text-sm opacity-90">Learn Anywhere, Anytime</p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      <nav className="bg-card border-t border-border sticky bottom-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <NavLink
              to="/"
              className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors hover:bg-muted"
              activeClassName="text-primary bg-muted"
            >
              <Home size={24} />
              <span className="text-xs">Home</span>
            </NavLink>

            <NavLink
              to="/subjects"
              className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors hover:bg-muted"
              activeClassName="text-primary bg-muted"
            >
              <BookOpen size={24} />
              <span className="text-xs">Subjects</span>
            </NavLink>

            <NavLink
              to="/assistant"
              className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors hover:bg-muted"
              activeClassName="text-primary bg-muted"
            >
              <Brain size={24} />
              <span className="text-xs">AI Help</span>
            </NavLink>

            <NavLink
              to="/games"
              className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors hover:bg-muted"
              activeClassName="text-primary bg-muted"
            >
              <Gamepad2 size={24} />
              <span className="text-xs">Games</span>
            </NavLink>

            <NavLink
              to="/profile"
              className="flex flex-col items-center gap-1 p-2 rounded-lg transition-colors hover:bg-muted"
              activeClassName="text-primary bg-muted"
            >
              <User size={24} />
              <span className="text-xs">Profile</span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};
