'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  HomeIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  HeartIcon,
  PresentationChartBarIcon 
} from "@heroicons/react/24/outline"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
} from "@/widgets/sidebar/sidebar"

import { useAuthStore } from "@/features/auth/model/useAuthStore"

const items = [
  { 
    title: "Inicio",
     url: "/dashboard",
      icon: HomeIcon 
    },
  { 
    title: "Perfil",
     url: "/perfil",
      icon: UserIcon 
    },
  { 
    title: "Favoritos",
     url: "/favoritos",
      icon: HeartIcon 
    },
    { 
      title: "Metricas", 
      url: "/metricas", 
      icon: PresentationChartBarIcon, 
      isAdmin: true 
    },
    {
       title: "FAQS",
        url: "/faqs",
         icon: QuestionMarkCircleIcon
    },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { currentUser } = useAuthStore()

  // Filtramos los items basándonos en el rol del usuario actual
  const filteredItems = items.filter(item => {
    // Si el item requiere admin, validamos el rol
    if (item.isAdmin) {
      return currentUser?.role === 'admin'
    }
    // Si no requiere admin, se muestra siempre
    return true
  })

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg 
                            bg-black text-white 
                            dark:bg-white dark:text-black transition-colors duration-300">
              <HomeIcon className="size-5" />
            </div>

            <div className="flex flex-col gap-0.8 leading-none">
              <span className="font-semibold">Menu</span>
              <span className="text-xs text-gray-500 capitalize">{currentUser?.role || 'Invitado'}</span>
            </div>
          </div>
          <SidebarTrigger className="md:hidden -mr-1" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => {
                const isActive = pathname === item.url

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={`flex items-center gap-2 w-full px-2 py-1 rounded-md transition-colors duration-200
                          ${isActive
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "hover:bg-gray-300 dark:hover:bg-gray-800"
                          }`}
                      >
                        <item.icon className="!w-5 !h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}