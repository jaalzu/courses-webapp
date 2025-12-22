'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  HomeIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
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
  SidebarFooter,
  SidebarTrigger,
} from "@/widgets/sidebar/sidebar"

const items = [
  { title: "Inicio", url: "/dashboard", icon: HomeIcon },
  { title: "Perfil", url: "/perfil", icon: UserIcon },
  { title: "Favoritos", url: "/favoritos", icon: HeartIcon },
  { title: "FAQS", url: "/faqs", icon: QuestionMarkCircleIcon },
  { title: "Metricas", url: "/metricas", icon: PresentationChartBarIcon },
]

export function AppSidebar() {
  const pathname = usePathname()

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
              <span className="text-xs"></span>
            </div>
          </div>
          {/* Botón para cerrar el sidebar solo en mobile */}
          <SidebarTrigger className="md:hidden -mr-1" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
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
          <item.icon className="!w-5 !h-5 " />
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings" className="flex items-center gap-2 w-full">
                <Cog6ToothIcon className="w-5 h-5" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
