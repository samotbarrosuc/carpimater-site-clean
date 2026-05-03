// client component

import { motion } from 'framer-motion'

import { GALLERY_ITEMS } from '@/content/galeria'

export default function Gallery() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
            Projetos recentes
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
            Trabalhos realizados
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Fotos reais de projetos executados no distrito de Coimbra.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs uppercase tracking-wider text-white/70 mb-1">Apartamento</p>
                <p className="text-lg font-bold text-white">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
