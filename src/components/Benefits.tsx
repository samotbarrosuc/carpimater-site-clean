// client component

import { motion } from 'framer-motion'
import { Layers, TrendingDown, Shield, Palette } from 'lucide-react'
import { BENEFITS_DATA } from '@/content/beneficios'

// Ícones pela mesma ordem que os benefícios em content/beneficios.ts
const BENEFIT_ICONS = [Layers, TrendingDown, Shield, Palette]

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function navigateToAnchor(href: string) {
  const sectionId = href.replace('#', '')
  const isHome = window.location.pathname === '/'

  if (isHome) {
    scrollToSection(sectionId)
    return
  }

  window.location.href = `/#${sectionId}`
}

export default function Benefits() {
  return (
    <section className="py-14 sm:py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div className="absolute -top-28 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
            Vantagem competitiva
          </p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 leading-snug">
            Um serviço pensado para converter dúvida em decisão
          </h2>
          <p className="text-white/68 max-w-3xl mx-auto text-base sm:text-lg">
            Transparência real de preço, execução profissional e acompanhamento humano para que o cliente avance com segurança.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {['Preço claro desde o início', 'Visita técnica sem pressão', 'Resposta rápida por WhatsApp'].map((item) => (
            <div key={item} className="rounded-xl border border-white/12 bg-white/[0.06] px-4 py-3 text-sm text-white/90 text-center font-medium">
              {item}
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {BENEFITS_DATA.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index]
              return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="bg-white/6 border border-white/12 rounded-2xl p-7 hover:bg-white/10 transition-colors"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-5 border border-primary/25">
                 <Icon className="w-6 h-6 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-white/72 text-sm leading-relaxed whitespace-pre-line">
                {benefit.description}
                {benefit.linkText && (
                  <>
                    {'\n'}
                    <a
                      href={benefit.linkHref}
                      onClick={(e) => {
                        e.preventDefault()
                        navigateToAnchor(benefit.linkHref ?? '')
                      }}
                      className="text-primary underline underline-offset-2 hover:text-primary/90 font-medium"
                    >
                      {benefit.linkText}
                    </a>
                    {' '}
                    {benefit.linkSuffix}
                  </>
                )}
              </p>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
