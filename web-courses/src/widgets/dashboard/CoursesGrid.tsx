import Card from "@/widgets/dashboard/Card"
import type { Course } from "@/entities/course/types"

type CoursesGridProps = {
  courses: Course[]
  onEdit: (id: string | number) => void
}

export function CoursesGrid({ courses, onEdit }: CoursesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-12 justify-items-center">
      {courses.map((course) => {
        if (!course.id) return null; 

        return (
          <Card
            key={course.id} 
            courseId={course.id}
            href={`/curso/${course.id}`}
            className="w-full"
            level={course.level}
            enableEdit
            courseData={course} 
            onEdit={() => onEdit(course.id)}
          />
        );
      })}
    </div>
  );
}
