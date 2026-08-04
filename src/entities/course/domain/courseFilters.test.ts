import { describe, expect, it } from "vitest";
import { filterCourses } from "./courseFilters";
import type { Course } from "../types";

const makeCourse = (overrides: Partial<Course>): Course =>
  ({
    id: "course-1",
    title: "Bases de cocina",
    description: "Tecnicas iniciales",
    image: "",
    duration: "2h",
    instructor: "Mentor",
    level: "beginner",
    video: "",
    keyPoints: [],
    lessons: [],
    is_initial: false,
    is_published: true,
    created_at: "",
    updated_at: "",
    ...overrides,
  }) as Course;

describe("filterCourses", () => {
  const courses = [
    makeCourse({ id: "1", title: "Pastas frescas", level: "beginner" }),
    makeCourse({
      id: "2",
      title: "Fermentos",
      description: "Pan de masa madre",
      level: "intermediate",
    }),
    makeCourse({ id: "3", title: "Menu degustacion", level: "advanced" }),
  ];

  it("filters by level", () => {
    expect(filterCourses(courses, { level: "intermediate" })).toEqual([
      courses[1],
    ]);
  });

  it("searches by title and description", () => {
    expect(filterCourses(courses, { search: "masa" })).toEqual([courses[1]]);
    expect(filterCourses(courses, { search: "pastas" })).toEqual([courses[0]]);
  });

  it("combines filters", () => {
    expect(
      filterCourses(courses, { level: "advanced", search: "pastas" }),
    ).toEqual([]);
  });
});

