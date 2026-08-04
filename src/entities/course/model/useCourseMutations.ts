import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { coursesApi } from "@/entities/course/application/coursesApi";
import { getAuthErrorMessage } from "@/shared/lib/supabase/errorHandler";
import type { Course, CreateCourseInput } from "../types";

const handleFriendlyError = (error: any, defaultMessage: string) => {
  console.error("Error tecnico detallado:", error);

  if (
    error?.code === "23503" ||
    error?.message?.includes("violates foreign key constraint")
  ) {
    return "No se puede eliminar: existen alumnos, favoritos o mensajes del foro vinculados a este curso.";
  }

  if (error?.message?.includes("fetch") || error?.message?.includes("Network")) {
    return "Error de conexion. Revisa tu internet e intenta de nuevo.";
  }

  if (typeof error === "string") return error;

  return error.message || defaultMessage;
};

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCourse: CreateCourseInput) =>
      coursesApi.createCourse(newCourse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Curso creado exitosamente");
    },
    onError: (error: any) => {
      toast.error(handleFriendlyError(error, "Error al crear el curso"));
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      courseId,
      updates,
    }: {
      courseId: string;
      updates: Partial<Course>;
    }) => coursesApi.updateCourse(courseId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Curso actualizado");
    },
    onError: (error: any) => {
      toast.error(handleFriendlyError(error, "Error al actualizar el curso"));
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coursesApi.deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("Curso eliminado");
    },
    onError: (error: any) => {
      const message = getAuthErrorMessage(error);
      toast.error(message);
    },
  });
}

