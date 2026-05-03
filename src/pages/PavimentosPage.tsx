import { useEffect, Suspense } from 'react'
import { useLocation } from 'wouter'
import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarketProof from '@/components/MarketProof'
import Catalog from '@/components/Catalog'
import HowItWorks from '@/components/HowItWorks'
import Simulator from '@/components/Simulator'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import TrustBadges from '@/components/TrustBadges'

function PavimentoTypeSwitcher() {
  const [pathname] = useLocation()
  const isVinilico = pathname.startsWith('/vinilico')

  return (
    <section className="bg-background border-b border-white/10 py-5">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <p className="text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">
            Escolha o tipo de pavimento
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                href: '/vinilico',
                label: 'Vinílico SPC',
                detail: 'Impermeável · Garantia 25 anos',
                active: isVinilico,
              },
              {
                href: '/flutuante',
                label: 'Flutuante Tradicional',
                detail: 'Aspeto madeira · Garantia 20 anos',
                active: !isVinilico,
              },
            ].map((t) => (
              <a
                key={t.href}
                href={t.href}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-4 py-4 transition-all ${
                  t.active
                    ? 'border-primary bg-primary/16 text-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.20)]'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                {t.active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mb-0.5" />
                )}
                <span className="font-bold text-sm">{t.label}</span>
                <span className="text-[11px] opacity-60 text-center leading-snug">{t.detail}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function PavimentosPage() {
  const [pathname] = useLocation()
  const isVinilico = pathname.startsWith('/vinilico')

  useEffect(() => {
    document.title = isVinilico
      ? 'Pavimento Vinílico em Coimbra, Aveiro e Leiria — CarpiMater'
      : 'Pavimento Flutuante em Coimbra, Aveiro e Leiria — CarpiMater'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        isVinilico
          ? 'Fornecimento e instalação profissional de pavimento vinílico SPC em Coimbra, Aveiro e Leiria. Garantia de 25 anos. Orçamento rápido e sem compromisso — CarpiMater.'
          : 'Fornecimento e instalação profissional de pavimento flutuante em Coimbra, Aveiro e Leiria. Garantia de 20 anos. Acabamento premium com rodapés incluídos — CarpiMater.'
      )
    }
  }, [pathname, isVinilico])

  return (
    <SimulatorProvider>
      <main>
        <Navbar />
        <Hero />
        <PavimentoTypeSwitcher />
        <TrustBadges />
        <Suspense fallback={null}>
          <Simulator />
        </Suspense>
        <MarketProof />
        <HowItWorks />
        <Catalog />
        <FAQ />
        <Testimonials />
        <FinalCTA />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
