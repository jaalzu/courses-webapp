import type { Course, CreateCourseInput } from "../types";

export type CourseRepository = {
  findAll(): Promise<Course[]>;
  findById(courseId: string): Promise<Course>;
  create(course: CreateCourseInput): Promise<Course>;
  update(courseId: string, updates: Partial<Course>): Promise<Course>;
  delete(courseId: string): Promise<boolean>;
};

