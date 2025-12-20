'use client'

import { MOCK_COURSES } from "@/shared/mocks/curso"
import type { Course } from "../model/types"

export function useCourses(): Course[] {
  return MOCK_COURSES
}
