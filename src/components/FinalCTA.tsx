// client component

import { MessageCircle } from 'lucide-react'
import { useLocation } from 'wouter'
import { getSiteVariantFromPath, getWhatsAppUrl } from '@/content/site'

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export default function FinalCTA() {
  const [pathname] = useLocation()
  const siteVariant = getSiteVariantFromPath(pathname)
  const isKitchen = siteVariant === 'cozinha'

  return (
    <section id="final-cta" className="py-14 sm:py-24 bg-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto rounded-3xl border border-white/20 bg-white/[0.08] backdrop-blur-xl p-8 sm:p-10 lg:p-12 shadow-[0_28px_80px_rgba(0,0,0,0.25)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-8 items-center">
            <div className="text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-white/75 font-semibold mb-3">Último passo</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3 leading-snug">
                {isKitchen ? 'Pronto para construir a sua cozinha?' : 'Pronto para renovar o seu chão?'}
              </h2>
              <p className="text-white/85 text-base sm:text-lg mb-3">
                {isKitchen
                  ? 'Cozinhas por medida com adjudicação de 60%. Entrega em até 3 meses após adjudicação, incluindo fabrico e montagem.'
                  : 'Receba uma estimativa imediata, valide connosco os detalhes e avance com instalação profissional sem complicações.'}
              </p>
              <p className="text-white/70 text-sm">
                {isKitchen
                  ? 'Acompanhamos cada fase com foco em qualidade, necessidades do cliente e condições específicas da casa.'
                  : 'Sem compromisso inicial. Resposta rápida por WhatsApp ou telefone.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 text-sm">
                  {isKitchen
                    ? 'Desenho técnico desenvolvido em conjunto consigo e com carpintaria parceira.'
                    : 'Agendamento flexível consoante a sua disponibilidade.'}
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white/90 text-sm">
                  {isKitchen
                    ? 'Preço competitivo de mercado, com fabrico em Paços de Ferreira e montagem profissional.'
                    : 'Acompanhamento técnico do início ao acabamento final.'}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <div className="flex flex-col gap-4 min-w-[280px]">
                {isKitchen ? (
                  <a
                    href={getWhatsAppUrl(undefined, siteVariant)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Pedir proposta por WhatsApp
                  </a>
                ) : (
                  <>
                    <button
                      onClick={() => scrollToSection('simulador')}
                      className="bg-foreground text-background px-8 py-4 rounded-full font-semibold hover:bg-foreground/90 transition-colors"
                    >
                      Quero a minha estimativa
                    </button>
                    <a
                      href={getWhatsAppUrl(undefined, siteVariant)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Falar por WhatsApp
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
