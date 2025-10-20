'use client'
import Card from "@/components/ui/Card"

export default function DashboardPage() {
  const cursos = [
    {
      id: 1,
      title: "Curso 1",
      description: "Aprende algo",
      image: "/images/curso1.jpg",
      progress: 50
    },
    {
      id: 2,
      title: "Curso 2",
      description: "Aprende otra cosa",
      image: "/images/curso2.jpg",
      progress: 20
    },
    {
      id: 3,
      title: "Curso 3",
      description: "Curso avanzado",
      image: "/images/curso3.jpg",
      progress: 75
    }
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cursos.map((curso) => (
        <Card
          key={curso.id}
          image={curso.image}
          title={curso.title}
          description={curso.description}
          progress={curso.progress}
          className="cursor-pointer"
        />
      ))}
    </div>
  )
}
