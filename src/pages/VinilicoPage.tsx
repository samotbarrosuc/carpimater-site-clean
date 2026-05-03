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

export default function VinilicoPage() {
  useEffect(() => {
    document.title = 'Preço Pavimento Vinílico Coimbra, Aveiro, Leiria, Portugal — CarpiMater'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Escolha o pavimento vinílico, simule o preço em segundos e peça o nosso serviço de aplicação. Preços em Coimbra, Aveiro, Leiria e Portugal. Garantia de 25 anos — CarpiMater.'
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Preços e Serviços de Pavimento Vinílico</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Preço Pavimento Vinílico Coimbra</h3>
                <p className="text-gray-600">Conheça o preço pavimento vinílico Coimbra com garantia de 25 anos. Instalação profissional incluída.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Preço Pavimento Vinílico Aveiro</h3>
                <p className="text-gray-600">Orçamento detalhado para preço pavimento vinílico Aveiro. Qualidade superior e durabilidade.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Preço Pavimento Vinílico Leiria</h3>
                <p className="text-gray-600">Saiba mais sobre preço pavimento vinílico Leiria e solicite uma proposta gratuita.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Preço Pavimento Vinílico Portugal</h3>
                <p className="text-gray-600">Serviço nacional para preço pavimento vinílico Portugal com entrega e instalação.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Instalação Pavimento Vinílico</h3>
                <p className="text-gray-600">Instalação especializada de pavimento vinílico SPC com acabamento impecável.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Garantia Pavimento Vinílico</h3>
                <p className="text-gray-600">Garantia de 25 anos no pavimento vinílico, ideal para residências e empresas.</p>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
