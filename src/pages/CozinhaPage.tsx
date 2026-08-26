import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/cozinha/sections/HowItWorks'
import FabricoPrazoAdjudicacao from '@/components/cozinha/sections/FabricoPrazoAdjudicacao'
import MarketProof from '@/components/cozinha/sections/MarketProof'
import ComparisonBanner from '@/components/cozinha/sections/ComparisonBanner'
import FAQ from '@/components/cozinha/sections/FAQ'
import FinalCTA from '@/components/cozinha/sections/FinalCTA'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import KitchenSeoDetails from '@/components/KitchenSeoDetails'

export default function CozinhaPage() {
  return (
    <SimulatorProvider>
      <main className="min-h-screen bg-[#f8f5ef] text-[#19242e]">
        <Navbar />
        <Hero />
        <KitchenSeoDetails />
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
