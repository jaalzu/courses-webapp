'use client';

import { useUserList } from '@/entities/user/hooks/useUserList';
import { useCourseStore } from '@/entities/course/model/useCourseStore';
import { useProgressStore } from '@/entities/progress/model/useProgressStore';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { StatsCard, UserProgressTable, PopularCourses } from '@/widgets/Metrics/Metrics';


export default function MetricsPage() {
  const { currentUser } = useAuthStore();
  const { users } = useUserList();
  const { courses } = useCourseStore();
  const { progress } = useProgressStore();
  
  console.log('=== DEBUG METRICS ===');
  console.log('Total users:', users.length);
  console.log('Total courses:', courses.length);
  console.log('Total progress entries:', progress.length);
  
  // Ver un ejemplo de curso
  if (courses.length > 0) {
    console.log('Ejemplo curso 1:', {
      id: courses[0].id,
      title: courses[0].title,
      totalLessons: courses[0].lessons.length,
      lessonIds: courses[0].lessons.map(l => l.id)
    });
  }
  
  // Ver progreso del primer usuario
  if (users.length > 0) {
    const firstUser = users[0];
    const userProg = progress.filter(p => p.userId === firstUser.id);
    console.log(`Progreso de ${firstUser.name}:`, userProg);
  }
  
  // DERIVAR TODAS LAS MÉTRICAS
  const metrics = {
    // Stats básicas
    totalUsers: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    students: users.filter(u => u.role === 'user').length,
    totalCourses: courses.length,
    
    // Usuarios con progreso detallado
    usersWithProgress: users.map(user => {
      // Progreso de lecciones de este usuario
      const userProgress = progress.filter(p => p.userId === user.id);
      
      // Cursos completados: un curso está completo si todas sus lecciones están completadas
      const completedCourses = courses.filter(course => {
        const courseLessonIds = course.lessons.map(l => l.id);
        const completedLessonIds = userProgress
          .filter(p => p.courseId === course.id && p.completed)
          .map(p => p.lessonId);
        
        // El curso está completo si todas las lecciones están completadas
        return courseLessonIds.length > 0 && 
               courseLessonIds.every(id => completedLessonIds.includes(id));
      });
      
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        completedCourses: completedCourses,
        totalLessonsCompleted: userProgress.filter(p => p.completed).length,
        totalLessonsInProgress: userProgress.length
      };
    }),
    
    // Cursos más populares (por cantidad de usuarios que lo completaron)
    popularCourses: courses
      .map(course => {
        // Contar cuántos usuarios completaron TODAS las lecciones de este curso
        const completionCount = users.filter(user => {
          const userProgress = progress.filter(p => p.userId === user.id && p.courseId === course.id);
          const courseLessonIds = course.lessons.map(l => l.id);
          const completedLessonIds = userProgress
            .filter(p => p.completed)
            .map(p => p.lessonId);
          
          return courseLessonIds.length > 0 && 
                 courseLessonIds.every(id => completedLessonIds.includes(id));
        }).length;
        
        return {
          id: course.id.toString(),
          title: course.title,
          completionCount
        };
      })
      .sort((a, b) => b.completionCount - a.completionCount)
  };
  
  // Total de cursos completados por todos los usuarios
  const totalCoursesCompleted = metrics.usersWithProgress.reduce(
    (sum, user) => sum + user.completedCourses.length, 
    0
  );
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Métricas del Sistema</h1>
          <p className="text-gray-600 mt-2">Panel de administración y estadísticas</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard 
            title="Total Usuarios" 
            value={metrics.totalUsers} 
            icon="👥" 
            color=""
          />
          <StatsCard 
            title="Administradores" 
            value={metrics.admins} 
            icon="👑" 
            color=""
          />
          <StatsCard 
            title="Estudiantes" 
            value={metrics.students} 
            icon="🎓" 
            color=""
          />
        </div>
        
        {/* Popular Courses */}
        <div className="mb-8">
          <PopularCourses courses={metrics.popularCourses} />
        </div>
        
        {/* Users Table */}
        <UserProgressTable users={metrics.usersWithProgress} />
      </div>
    </div>
  );
}