import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function FlutuantePage() {
  return (
    <SimulatorProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-kicker">ZCUDO · NextCore Carbon Core HDF</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-5xl">Pavimento flutuante híbrido na Região Centro</h2>
              <p className="mt-5 leading-7 text-muted-foreground">A coleção tem sete acabamentos, classe AC5, núcleo HDF reforçado com carbono, base acústica integrada e resistência à água e aos salpicos durante 100 h+.</p>
            </div>
            <div className="mx-auto mt-9 grid max-w-5xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#e2ddd5] bg-[#f8f5ef] p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#239da7]">NextCore 9,5</p><p className="mt-2 font-display text-lg font-bold">Régua 1215 × 197 mm</p><p className="mt-2 text-sm leading-6 text-slate-600">Acabamentos Pingo, Tots e Moka, com 8 mm de corpo e base IXPE de 1,5 mm.</p></div>
              <div className="rounded-2xl border border-[#e2ddd5] bg-[#f8f5ef] p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#239da7]">NextCore 11,5</p><p className="mt-2 font-display text-lg font-bold">Régua 1845 × 197 mm</p><p className="mt-2 text-sm leading-6 text-slate-600">Acabamentos Arq, Grisácio, Torrado e Mel, com 10 mm de corpo e base IXPE de 1,5 mm.</p></div>
              <div className="rounded-2xl border border-[#e2ddd5] bg-[#f8f5ef] p-5"><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#239da7]">Serviço de aplicação</p><p className="mt-2 font-display text-lg font-bold">Fornecimento e aplicação</p><p className="mt-2 text-sm leading-6 text-slate-600">Disponível em Coimbra, Aveiro, Leiria e arredores. Para outras zonas, confirme a disponibilidade.</p></div>
            </div>
            <div className="mt-8 text-center">
              <a href="/loja?categoria=flutuante#catalogo-loja" className="inline-flex rounded-full bg-primary px-6 py-3 font-bold text-white transition hover:bg-[#d94d0d]">Ver pavimentos híbridos</a>
            </div>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
