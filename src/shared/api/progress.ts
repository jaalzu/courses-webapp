import { progressQueries as realProgressQueries } from "@/shared/lib/supabase/queries/progress";
import { progressQueries as mockProgressQueries } from "@/shared/mock/queries/progress";
import { supabase } from "@/shared/lib/supabase/client";
import type { LessonProgress } from "@/entities/progress/types";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";
const progressQueries = USE_MOCKS ? mockProgressQueries : realProgressQueries;

export const progressApi = {
  async getUserProgress(userId: string) {
    const { data, error } = await progressQueries.getUserProgress(userId);
    if (error) throw new Error(error.message);
    return mapProgressFromDb(data || []);
  },

  async getAllProgress() {
    if (USE_MOCKS) {
      const { data, error } = await mockProgressQueries.getAllProgress();
      if (error) throw new Error(error.message);
      return mapProgressFromDb(data || []);
    }

    const { data, error } = await supabase.from("user_progress").select("*");
    if (error) throw new Error(error.message);
    return mapProgressFromDb(data || []);
  },

  async toggleLesson(
    userId: string,
    courseId: string,
    lessonId: string,
    currentCompleted: boolean,
  ) {
    const newStatus = currentCompleted ? "not_started" : "completed";
    const { error } = await progressQueries.updateLessonProgress(
      userId,
      courseId,
      lessonId,
      newStatus,
    );
    if (error) throw new Error(error.message);
  },

  async markLessonComplete(userId: string, courseId: string, lessonId: string) {
    const { error } = await progressQueries.markLessonComplete(
      userId,
      courseId,
      lessonId,
    );
    if (error) throw new Error(error.message);
  },
};

function mapProgressFromDb(data: any[]): LessonProgress[] {
  return data.map((p: any) => ({
    userId: p.user_id,
    courseId: p.course_id,
    lessonId: p.lesson_id,
    completed: p.status === "completed",
    completedAt: p.completed_at ? new Date(p.completed_at) : undefined,
  }));
}
