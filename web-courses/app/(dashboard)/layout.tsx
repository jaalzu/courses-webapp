'use client'
import { SidebarProvider, SidebarTrigger } from "@/components/sidebar/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
           <body >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full px-3 py-10">
            <SidebarTrigger className="md:hidden"/>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}