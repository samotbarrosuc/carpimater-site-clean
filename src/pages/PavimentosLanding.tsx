import { Suspense } from 'react'
import { ChevronRight, HelpCircle, Hammer, ShieldCheck, ShoppingBag } from 'lucide-react'
import { SimulatorProvider } from '@/context/SimulatorContext'
import Simulator from '@/components/Simulator'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { getProdutosByVariant } from '@/content/vinil'
import { formatEur } from '@/lib/calculations'

const COMPARISON = [
  { label: 'Resistência à água', vinilico: 'Impermeável', flutuante: 'Resistente a salpicos' },
  { label: 'Mais indicado para', vinilico: 'Casa toda, cozinha e WC', flutuante: 'Sala, quartos e escritório' },
  { label: 'Garantia', vinilico: '25 anos', flutuante: '20 anos' },
  { label: 'Aplicação', vinilico: 'Disponível', flutuante: 'Disponível' },
]

const FAQS = [
  ['Posso comprar apenas o material?', 'Sim. A loja vende pavimentos e rodapés por caixas e barras inteiras. Pode encomendar o material e avançar ao seu ritmo.'],
  ['Posso pedir aplicação?', 'Sim. Escolha o material e fale connosco. Confirmamos a base, a deslocação e o valor da aplicação antes de avançar.'],
  ['Como sei quantas caixas preciso?', 'Indique a área no modal de compra. O cálculo acrescenta 10% de desperdício por defeito e arredonda para caixas inteiras.'],
]

