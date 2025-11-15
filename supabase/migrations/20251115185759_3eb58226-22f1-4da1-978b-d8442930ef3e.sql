-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  criteria_type TEXT NOT NULL, -- 'topics_completed', 'streak_days', 'quiz_score', 'subjects_completed'
  criteria_value INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- RLS policies for achievements (everyone can view)
CREATE POLICY "Anyone can view achievements"
  ON public.achievements
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage achievements"
  ON public.achievements
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for user_achievements
CREATE POLICY "Users can view their own achievements"
  ON public.user_achievements
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements"
  ON public.user_achievements
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert some default achievements
INSERT INTO public.achievements (name, description, icon, criteria_type, criteria_value) VALUES
  ('First Steps', 'Complete your first topic', '🎯', 'topics_completed', 1),
  ('Getting Started', 'Complete 5 topics', '🌟', 'topics_completed', 5),
  ('Learning Machine', 'Complete 10 topics', '🚀', 'topics_completed', 10),
  ('Knowledge Seeker', 'Complete 25 topics', '📚', 'topics_completed', 25),
  ('Master Scholar', 'Complete 50 topics', '🏆', 'topics_completed', 50),
  ('Consistent Learner', 'Maintain a 3-day streak', '🔥', 'streak_days', 3),
  ('Dedicated Student', 'Maintain a 7-day streak', '⚡', 'streak_days', 7),
  ('Unstoppable', 'Maintain a 30-day streak', '💪', 'streak_days', 30),
  ('Quiz Master', 'Score 100% on a quiz', '🎓', 'quiz_score', 100),
  ('Subject Expert', 'Complete all topics in a subject', '👑', 'subjects_completed', 1);