import { mockCourseRepository } from "./mockCourseRepository";
import { supabaseCourseRepository } from "./supabaseCourseRepository";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export const courseRepository = USE_MOCKS
  ? mockCourseRepository
  : supabaseCourseRepository;

