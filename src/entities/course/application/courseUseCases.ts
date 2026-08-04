import type { Course, CreateCourseInput } from "../types";
import type { CourseRepository } from "../domain/courseRepository";

const MAX_TITLE_LENGTH = 60;

export function createCourseUseCases(repository: CourseRepository) {
  return {
    listCourses() {
      return repository.findAll();
    },

    getCourse(courseId: string) {
      return repository.findById(courseId);
    },

    createCourse(course: CreateCourseInput) {
      if (course.title.length > MAX_TITLE_LENGTH) {
        throw new Error(
          `El titulo es demasiado largo (maximo ${MAX_TITLE_LENGTH} caracteres)`,
        );
      }

      return repository.create(course);
    },

    updateCourse(courseId: string, updates: Partial<Course>) {
      return repository.update(courseId, updates);
    },

    deleteCourse(courseId: string) {
      return repository.delete(courseId);
    },
  };
}

