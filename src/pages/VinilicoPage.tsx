import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

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
              <p className="mt-4 leading-7 text-muted-foreground">Solução resistente à água para cozinhas, casas de banho e toda a casa, com garantia original de 25 anos. Consulte os modelos e preços publicados, encomende online e peça aplicação profissional se precisar.</p>
              <a href="/loja?categoria=vinilico" className="mt-7 inline-flex rounded-full bg-primary px-6 py-3 font-bold text-white">Ver pavimentos vinílicos</a>
            </div>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
