import { createCourseUseCases } from "./courseUseCases";
import { courseRepository } from "../infrastructure/courseRepository";

const courseUseCases = createCourseUseCases(courseRepository);

export const coursesApi = {
  ...courseUseCases,
  getAll: courseUseCases.listCourses,
  getById: courseUseCases.getCourse,
  create: courseUseCases.createCourse,
  update: courseUseCases.updateCourse,
  delete: courseUseCases.deleteCourse,
};
