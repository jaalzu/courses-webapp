import Card from "@/widgets/dashboard/Card"
import type { Course } from "@/entities/course/types"

type CoursesGridProps = {
  courses: Course[]
  onEdit: (id: number) => void
}

export function CoursesGrid({ courses, onEdit }: CoursesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-9 justify-items-center">
      {courses.map(({ id, image, title, description, level, lessons, ...rest }) => (
        <Card
          key={id}
          courseId={id}
          href={`/curso/${id}`}
          className="w-[100%] sm:w-[90%] md:w-[100%] lg:w-[95%] xl:w-[97%]"
          level={level}
          enableEdit
          courseData={{ id, image, title, description, level, lessons, ...rest }}
          onEdit={() => onEdit(id)}
        />
      ))}
    </div>
  )
}
