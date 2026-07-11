import { delay, getMockStore, mutateMockStore } from "../store";

export interface UserProgress {
  user_id: string;
  course_id: string;
  lesson_id: string;
  status: "not_started" | "in_progress" | "completed";
  completed_at?: string;
  updated_at: string;
}

export interface CourseProgressStats {
  user_id: string;
  course_id: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
}

export const progressQueries = {
  getUserProgress: async (userId: string) => {
    await delay();
    const store = getMockStore();
    const data = store.progress.filter((p) => p.user_id === userId);
    return { data, error: null };
  },

  getAllProgress: async () => {
    await delay();
    const store = getMockStore();
    return { data: [...store.progress], error: null };
  },

  getCourseProgress: async (userId: string, courseId: string) => {
    await delay();
    const store = getMockStore();
    const data = store.progress.filter(
      (p) => p.user_id === userId && p.course_id === courseId,
    );
    return { data, error: null };
  },

  updateLessonProgress: async (
    userId: string,
    courseId: string,
    lessonId: string,
    status: "not_started" | "in_progress" | "completed",
  ) => {
    await delay();
    mutateMockStore((s) => {
      const idx = s.progress.findIndex(
        (p) => p.user_id === userId && p.lesson_id === lessonId,
      );
      if (status === "not_started") {
        if (idx !== -1) s.progress.splice(idx, 1);
      } else if (idx !== -1) {
        s.progress[idx].status = status;
        s.progress[idx].updated_at = new Date().toISOString();
      } else {
        s.progress.push({
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          status,
          updated_at: new Date().toISOString(),
        });
      }
    });
    return { data: [], error: null };
  },

  markLessonComplete: async (
    userId: string,
    courseId: string,
    lessonId: string,
  ) => {
    await delay();
    mutateMockStore((s) => {
      const idx = s.progress.findIndex(
        (p) => p.user_id === userId && p.lesson_id === lessonId,
      );
      const now = new Date().toISOString();
      if (idx !== -1) {
        s.progress[idx].status = "completed";
        s.progress[idx].completed_at = now;
        s.progress[idx].updated_at = now;
      } else {
        s.progress.push({
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          status: "completed",
          completed_at: now,
          updated_at: now,
        });
      }
    });
    return { data: [], error: null };
  },

  getLessonProgress: async (userId: string, lessonId: string) => {
    await delay();
    const store = getMockStore();
    const data = store.progress.find(
      (p) => p.user_id === userId && p.lesson_id === lessonId,
    );
    return { data: data || null, error: null };
  },

  getProgressStats: async (userId: string) => {
    await delay();
    const store = getMockStore();
    const userProgress = store.progress.filter(
      (p) => p.user_id === userId && p.status === "completed",
    );

    const statsMap = new Map<string, CourseProgressStats>();
    for (const p of userProgress) {
      const course = store.courses.find((c) => c.id === p.course_id);
      if (!course) continue;
      const existing = statsMap.get(p.course_id) || {
        user_id: userId,
        course_id: p.course_id,
        total_lessons: course.lessons.length,
        completed_lessons: 0,
        progress_percentage: 0,
      };
      existing.completed_lessons += 1;
      existing.progress_percentage = Math.round(
        (existing.completed_lessons / existing.total_lessons) * 100,
      );
      statsMap.set(p.course_id, existing);
    }

    return { data: Array.from(statsMap.values()), error: null };
  },
};
