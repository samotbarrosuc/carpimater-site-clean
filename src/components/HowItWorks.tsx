// client component

import { motion } from 'framer-motion'
import { useLocation } from 'wouter'
import { Palette, Ruler, Calculator, CalendarCheck } from 'lucide-react'
import { getStepsByVariant } from '@/content/como-funciona'
import { getSiteVariantFromPath, getWhatsAppUrl } from '@/content/site'

// Ícones pela mesma ordem que os passos em content/como-funciona.ts
const STEP_ICONS = [Palette, Ruler, Calculator, CalendarCheck]

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default function HowItWorks() {
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const isKitchen = siteVariant === 'cozinha'
  const steps = getStepsByVariant(siteVariant)

  return (
    <section id="como-funciona" className="py-14 sm:py-24 bg-background relative overflow-hidden">
      <div className="absolute -top-24 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Processo</p>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
            Como funciona
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            Um método simples, desenhado para reduzir indecisão e acelerar a renovação da sua casa.
          </p>
        </div>

        {/* Steps */}
        <div className="relative rounded-3xl border border-border bg-card/50 p-6 sm:p-8 lg:p-10">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-20 left-24 right-24 h-0.5 bg-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index]
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon Box */}
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                  className="relative w-24 h-24 bg-card border-2 border-border rounded-2xl shadow-lg flex items-center justify-center mb-6 transition-colors"
                >
                  <Icon className="w-10 h-10 text-primary" />
                  
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-foreground">{step.number}</span>
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </motion.div>
                )
              })}
          </div>

          <div className="mt-10 text-center">
            {isKitchen ? (
              <a
                href={getWhatsAppUrl(undefined, siteVariant)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold hover:bg-primary/90 transition-colors"
              >
                Pedir proposta por WhatsApp
              </a>
            ) : (
              <button
                type="button"
                onClick={() => scrollToSection('simulador')}
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-3 font-semibold hover:bg-primary/90 transition-colors"
              >
                Avançar para o simulador
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