export default function PavimentosLanding() {
  const featuredProducts = getProdutosByVariant('vinilico').slice(0, 2)

  return (
    <SimulatorProvider>
      <main className="min-h-screen bg-[#f7f3ea] text-[#19242e]">
        <Navbar />
        <section className="border-b border-[#d8ccbc] bg-[#f7f3ea] px-4 pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f05b13]">Pavimentos CarpiMater</p>
              <h1 className="mt-4 max-w-xl text-4xl font-display font-bold leading-[1.02] sm:text-6xl">O chão certo muda a casa.</h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-[#40505b] sm:text-lg">Compare vinílico SPC e flutuante, veja o que faz sentido para cada divisão e escolha como quer avançar.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="/loja" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f05b13] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/15 transition hover:bg-[#d94d0d]">Escolher pavimento <ChevronRight className="h-4 w-4" /></a><a href="#comparar" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#19242e] px-6 py-3.5 text-sm font-bold text-[#19242e] transition hover:bg-[#19242e] hover:text-white">Comparar opções</a></div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#40505b]"><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#f05b13]" /> Garantias do catálogo</span><span className="inline-flex items-center gap-1.5"><ShoppingBag className="h-4 w-4 text-[#f05b13]" /> Compra por caixas</span></div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#19242e] shadow-2xl"><img src="/images/pavimento-vinilico-sala-coimbra.png" alt="Pavimento vinílico instalado numa sala pela CarpiMater" className="h-[360px] w-full object-cover sm:h-[470px]" /><div className="absolute inset-x-0 bottom-0 bg-[#19242e]/90 p-5 text-white backdrop-blur-sm sm:p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f1c63c]">Duas formas de avançar</p><p className="mt-2 text-lg font-display font-bold">Só material ou material + aplicação.</p><p className="mt-1 text-sm leading-6 text-white/65">A decisão é sua. Ajudamos a torná-la simples.</p></div></div>
          </div>
        </section>

        <section id="comparar" className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl"><p className="section-kicker">Escolha com clareza</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] sm:text-5xl">Vinílico ou flutuante?</h2><p className="mt-4 leading-7 text-[#40505b]">Não existe um pavimento melhor para todas as casas. Existe o mais adequado ao uso, à divisão e ao orçamento.</p></div>
            <div className="mt-8 grid gap-3 sm:hidden">
              {COMPARISON.map((item) => (
                <article key={item.label} className="rounded-2xl border border-[#ded8cf] bg-[#f8f5ef] p-4">
                  <h3 className="font-display text-lg font-bold text-[#19242e]">{item.label}</h3>
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#ded8cf] pt-3 text-xs leading-5">
                    <div><p className="mb-1 font-bold text-[#f05b13]">SPC vinílico</p><p className="text-[#40505b]">{item.vinilico}</p></div>
                    <div><p className="mb-1 font-bold text-[#19242e]">Flutuante</p><p className="text-[#40505b]">{item.flutuante}</p></div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 hidden overflow-hidden rounded-2xl border border-[#d8ccbc] sm:block"><div className="grid grid-cols-[1.05fr_1fr_1fr] bg-[#19242e] text-sm font-bold text-white"><div className="p-4 sm:p-5">Critério</div><div className="border-l border-white/10 p-4 text-[#f08a45] sm:p-5">SPC vinílico</div><div className="border-l border-white/10 p-4 sm:p-5">Flutuante</div></div>{COMPARISON.map((item) => <div key={item.label} className="grid grid-cols-[1.05fr_1fr_1fr] border-t border-[#d8ccbc] text-sm"><div className="p-4 font-semibold sm:p-5">{item.label}</div><div className="border-l border-[#d8ccbc] p-4 text-[#40505b] sm:p-5">{item.vinilico}</div><div className="border-l border-[#d8ccbc] p-4 text-[#40505b] sm:p-5">{item.flutuante}</div></div>)}</div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="/loja?categoria=vinilico" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f05b13] px-5 py-3 text-sm font-bold text-white hover:bg-[#d94d0d]">Ver SPC vinílico <ChevronRight className="h-4 w-4" /></a><a href="/loja?categoria=flutuante" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#19242e] px-5 py-3 text-sm font-bold text-[#19242e] hover:bg-[#19242e] hover:text-white">Ver flutuante <ChevronRight className="h-4 w-4" /></a></div>
          </div>
        </section>

        <section className="bg-[#e6ddd0] px-4 py-16 sm:py-24"><div className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f05b13]">Como quer avançar?</p><h2 className="mt-3 text-3xl font-display font-bold sm:text-4xl">Só material ou material + aplicação?</h2><p className="mt-4 leading-7 text-[#40505b]">Duas opções, uma decisão sua. A escolha é feita na loja — a opção de aplicação aparece antes de confirmar a encomenda.</p></div><div className="mt-10 grid gap-6 lg:grid-cols-2"><div className="rounded-2xl border border-[#d8ccbc] bg-white p-7 sm:p-9"><div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6ddd0]"><ShoppingBag className="h-6 w-6 text-[#f05b13]" /></span><span className="rounded-full border border-[#d8ccbc] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#40505b]/70">Informação</span></div><h3 className="mt-5 text-2xl font-display font-bold">Só material</h3><p className="mt-3 text-sm leading-6 text-[#40505b]">Compre apenas os pavimentos e rodapés. Indique os metros e receba o cálculo por caixas inteiras, com 10% de desperdício incluído. Entrega regular na Região Centro; outras zonas estão sujeitas a contacto prévio e disponibilidade.</p></div><div className="rounded-2xl border border-[#d8ccbc] bg-white p-7 sm:p-9"><div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6ddd0]"><Hammer className="h-6 w-6 text-[#f05b13]" /></span><span className="rounded-full border border-[#d8ccbc] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#40505b]/70">Informação</span></div><h3 className="mt-5 text-2xl font-display font-bold">Material + aplicação</h3><p className="mt-3 text-sm leading-6 text-[#40505b]">Compre os materiais e acrescente o serviço de aplicação. Na encomenda escolha “Material + aplicação” e nós fornecemos e instalamos.</p></div></div><p className="mt-6 text-sm leading-6 text-[#40505b]/80">A nossa atuação regular é na Região Centro. Para outras zonas do país, contacte-nos para confirmarmos disponibilidade.</p></div></section>

        <div id="pavimentos-orcamento" className="scroll-mt-20"><Suspense fallback={null}><Simulator /></Suspense></div>

        <section className="bg-[#f7f3ea] px-4 py-16 sm:py-24"><div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f05b13]">Catálogo</p><h2 className="mt-3 text-3xl font-display font-bold sm:text-5xl">Veja alguns modelos.</h2></div><a href="/loja" className="inline-flex items-center gap-2 text-sm font-bold text-[#19242e] hover:text-[#f05b13]">Ver catálogo completo <ChevronRight className="h-4 w-4" /></a></div><div className="mt-10 grid gap-5 sm:grid-cols-2">{featuredProducts.map((product) => <a key={product.id} href="/loja?categoria=vinilico" className="group flex items-center gap-4 rounded-2xl border border-[#d8ccbc] bg-white p-3 transition hover:-translate-y-1 hover:shadow-lg"><div className="h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-[#e6ddd0]"><img src={product.imagem} alt={product.nome} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div><p className="text-xs font-bold uppercase tracking-wider text-[#f05b13]">{product.referencia} · SPC vinílico</p><h3 className="mt-1 font-display text-lg font-bold">{product.nome}</h3><p className="mt-2 text-sm font-semibold text-[#40505b]">{formatEur(product.precoM2)}/m² <span className="font-medium text-[#40505b]/70">(IVA inc.)</span></p></div><ChevronRight className="ml-auto mr-2 h-5 w-5 text-[#f05b13]" /></a>)}</div></div></section>

        <section className="bg-white px-4 py-16 sm:py-24"><div className="mx-auto max-w-3xl"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f05b13]">Dúvidas rápidas</p><h2 className="mt-3 text-3xl font-display font-bold sm:text-5xl">Antes de comprar</h2></div><div className="mt-8 divide-y divide-[#d8ccbc] border-y border-[#d8ccbc]">{FAQS.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold"><span>{question}</span><HelpCircle className="h-5 w-5 shrink-0 text-[#f05b13] transition group-open:rotate-45" /></summary><p className="max-w-2xl pt-3 text-sm leading-6 text-[#40505b]">{answer}</p></details>)}</div></div></section>

        <section className="bg-[#19242e] px-4 py-16 text-white sm:py-20"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f1c63c]">Pronto para avançar?</p><h2 className="mt-3 text-3xl font-display font-bold">Escolha o seu pavimento.</h2><p className="mt-3 text-sm text-white/65">Compra online ou ajuda profissional. O próximo passo está na loja.</p></div><a href="/loja" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#f05b13] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#d94d0d]">Abrir loja <ChevronRight className="h-4 w-4" /></a></div></section>
        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
