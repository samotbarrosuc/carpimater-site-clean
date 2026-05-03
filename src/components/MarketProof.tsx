// client component

import { useLocation } from 'wouter'
import { motion } from 'framer-motion'
import { ShieldCheck, Clock3, MessageCircleMore, Sparkles } from 'lucide-react'
import { getSiteVariantContent, getSiteVariantFromPath, getWhatsAppUrl } from '@/content/site'

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default function MarketProof() {
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const isKitchen = siteVariant === 'cozinha'
  const siteContent = getSiteVariantContent(siteVariant)

  const PROOF_CARDS = isKitchen
    ? [
        {
          icon: Clock3,
          title: 'Prazo médio 8-10 semanas',
          text: 'Após adjudicação, coordenamos fabrico e montagem com calendário realista.',
        },
        {
          icon: ShieldCheck,
          title: 'Fabrico em Paços de Ferreira',
          text: 'Produção com carpintaria parceira e controlo de qualidade em cada fase.',
        },
        {
          icon: Sparkles,
          title: 'Cozinhas totalmente por medida',
          text: 'Projeto adaptado às necessidades, gostos e condicionantes técnicas da casa.',
        },
        {
          icon: MessageCircleMore,
          title: 'Preço competitivo',
          text: 'Propostas alinhadas com o mercado sem comprometer a qualidade final.',
        },
      ]
    : [
        {
          icon: Clock3,
          title: 'Resposta em 24h',
          text: 'Sem esperas longas. Contacto rápido para avançar com clareza.',
        },
        {
          icon: ShieldCheck,
          title: `Garantia de ${siteContent.supplierWarrantyLabel}`,
          text: 'Materiais certificados e aplicação profissional.',
        },
        {
          icon: Sparkles,
          title: 'Acabamento premium',
          text: 'Possibilidade de perfis e rodapés alinhados com a cor do pavimento.',
        },
        {
          icon: MessageCircleMore,
          title: 'Contacto direto e simples',
          text: 'Validação, agendamento e dúvidas, sempre disponíveis por WhatsApp.',
        },
      ]

  return (
    <section className="py-20 lg:py-24 bg-background border-b border-border/70">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8 lg:gap-10 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                O que nos distingue
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground leading-[1.07] mb-4">
                Facilitamos a decisão. Garantimos a execução.
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                Simplificamos tudo para que avance com confiança. Escolha rápida, validação técnica e contacto direto.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {isKitchen ? (
                  <a
                    href={getWhatsAppUrl(undefined, siteVariant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Pedir proposta por WhatsApp
                  </a>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => scrollToSection('simulador')}
                      className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Simular orçamento
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('catalogo')}
                      className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                    >
                      Ver catálogo
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PROOF_CARDS.map((card, index) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-base font-bold text-foreground mb-1.5">{card.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
