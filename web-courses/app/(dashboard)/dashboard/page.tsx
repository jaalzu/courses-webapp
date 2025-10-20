'use client'
import Card from "@/components/ui/Card"

export default function DashboardPage() {
const cursos = [
  {
    id: 1,
    title: "Curso 1",
    description: "Aprende React básico",
    image: "/curso1.jpg",
    progress: 40,
    done: 2,
    total: 5,
  },
  {
    id: 2,
    title: "Curso 2",
    description: "Aprende Next.js",
    image: "/curso2.jpg",
    progress: 20,
    done: 1,
    total: 5,
  },
  {
    id: 3,
    title: "Curso 3",
    description: "JavaScript avanzado",
    image: "/curso3.jpg",
    progress: 60,
    done: 3,
    total: 5,
  },
]


return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {cursos.map((curso) => (
   <div
  key={curso.id}
  className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto"
>
  <Card
    image={curso.image}
    title={curso.title}
    description={curso.description}
    progress={curso.progress}
    completed={{ done: curso.done, total: curso.total }}
    className="mx-auto" // <--- asegura que la card se centre
  />
</div>

  ))}
</div>

)}
