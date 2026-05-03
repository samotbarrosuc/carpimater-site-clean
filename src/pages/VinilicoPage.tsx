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

export default function VinilicoPage() {
  return (
    <SimulatorProvider>
      <Helmet>
        <title>Preço Pavimento Vinílico Coimbra, Aveiro, Leiria, Portugal — CarpiMater</title>
        <meta
          name="description"
          content="Escolha o pavimento vinílico, simule o preço em segundos e peça o nosso serviço de aplicação. Preços em Coimbra, Aveiro, Leiria e Portugal. Garantia de 25 anos — CarpiMater."
        />
        <meta name="keywords" content="preço vinílico coimbra, preço vinílico aveiro, preço vinílico leiria, preço vinílico portugal, pavimento vinílico, instalação vinílico" />
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
