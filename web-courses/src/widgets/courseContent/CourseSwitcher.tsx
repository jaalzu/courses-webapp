'use client'

import Link from "next/link"
import { useCourses } from '@/entities/course/model/useCourses'

import styles from "./courseSwitcher.module.css"

interface Props {
  currentCourseId: string
}

export function CourseSwitcher({ currentCourseId }: Props) {
  const { courses } = useCourses()
  const currentIndex = courses.findIndex(c => c.id === currentCourseId)
  const prevCourse = courses[currentIndex - 1]
  const nextCourse = courses[currentIndex + 1]

  if (!courses.length) return null

  return (
    <div className={styles.container}>
      {prevCourse ? (
        <Link href={`/curso/${prevCourse.id}`} className={styles.link}>
          ← {prevCourse.title}
        </Link>
      ) : <span />}

      {nextCourse ? (
        <Link href={`/curso/${nextCourse.id}`} className={styles.link}>
          {nextCourse.title} →
        </Link>
      ) : <span />}
    </div>
  )
}
