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
    document.title = 'Preço Pavimento Flutuante Coimbra, Aveiro, Leiria, Portugal — CarpiMater'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Escolha o pavimento flutuante, simule o preço em segundos e peça o nosso serviço de aplicação. Preços em Coimbra, Aveiro, Leiria e Portugal. Garantia de 20 anos — CarpiMater.'
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
            <h2 className="text-3xl font-bold text-center mb-8">Preços e Serviços de Pavimento Flutuante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Preço Pavimento Flutuante Coimbra</h3>
                <p className="text-gray-600">Descubra o preço pavimento flutuante Coimbra com instalação profissional. Garantia de 20 anos e acabamento premium.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Preço Pavimento Flutuante Aveiro</h3>
                <p className="text-gray-600">Orçamento rápido para preço pavimento flutuante Aveiro. Serviço completo de fornecimento e aplicação.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Preço Pavimento Flutuante Leiria</h3>
                <p className="text-gray-600">Saiba o preço pavimento flutuante Leiria e peça já o seu orçamento personalizado.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Preço Pavimento Flutuante Portugal</h3>
                <p className="text-gray-600">Cobrimos todo o Portugal com preços competitivos para pavimento flutuante.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Instalação Pavimento Flutuante</h3>
                <p className="text-gray-600">Instalação profissional de pavimento flutuante com rodapés incluídos.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Garantia Pavimento Flutuante</h3>
                <p className="text-gray-600">Garantia de 20 anos no pavimento flutuante, assegurando qualidade e durabilidade.</p>
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
