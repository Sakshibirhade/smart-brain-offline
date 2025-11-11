import { QuizResult, UserProfile } from "@/types/study";

const STORAGE_KEYS = {
  QUIZ_RESULTS: "smartstudy_quiz_results",
  USER_PROFILE: "smartstudy_user_profile",
  COMPLETED_CHAPTERS: "smartstudy_completed_chapters",
};

export const storage = {
  // Quiz Results
  getQuizResults: (): QuizResult[] => {
    const data = localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS);
    return data ? JSON.parse(data) : [];
  },

  saveQuizResult: (result: QuizResult) => {
    const results = storage.getQuizResults();
    results.push(result);
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results));
  },

  // User Profile
  getUserProfile: (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data
      ? JSON.parse(data)
      : {
          username: "Student",
          totalQuizzes: 0,
          averageScore: 0,
          completedChapters: 0,
          studyStreak: 1,
        };
  },

  updateUserProfile: (profile: Partial<UserProfile>) => {
    const current = storage.getUserProfile();
    const updated = { ...current, ...profile };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
  },

  // Completed Chapters
  getCompletedChapters: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_CHAPTERS);
    return data ? JSON.parse(data) : [];
  },

  markChapterComplete: (chapterId: string) => {
    const completed = storage.getCompletedChapters();
    if (!completed.includes(chapterId)) {
      completed.push(chapterId);
      localStorage.setItem(
        STORAGE_KEYS.COMPLETED_CHAPTERS,
        JSON.stringify(completed)
      );
    }
  },
};
