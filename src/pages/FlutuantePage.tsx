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

export default function FlutuantePage() {
  useEffect(() => {
    document.title = 'Pavimento Flutuante em Coimbra, Aveiro e Leiria — CarpiMater'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Fornecimento e instalação profissional de pavimento flutuante em Coimbra, Aveiro e Leiria. Garantia de 20 anos. Acabamento premium com rodapés incluídos — CarpiMater.'
      )
    }
  }, [])

  return (
    <SimulatorProvider>
      <main>
        <Navbar />
        <Hero />
        <MarketProof />
        <HowItWorks />
        <Catalog />
        <Suspense fallback={null}>
          <Simulator />
        </Suspense>
        <FAQ />
        <FinalCTA />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
