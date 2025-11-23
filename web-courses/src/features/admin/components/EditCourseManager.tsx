'use client'
import { useEditCourseFlow } from "../hooks/useEditCourseFlow"
import EditCourseBasicModal from "./EditCourseBasicModal"
import EditCourseLessonsModal from "./EditCourseLessonsModal"

/**
 * Componente que maneja el flujo completo de edición de curso
 * Uso:
 * 
 * const editFlow = useEditCourseFlow()
 * 
 * <button onClick={() => editFlow.open(courseId)}>Editar</button>
 * <EditCourseManager flow={editFlow} />
 */

interface Props {
  flow: ReturnType<typeof useEditCourseFlow>
}

export default function EditCourseManager({ flow }: Props) {
  if (!flow.course) return null

  return (
    <>
      <EditCourseBasicModal
        course={flow.course}
        isOpen={flow.isBasicOpen}
        onClose={flow.close}
        onNext={flow.goToLessons}
      />

      <EditCourseLessonsModal
        course={flow.course}
        isOpen={flow.isLessonsOpen}
        onClose={flow.close}
        onBack={flow.goToBasic}
      />
    </>
  )
}