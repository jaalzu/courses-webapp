import { useMutation, useQueryClient } from "@tanstack/react-query";
import { progressApi } from "@/shared/api/progress";
import type { LessonProgress } from "../types";

type ToggleLessonInput = {
  userId: string;
  courseId: string;
  lessonId: string;
  currentCompleted: boolean;
};

export const useProgressMutations = () => {
  const queryClient = useQueryClient();

  const toggleLesson = useMutation({
    mutationFn: ({
      userId,
      courseId,
      lessonId,
      currentCompleted,
    }: ToggleLessonInput) =>
      progressApi.toggleLesson(userId, courseId, lessonId, currentCompleted),

    onMutate: async (variables) => {
      const { userId, lessonId, currentCompleted, courseId } = variables;
      const queryKey = ["progress", "user", userId];

      await queryClient.cancelQueries({ queryKey });

      const previousProgress =
        queryClient.getQueryData<LessonProgress[]>(queryKey);

      queryClient.setQueryData<LessonProgress[]>(queryKey, (old = []) => {
        if (currentCompleted) {
          return old.map((progress) =>
            progress.lessonId === lessonId
              ? { ...progress, completed: false, completedAt: undefined }
              : progress,
          );
        }

        const existing = old.find((progress) => progress.lessonId === lessonId);

        if (existing) {
          return old.map((progress) =>
            progress.lessonId === lessonId
              ? { ...progress, completed: true, completedAt: new Date() }
              : progress,
          );
        }

        return [
          ...old,
          {
            userId,
            courseId,
            lessonId,
            completed: true,
            completedAt: new Date(),
          },
        ];
      });

      return { previousProgress };
    },

    onError: (_err, variables, context) => {
      if (context?.previousProgress) {
        queryClient.setQueryData(
          ["progress", "user", variables.userId],
          context.previousProgress,
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["progress", "user", variables.userId],
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return {
    toggleLesson,
    isUpdating: toggleLesson.isPending,
  };
};

