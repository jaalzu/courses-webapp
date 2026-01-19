'use client'

import Image from 'next/image'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'

export function CommunitySection() {
  const communityAvatars = [
    '/icons/avatar/avatar1.webp',
    '/icons/avatar/avatar2.svg',
    '/icons/avatar/avatar3.svg'
  ]

  return (
    <DashboardLayout
      title="Comunidad"
      description="Unite a nuestra comunidad y conectá con otros desarrolladores"
    >
      {/* Sección Principal */}
      <section className="relative w-full py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto */}
          <div className="flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Unite a nuestro servidor oficial de{' '}
              <span className="text-[#5865F2]">Discord</span>
            </h2>

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl">
              Sumate a la comunidad para compartir ideas, resolver dudas,
              participar en charlas y acceder a todo el material exclusivo.
            </p>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 mt-10 px-10 py-4 rounded-xl bg-[#5865F2] text-white font-bold text-base md:text-lg hover:bg-[#4752c4] transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#5865F2]/20 w-auto min-w-[200px]"
            >
              <Image 
                src="/icons/svg/discord.svg"
                alt="Discord Icon" 
                width={24} 
                height={24} 
                className="brightness-0 invert" 
              />
              UNIRSE AHORA
            </a>
          </div>

          {/* Imagen + Social Proof */}
          <div className="flex flex-col items-center gap-6 lg:items-end">
            <div className="relative">
              <Image
                src="/discord.webp"
                alt="Comunidad en Discord"
                width={1000}
                height={700}
                priority
                className="w-full h-auto max-w-[550px] lg:max-w-none object-contain drop-shadow-2xl"
              />
            </div>

            {/* Contenedor de Píldoras con bordes claros */}
            <div className="flex flex-wrap justify-center lg:justify-end gap-3">
              <div className="flex items-center gap-3 bg-secondary/40 backdrop-blur-md p-2 px-4 rounded-full border border-border/60 dark:border-white/20 shadow-sm">
                <div className="flex -space-x-2">
                  {communityAvatars.map((src, index) => (
                    <div key={index} className="relative h-7 w-7 rounded-full ring-2 ring-background bg-muted overflow-hidden">
                      <Image src={src} alt="Member" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-foreground/90">
                  +100 miembros activos
                </p>
              </div>

              <div className="flex items-center gap-3 bg-secondary/40 backdrop-blur-md p-2 px-4 rounded-full border border-border/60 dark:border-white/20 shadow-sm">
                <p className="text-sm font-semibold text-foreground/90">
                  +100hs de material GRATIS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* --- Nueva Sección: Quote --- */}
      <section className="w-full py-5 mt-2 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="relative inline-block">
            {/* Comillas decorativas */}
            
            <blockquote className="text-2xl md:text-3xl lg:text-4xl italic font-medium text-foreground leading-relaxed">
             La duda es uno de los nombres de la inteligencia.
            </blockquote>
          </div>
          
          <footer className="mt-8 flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-border"></div>
            <cite className="text-base font-semibold text-muted-foreground not-italic tracking-widest uppercase">
              Jorge Luis Borges
            </cite>
            <div className="h-[1px] w-8 bg-border"></div>
          </footer>
        </div>
      </section>
    </DashboardLayout>
  )
}