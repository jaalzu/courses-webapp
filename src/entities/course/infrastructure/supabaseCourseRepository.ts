import { supabase } from "@/shared/lib/supabase/client";
import { lessonQueries } from "@/shared/lib/supabase/queries/lessons";
import type { Course, CreateCourseInput } from "../types";
import type { CourseRepository } from "../domain/courseRepository";
import { mapCourseToDbCourse, mapDbCourseToCourse } from "./courseMapper";

const toError = (message: string) => new Error(message);

export const supabaseCourseRepository: CourseRepository = {
  async findAll() {
    const { data, error } = await supabase
      .from("courses")
      .select("*, lessons(*)")
      .order("created_at", { ascending: true });

    if (error) throw toError(error.message);

    return (data || []).map(mapDbCourseToCourse);
  },

  async findById(courseId: string) {
    const { data, error } = await supabase
      .from("courses")
      .select("*, lessons(*)")
      .eq("id", courseId)
      .maybeSingle();

    if (error) throw toError(error.message);
    if (!data) throw toError("Curso no encontrado");

    return mapDbCourseToCourse(data);
  },

  async create(course: CreateCourseInput) {
    const { data, error } = await supabase
      .from("courses")
      .insert(mapCourseToDbCourse(course))
      .select()
      .single();

    if (error) throw toError(error.message);
    if (!data) throw toError("No se pudo crear el curso");

    return mapDbCourseToCourse(data);
  },

  async update(courseId: string, updates: Partial<Course>) {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const error = await response.json();
      throw toError(error.error || "Error al actualizar");
    }

    const result = await response.json();

    if (updates.lessons) {
      await lessonQueries.syncLessons(courseId, updates.lessons);
    }

    return result.data;
  },

  async delete(courseId: string) {
    const response = await fetch(`/api/courses/${courseId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw toError(error.error || error.message || "Error al eliminar");
    }

    return true;
  },
};

