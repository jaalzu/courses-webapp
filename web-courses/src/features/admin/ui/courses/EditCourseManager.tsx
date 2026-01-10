'use client'
import EditCourseBasicModal from "./EditCourseBasicModal"
import { useEditCourseFlow } from "../../hooks/useEditCourseFlow"

interface Props {
  flow: ReturnType<typeof useEditCourseFlow>
}

export default function EditCourseManager({ flow }: Props) {
  if (!flow.course) return null

  return (
    <EditCourseBasicModal
      course={flow.course}
      isOpen={flow.step !== 'closed'}
      onClose={flow.close}
    />
  )
}