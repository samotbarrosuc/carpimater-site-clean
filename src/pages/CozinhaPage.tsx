import { useEffect } from 'react'
import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/cozinha/sections/HowItWorks'
import FabricoPrazoAdjudicacao from '@/components/cozinha/sections/FabricoPrazoAdjudicacao'
import MarketProof from '@/components/cozinha/sections/MarketProof'
import BeforeAfter from '@/components/cozinha/sections/BeforeAfter'
import ComparisonBanner from '@/components/cozinha/sections/ComparisonBanner'
import FAQ from '@/components/cozinha/sections/FAQ'
import FinalCTA from '@/components/cozinha/sections/FinalCTA'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function CozinhaPage() {
  useEffect(() => {
    document.title = 'Cozinhas por Medida em Coimbra, Aveiro e Leiria — CarpiMater'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Cozinhas por medida com fabrico em Paços de Ferreira e montagem profissional. Projecto, fabrico e instalação. Cobertura nacional — CarpiMater.'
      )
    }
  }, [])

  return (
    <SimulatorProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <HowItWorks />
        <FabricoPrazoAdjudicacao />
        <ComparisonBanner />
        <MarketProof />
        <FAQ />
        <FinalCTA />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
