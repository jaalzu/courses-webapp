'use client'
import Card from "@/components/ui/Card"
import { cursos } from "@/lib/data/cursos"

export default function DashboardPage() {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        xl:grid-cols-3 
        gap-x-3
        xl:gap-x-8
        gap-y-9
        justify-items-center 
        p-6
      "
    >
      {cursos.map(({id,image,title,description,progress,done,total}) => (
       <Card
  key={id}
  image={image}
  title={title}
  description={description}
  progress={progress}
  completed={{ done, total }}
  href={`/dashboard/cursos/${id}`} // 👈 o la ruta que quieras
  className="
    w-[100%] 
    sm:w-[90%] 
    md:w-[100%] 
    lg:w-[95%] 
    xl:w-[97%]
  "
/>

      ))}
    </div>
  )
}