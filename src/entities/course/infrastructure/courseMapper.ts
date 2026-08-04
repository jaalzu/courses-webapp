import type { Course } from "../types";
import { getCourseImage } from "@/shared/lib/supabase/storage";

type DbCourse = Record<string, any>;

export function mapDbCourseToCourse(dbCourse: DbCourse): Course {
  return {
    ...dbCourse,
    image: dbCourse.thumbnail_url ? getCourseImage(dbCourse.thumbnail_url) : "",
    level: dbCourse.difficulty || "beginner",
    keyPoints: dbCourse.key_points || [],
    is_initial: dbCourse.is_initial || false,
    lessons: (dbCourse.lessons || []).map((lesson: Record<string, any>) => ({
      ...lesson,
      duration: String(lesson.duration || "0"),
      videoUrl: lesson.video_url || "",
    })),
  } as Course;
}

export function mapCourseToDbCourse(course: Partial<Course>) {
  return {
    title: course.title,
    description: course.description,
    thumbnail_url: course.image || null,
    duration: course.duration || null,
    instructor: course.instructor || null,
    difficulty: course.level,
    key_points: course.keyPoints || [],
    is_initial: course.is_initial || false,
  };
}

