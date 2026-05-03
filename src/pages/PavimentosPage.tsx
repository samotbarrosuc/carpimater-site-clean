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
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

function PavimentoTypeSwitcher() {
  const [pathname] = useLocation()
  const isVinilico = pathname.startsWith('/vinilico')

  const pavimentoOptions = isVinilico
    ? [
        {
          href: '/flutuante',
          label: 'Flutuante Tradicional',
          detail: 'Aspeto madeira · Garantia 20 anos',
        },
      ]
    : [
        {
          href: '/vinilico',
          label: 'SPC Vinílico',
          detail: 'Impermeável · Garantia 25 anos',
        },
      ]

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-[2rem] border border-border bg-card/95 p-8 shadow-lg shadow-slate-900/5">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.24em] text-primary font-semibold mb-3">Escolha o seu pavimento</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Vinílico ou flutuante? Compare aqui.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Uma seleção simples, visual e orientada para o que mais importa: Durabilidade, impermeabilidade e acabamento final.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {pavimentoOptions.map((option) => (
              <a
                key={option.href}
                href={option.href}
                className="group block rounded-[1.75rem] border border-border bg-background p-6 text-left transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-semibold mb-3">Mudar para</p>
                <h3 className="text-xl font-semibold text-foreground mb-3">{option.label}</h3>
                <p className="text-muted-foreground leading-7">{option.detail}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
                  Ver mais detalhes
                </span>
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
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <PavimentoTypeSwitcher />
        <TrustBadges />
        <MarketProof />
        <HowItWorks />

        <section id="simulador" className="py-20 bg-[#f8f1e6]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Simulação de orçamento</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">Calcule o custo do seu pavimento</h2>
              <p className="text-muted-foreground mt-4">
                Indique área, tipo de pavimento e rodapé. Receba uma estimativa clara e avance com a nossa equipa especializada.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
              <Suspense fallback={null}>
                <Simulator />
              </Suspense>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Por que escolher CarpiMater</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Uma solução de pavimento completa</h2>
              <p className="text-muted-foreground mt-4">
                Garantia, acabamento e instalação profissional. O seu projeto segue um caminho claro do orçamento à entrega.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  title: 'Instalação profissional',
                  text: 'Equipe experiente que trata cada fase com precisão, desde a medição até o acabamento final.',
                },
                {
                  title: 'Materiais certificados',
                  text: 'Escolha entre vinílico SPC ou flutuante premium, com garantia de 20 a 25 anos.',
                },
                {
                  title: 'Processo transparente',
                  text: 'Orçamento rápido, comunicação clara e execução dentro do prazo combinado.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-7">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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
