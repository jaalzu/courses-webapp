'use client'

import Image from 'next/image'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'

export function CommunitySection() {
  return (
    <DashboardLayout
      title="Comunidad"
      description="Unite a nuestra comunidad y conectá con otros desarrolladores"
    >
      <section className="relative w-full overflow-hidden">
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Unite a nuestro servidor de Discord
            </h2>

            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              Sumate a la comunidad para compartir ideas, resolver dudas,
              participar en charlas y mantenerte al día con novedades y
              contenido exclusivo.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-3 mt-6 px-6 py-3 md:px-8 md:py-4 rounded-xl bg-[#5865F2] text-white font-semibold text-sm md:text-base hover:opacity-90 transition"
            >
              <DiscordIcon />
              DISCORD
            </a>
          </div>

          {/* Imagen */}
          <div className="relative">
            <Image
              src="/discord.webp"
              alt="Comunidad en Discord"
              width={900}
              height={700}
              priority
              className="
                w-full h-auto object-contain
                ml-4 md:ml-2
                lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2
                lg:w-[50vw]
              "
            />
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

function DiscordIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.211.375-.444.864-.608 1.249a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.249.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.045-.32 13.579.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 006.03 3.047.078.078 0 00.084-.027c.463-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.105 13.201 13.201 0 01-1.872-.9.077.077 0 01-.008-.127c.126-.094.252-.192.371-.291a.074.074 0 01.077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.198.372.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.899.076.076 0 00-.04.106c.36.698.77 1.362 1.225 1.993a.076.076 0 00.084.028 19.876 19.876 0 006.031-3.047.077.077 0 00.031-.056c.5-5.177-.838-9.673-3.548-13.661a.061.061 0 00-.031-.028z" />
    </svg>
  );
}















