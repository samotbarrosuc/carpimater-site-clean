import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import PavementSeoFacts from '@/components/PavementSeoFacts'

export default function VinilicoPage() {
  return (
    <SimulatorProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">Pavimento vinílico SPC em Coimbra, Aveiro e Leiria</h2>
              <p className="mt-4 leading-7 text-muted-foreground">Consulte os acabamentos, as características e os preços publicados. Pode encomendar o material online e solicitar a aplicação em separado.</p>
              <a href="/loja?categoria=vinilico" className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 font-bold text-white">Ver pavimentos vinílicos</a>
            </div>
          </div>
        </section>

        <PavementSeoFacts variant="vinilico" />

        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
