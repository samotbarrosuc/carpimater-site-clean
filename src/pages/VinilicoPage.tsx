import { useEffect, Suspense } from 'react'
import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import MarketProof from '@/components/MarketProof'
import Catalog from '@/components/Catalog'
import HowItWorks from '@/components/HowItWorks'
import Simulator from '@/components/Simulator'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import TrustBadges from '@/components/TrustBadges'

export default function VinilicoPage() {
  useEffect(() => {
    document.title = 'CarpiMater | Vinílico'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Saiba o custo em segundos, sem sair do sofá. Simule o preço do pavimento vinílico e peça o nosso serviço de aplicação. Preços em Coimbra, Aveiro, Leiria e Portugal. Garantia de 25 anos — CarpiMater.'
      )
    }
    const keywords = document.querySelector('meta[name="keywords"]')
    if (keywords) {
      keywords.setAttribute(
        'content',
        'preço vinílico coimbra, preço vinílico aveiro, preço vinílico leiria, preço vinílico portugal, pavimento vinílico, instalação vinílico, garantia vinílico, simular preço vinílico'
      )
    }
  }, [])

  return (
    <SimulatorProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <TrustBadges />
        <MarketProof />
        <HowItWorks />
        <Catalog />

        <section id="simulador" className="py-20 bg-[#f8f1e6]">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Simulação de orçamento</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">Calcule o seu pavimento vinílico</h2>
              <p className="text-muted-foreground mt-4">
                Informe a área, escolha o modelo e receba uma estimativa completa com fornecimento, instalação e rodapés.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
              <Suspense fallback={null}>
                <Simulator />
              </Suspense>
            </div>
          </div>
        </section>

        <FAQ />
        <FinalCTA />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Preços e Serviços de Pavimento Vinílico</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Preço Pavimento Vinílico Coimbra',
                  text: 'Conheça o preço pavimento vinílico Coimbra com garantia de 25 anos. Instalação profissional incluída.',
                },
                {
                  title: 'Preço Pavimento Vinílico Aveiro',
                  text: 'Orçamento detalhado para preço pavimento vinílico Aveiro. Qualidade superior e durabilidade.',
                },
                {
                  title: 'Preço Pavimento Vinílico Leiria',
                  text: 'Saiba mais sobre preço pavimento vinílico Leiria e solicite uma proposta gratuita.',
                },
                {
                  title: 'Preço Pavimento Vinílico Portugal',
                  text: 'Serviço nacional para preço pavimento vinílico Portugal com entrega e instalação.',
                },
                {
                  title: 'Instalação Pavimento Vinílico',
                  text: 'Instalação especializada de pavimento vinílico SPC com acabamento impecável.',
                },
                {
                  title: 'Garantia Pavimento Vinílico',
                  text: 'Garantia de 25 anos no pavimento vinílico, ideal para residências e empresas.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
