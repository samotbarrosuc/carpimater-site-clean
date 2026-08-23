// client component

import { motion } from 'framer-motion'

import { GALLERY_ITEMS } from '@/content/galeria'

export default function Gallery() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-9 max-w-2xl">
          <p className="section-kicker mb-3">
            Projetos recentes
          </p>
          <h2 className="font-display text-3xl font-bold tracking-[-0.025em] text-foreground sm:text-4xl">
            Trabalhos realizados
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Fotos reais de projetos executados pela nossa equipa.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {GALLERY_ITEMS.slice(0, 3).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/70 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(25,36,46,0.10)]"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.035]"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#19242e]/85 via-[#19242e]/5 to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/55">Projeto realizado</p>
                <p className="font-display text-base font-bold text-white sm:text-lg">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
