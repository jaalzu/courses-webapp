import { courseQueries as realCourseQueries } from "@/shared/lib/supabase/queries/courses";
import { courseQueries as mockCourseQueries } from "@/shared/mock/queries/courses";
import { lessonQueries } from "@/shared/lib/supabase/queries/lessons";
import type { Course, CreateCourseInput } from "@/entities/course/types";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";
const courseQueries = USE_MOCKS ? mockCourseQueries : realCourseQueries;

export const coursesApi = {
  async getAll() {
    const { data, error } = await courseQueries.getAll();
    if (error) throw new Error(error.message);
    return data || [];
  },

  async getById(courseId: string): Promise<Course> {
    const { data, error } = await courseQueries.getById(courseId);

    if (error) throw new Error(error.message);
    if (!data) throw new Error("Curso no encontrado");

    return data;
  },

  async create(course: CreateCourseInput) {
    const { data, error } = await courseQueries.create(course);
    if (error) throw new Error(error.message);
    if (!data) throw new Error("No se pudo crear el curso");
    return data;
  },

  async update(courseId: string, updates: Partial<Course>) {
    if (USE_MOCKS) {
      const { data, error } = await mockCourseQueries.update(courseId, updates);
      if (error) throw new Error(error.message);
      // El mock ya guarda "lessons" como parte del curso, no hace falta sync aparte
      return data;
    }

    // Camino real: sigue pegándole a la API route
    const res = await fetch(`/api/courses/${courseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al actualizar");
    }

    const result = await res.json();
    if (updates.lessons) {
      await lessonQueries.syncLessons(courseId, updates.lessons);
    }
    return result.data;
  },

  async delete(courseId: string) {
    if (USE_MOCKS) {
      const { error } = await mockCourseQueries.delete(courseId);
      if (error) throw new Error(error.message);
      return true;
    }

    const res = await fetch(`/api/courses/${courseId}`, { method: "DELETE" });
    if (!res.ok) {
      const error = await res.json();
      throw error;
    }
    return true;
  },
};
