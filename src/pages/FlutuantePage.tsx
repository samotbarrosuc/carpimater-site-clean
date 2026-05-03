import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
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
  return (
    <SimulatorProvider>
      <Helmet>
        <title>Preço Pavimento Flutuante Coimbra, Aveiro, Leiria, Portugal — CarpiMater</title>
        <meta
          name="description"
          content="Escolha o pavimento flutuante, simule o preço em segundos e peça o nosso serviço de aplicação. Preços em Coimbra, Aveiro, Leiria e Portugal. Garantia de 20 anos — CarpiMater."
        />
        <meta name="keywords" content="preço flutuante coimbra, preço flutuante aveiro, preço flutuante leiria, preço flutuante portugal, pavimento flutuante, instalação flutuante" />
      </Helmet>
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
