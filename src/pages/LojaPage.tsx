import { BadgeCheck, Clock3, Factory, HelpCircle, Truck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StoreCatalog from '@/components/StoreCatalog'
import { getWhatsAppUrl } from '@/content/site'

const WA_QUANTITY = getWhatsAppUrl('Olá! Preciso de ajuda para escolher a quantidade de pavimento ou rodapé.')

const storeBenefits = [
  { icon: Factory, title: 'Preço de fábrica', desc: 'Sem intermediários' },
  { icon: Truck, title: 'Entrega gratuita', desc: 'Região Centro' },
  { icon: Clock3, title: 'Até 10 dias', desc: 'Entrega na obra' },
  { icon: BadgeCheck, title: 'IVA incluído', desc: 'Sem surpresas' },
]

export default function LojaPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#19242e]">
      <Navbar />

      <section className="bg-[#19242e] px-4 pb-8 pt-24 text-white sm:pb-16 sm:pt-32">
        <div className="mx-auto grid max-w-6xl items-end gap-6 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="section-kicker">Loja de materiais</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-6xl">Pavimentos e rodapés.<br /><span className="font-serif font-normal italic text-[#f08a45]">Compra simples.</span></h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/65 sm:text-base">Preços publicados, IVA incluído e encomenda online. Compre apenas o material ou solicite também aplicação profissional.</p>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {storeBenefits.map((benefit) => (
              <div key={benefit.title} className="bg-[#19242e]/80 p-3.5 sm:p-5">
                <div className="flex items-center gap-2.5 sm:block">
                  <benefit.icon className="h-4 w-4 shrink-0 text-[#f08a45]" />
                  <p className="text-xs font-bold leading-tight text-white sm:mt-3 sm:text-sm">{benefit.title}</p>
                </div>
                <p className="mt-1 hidden text-xs text-white/45 sm:block">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e1c9a9] bg-[#fff9ef] px-4 py-4 sm:py-5" aria-label="Informação de entrega da loja">
        <a href="#catalogo-loja" className="group mx-auto flex max-w-6xl items-center gap-3 rounded-2xl border border-[#ead8c1] bg-white/75 px-4 py-3.5 shadow-[0_5px_18px_rgba(115,71,35,0.06)] transition hover:border-[#f05b13]/35 hover:bg-white sm:gap-4 sm:px-6 sm:py-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f05b13] text-white shadow-[0_6px_16px_rgba(240,91,19,0.2)] sm:h-11 sm:w-11"><Truck className="h-4 w-4 sm:h-5 sm:w-5" /></span>
          <span className="min-w-0 flex-1">
            <span className="block text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-[#c54d14] sm:text-xs">Receba sem sair de casa</span>
            <span className="mt-0.5 block text-sm text-[#40505b] sm:text-base"><strong className="font-extrabold text-[#19242e]">Portes grátis</strong><span className="font-semibold text-[#8b5a35]"> — Região Centro</span></span>
            <span className="mt-0.5 block text-[0.68rem] font-medium text-[#6f6257] sm:text-xs">Outras zonas do país: entrega sujeita a contacto e disponibilidade.</span>
          </span>
          <span className="hidden text-sm font-bold text-[#f05b13] sm:block">Ver materiais</span>
        </a>
      </section>

      <section id="catalogo-loja" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:py-14">
        <div className="mb-7 grid gap-5 border-b border-[#ded8cf] pb-7 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="section-kicker">Catálogo</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.025em] sm:text-4xl">Vinílicos e rodapés disponíveis</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">Filtre por categoria e selecione um acabamento para calcular a compra.</p>
          </div>
          <a href={`/whatsapp-redirect.html?url=${encodeURIComponent(WA_QUANTITY)}`} target="_blank" rel="noopener noreferrer" className="flex max-w-sm items-center gap-3 rounded-xl border border-[#ded8cf] bg-white px-4 py-3 text-sm text-slate-600 shadow-sm transition hover:border-primary/40">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f3ea] text-primary"><HelpCircle className="h-4 w-4" /></span>
            <span><strong className="block text-xs text-[#19242e]">Dúvidas sobre quantidades?</strong><span className="text-xs">Ajudamos pelo WhatsApp</span></span>
          </a>
        </div>

        <StoreCatalog />
      </section>

      <section className="border-y border-[#ded8cf] bg-white px-4 py-14 sm:py-18">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">Loja online e aplicação</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.025em] sm:text-4xl">Pavimentos com preço claro e carpinteiros para aplicar.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">Na loja CarpiMater pode encomendar pavimento vinílico SPC e rodapés PVC com preços visíveis. Para pavimentos flutuantes, laminados e soluções com acabamento de madeira, confirme os modelos disponíveis com a nossa equipa.</p>
          </div>
          <div className="rounded-2xl border border-[#ded8cf] bg-[#f8f5ef] p-6 sm:p-7">
            <h3 className="font-display text-xl font-bold">Coimbra, Aveiro, Leiria e arredores</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Entregamos materiais e prestamos serviços de aplicação na região Centro. A equipa reúne experiência de carpintaria para preparar, rematar e instalar cada pavimento com cuidado.</p>
            <div className="mt-5 flex flex-wrap gap-3"><a href="/pavimentos" className="text-sm font-bold text-primary hover:text-[#d94d0d]">Conhecer os pavimentos</a><span className="text-slate-300">·</span><a href="/rodapes" className="text-sm font-bold text-primary hover:text-[#d94d0d]">Ver rodapés PVC</a></div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
