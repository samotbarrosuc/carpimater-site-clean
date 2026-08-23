import { CheckCircle2, Hammer, ShoppingBag, Truck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RODAPES } from '@/content/rodapes'
import { formatEur } from '@/lib/calculations'

export default function RodapesPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#19242e]">
      <Navbar />

      <section className="bg-[#19242e] px-4 pb-16 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <p className="section-kicker">Rodapés PVC · Loja online</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.03] tracking-[-0.035em] sm:text-6xl">
            Rodapés com preço publicado e <span className="font-serif font-normal italic text-[#f08a45]">compra simples.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Escolha o acabamento, indique os metros e encomende online. Entregamos o material e, se precisar, os nossos carpinteiros também fazem a aplicação em Coimbra, Aveiro, Leiria e arredores. Para outras zonas do país, contacte-nos primeiro para confirmarmos disponibilidade.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/loja?categoria=rodape" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f05b13] px-6 text-sm font-bold text-white hover:bg-[#d94d0d]">
              <ShoppingBag className="h-4 w-4" /> Comprar rodapés
            </a>
            <a href="/contactos" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-bold text-white hover:bg-white/10">
              <Hammer className="h-4 w-4" /> Pedir aplicação
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="section-kicker">Modelos disponíveis</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] sm:text-5xl">Rodapé PVC para pavimento vinílico, flutuante ou laminado</h2>
            <p className="mt-4 leading-7 text-[#40505b]">Acabamentos brancos e efeito madeira, resistentes e fáceis de manter. Todos os preços apresentados incluem IVA.</p>
          </div>
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {RODAPES.slice(0, 4).map((product) => (
              <a key={product.id} href={`/loja?categoria=rodape#produto-${product.referencia.toLowerCase()}`} className="group overflow-hidden rounded-2xl border border-[#ded8cf] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(25,36,46,0.08)]">
                <div className="aspect-[4/3] overflow-hidden bg-[#eee9e1]">
                  {product.imagem
                    ? <img src={product.imagem} alt={`Rodapé PVC ${product.nome}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                    : <div className="m-5 h-[calc(100%-2.5rem)] rounded-lg shadow-inner" style={{ backgroundColor: product.cor }} aria-label={`Acabamento ${product.nome}`} />}
                </div>
                <div className="p-4">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#f05b13]">{product.referencia} · PVC</p>
                  <h3 className="mt-1.5 truncate font-display text-base font-bold">{product.nome}</h3>
                  <p className="mt-3 text-sm font-bold">{formatEur(product.precoMl)}<span className="text-xs font-medium text-slate-400">/m</span></p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#ded8cf] bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-kicker">Fornecimento e aplicação</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Uma loja online com carpinteiros por trás.</h2>
            <p className="mt-4 leading-7 text-[#40505b]">Pode comprar apenas as barras de rodapé ou solicitar também a aplicação. A área de aplicação é calculada a partir dos metros escolhidos e confirmada antes da obra.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: ShoppingBag, title: 'Preço visível', text: 'Veja o preço por metro antes de encomendar.' },
              { icon: Truck, title: 'Entrega', text: 'Receba o material diretamente em casa ou na obra.' },
              { icon: CheckCircle2, title: 'Aplicação', text: 'Serviço profissional na região de Coimbra, Aveiro e Leiria.' },
            ].map(({ icon: CardIcon, title, text }) => (
              <div key={title} className="rounded-2xl border border-[#ded8cf] bg-[#f8f5ef] p-5"><CardIcon className="h-5 w-5 text-[#f05b13]" /><h3 className="mt-4 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#40505b]">{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
