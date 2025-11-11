export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  chapters: Chapter[];
  progress: number;
}

export interface Chapter {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
}

export interface Quiz {
  id: string;
  subjectId: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  quizId: string;
  subjectId: string;
  score: number;
  total: number;
  date: string;
}

export interface UserProfile {
  username: string;
  totalQuizzes: number;
  averageScore: number;
  completedChapters: number;
  studyStreak: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface FlashCard {
  id: string;
  question: string;
  answer: string;
  subjectId: string;
}
