import { courseQueries } from "@/shared/mock/queries/courses";
import type { Course, CreateCourseInput } from "../types";
import type { CourseRepository } from "../domain/courseRepository";

function throwIfError(error: { message?: string } | null | undefined) {
  if (error) throw new Error(error.message || "Error de cursos");
}

export const mockCourseRepository: CourseRepository = {
  async findAll() {
    const { data, error } = await courseQueries.getAll();
    throwIfError(error);
    return data || [];
  },

  async findById(courseId: string) {
    const { data, error } = await courseQueries.getById(courseId);
    throwIfError(error);
    if (!data) throw new Error("Curso no encontrado");
    return data;
  },

  async create(course: CreateCourseInput) {
    const { data, error } = await courseQueries.create(course);
    throwIfError(error);
    if (!data) throw new Error("No se pudo crear el curso");
    return data;
  },

  async update(courseId: string, updates: Partial<Course>) {
    const { data, error } = await courseQueries.update(courseId, updates);
    throwIfError(error);
    if (!data) throw new Error("Curso no encontrado");
    return data;
  },

  async delete(courseId: string) {
    const { error } = await courseQueries.delete(courseId);
    throwIfError(error);
    return true;
  },
};

