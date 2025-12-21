import type { User } from "@/entities/user/model/types"

export const LOCAL_USER: User = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Pepitso",
  email: "demoPepon@plataforma.dev",
  role: "user",
  avatar: "https://i.pravatar.cc/150?img=12",
  createdAt: new Date("2024-01-01"),
  assignedCourses: [1],
}
