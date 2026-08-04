import type { Course, CourseLevel } from "../types";

export type CourseFilters = {
  level?: CourseLevel | "";
  search?: string;
};

export function filterCourses(courses: Course[], filters: CourseFilters) {
  const normalizedSearch = filters.search?.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesLevel = !filters.level || course.level === filters.level;
    const matchesSearch =
      !normalizedSearch ||
      course.title.toLowerCase().includes(normalizedSearch) ||
      course.description.toLowerCase().includes(normalizedSearch);

    return matchesLevel && matchesSearch;
  });
}

