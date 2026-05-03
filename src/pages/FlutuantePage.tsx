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

export default function FlutuantePage() {
  useEffect(() => {
    document.title = 'CarpiMater | Flutuante'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Saiba o custo em segundos, sem sair do sofá. Simule o preço do pavimento flutuante e peça o nosso serviço de aplicação. Preços em Coimbra, Aveiro, Leiria e Portugal. Garantia de 20 anos — CarpiMater.'
      )
    }
    const keywords = document.querySelector('meta[name="keywords"]')
    if (keywords) {
      keywords.setAttribute(
        'content',
        'preço flutuante coimbra, preço flutuante aveiro, preço flutuante leiria, preço flutuante portugal, pavimento flutuante, instalação flutuante, garantia flutuante, simular preço flutuante'
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
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">Calcule o seu pavimento flutuante</h2>
              <p className="text-muted-foreground mt-4">
                Defina a área, escolha o modelo e obtenha uma estimativa completa para fornecimento, instalação e rodapés.
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
            <h2 className="text-3xl font-bold text-center mb-8">Preços e Serviços de Pavimento Flutuante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Preço Pavimento Flutuante Coimbra',
                  text: 'Descubra o preço pavimento flutuante Coimbra com instalação profissional. Garantia de 20 anos e acabamento premium.',
                },
                {
                  title: 'Preço Pavimento Flutuante Aveiro',
                  text: 'Orçamento rápido para preço pavimento flutuante Aveiro. Serviço completo de fornecimento e aplicação.',
                },
                {
                  title: 'Preço Pavimento Flutuante Leiria',
                  text: 'Saiba o preço pavimento flutuante Leiria e peça já o seu orçamento personalizado.',
                },
                {
                  title: 'Preço Pavimento Flutuante Portugal',
                  text: 'Cobrimos todo o Portugal com preços competitivos para pavimento flutuante.',
                },
                {
                  title: 'Instalação Pavimento Flutuante',
                  text: 'Instalação profissional de pavimento flutuante com rodapés incluídos.',
                },
                {
                  title: 'Garantia Pavimento Flutuante',
                  text: 'Garantia de 20 anos no pavimento flutuante, assegurando qualidade e durabilidade.',
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
