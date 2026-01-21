import { CoursePageWrapper } from '@/widgets/courseContent/CoursePageWrapper'

export const dynamic = 'force-dynamic'

export default async function CoursePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  
  return <CoursePageWrapper courseId={id} />
}