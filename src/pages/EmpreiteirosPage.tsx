import { motion } from 'framer-motion'
import { Shield, Wrench, Package, DoorOpen, UtensilsCrossed, Layers, Maximize2, BookOpen, Tv, Droplets, Briefcase, BedDouble, Archive, LayoutGrid, Ruler, LayoutDashboard, Shirt, MessageCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HowItWorks from '@/components/cozinha/sections/HowItWorks'
import { SimulatorProvider } from '@/context/SimulatorContext'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const WA_NUMBER = '351910093635'
const WA_MSG_PROPOSTA = encodeURIComponent('Olá CarpiMater! Sou empreiteiro/investidor e quero uma proposta de carpintaria para obra.')
const WA_MSG_PROJETO = encodeURIComponent('Olá! Gostaria de pedir orçamento para um trabalho de carpintaria.')
const WA_LINK_PROPOSTA = `/whatsapp-redirect.html?url=${encodeURIComponent(`https://wa.me/${WA_NUMBER}?text=${WA_MSG_PROPOSTA}`)}`
const WA_LINK_PROJETO = `/whatsapp-redirect.html?url=${encodeURIComponent(`https://wa.me/${WA_NUMBER}?text=${WA_MSG_PROJETO}`)}`
const TEL_LINK = `tel:+${WA_NUMBER}`

const SERVICES = [
  { icon: LayoutGrid, label: 'Roupeiros Embutidos' },
  { icon: UtensilsCrossed, label: 'Cozinhas Completas' },
  { icon: Shirt, label: 'Closets' },
  { icon: Layers, label: 'Portas Interiores' },
  { icon: DoorOpen, label: 'Painéis de Parede' },
  { icon: Ruler, label: 'Escadas em Madeira' },
  { icon: Maximize2, label: 'Aproveitamento de Espaços' },
  { icon: Package, label: 'Sapateiras & Entradas' },
  { icon: BookOpen, label: 'Estantes & Bibliotecas' },
  { icon: Tv, label: 'Móveis de TV Embutidos' },
  { icon: Droplets, label: 'Móveis de Casa de Banho' },
  { icon: LayoutDashboard, label: 'Sancas e LEDs' },
  { icon: Briefcase, label: 'Escritórios e Cadeiras' },
  { icon: BedDouble, label: 'Cabeceiras de Quarto' },
  { icon: Archive, label: 'Armários de Despensa' },
  { icon: Wrench, label: 'Pavimentos & Rodapés' },
]

const FAQS = [
  {
    q: 'Como funciona o pedido?',
    a: 'Envie as plantas, medidas, fotografias e a localização da obra. Depois de analisarmos o pedido, confirmamos os trabalhos, os materiais, o preço e o prazo previsto.',
  },
  {
    q: 'Que trabalhos fazem?',
    a: 'Fazemos cozinhas, roupeiros, portas interiores, painéis, escadas, móveis por medida, pavimentos e rodapés. Confirmamos a disponibilidade para outros trabalhos depois de analisar o pedido.',
  },
  {
    q: 'Que materiais utilizam?',
    a: 'Os materiais e as ferragens variam conforme o trabalho. As referências, os acabamentos e as condições ficam indicados na proposta.',
  },
  {
    q: 'Trabalham com empreiteiros e promotores?',
    a: 'Sim. Analisamos trabalhos para moradias, remodelações e edifícios com várias frações. A capacidade e o calendário são confirmados para cada obra.',
  },
  {
    q: 'Fazem apenas o fornecimento?',
    a: 'Depende do trabalho. Podemos fornecer e montar em obra, ou indicar na proposta quais as partes do serviço abrangidas.',
  },
  {
    q: 'Qual é a área geográfica de cobertura?',
    a: 'A nossa área de instalação regular é a Região Centro. Para outras zonas do país, contacte-nos primeiro para confirmarmos disponibilidade.',
  },
  {
    q: 'O orçamento tem custo?',
    a: 'Envie o pedido para análise. Se for necessária uma visita ou algum trabalho prévio antes da proposta, informamos primeiro as respetivas condições.',
  },
]

export default function EmpreiteirosPage() {
  return (
    <SimulatorProvider>
      <div className="min-h-screen bg-[#f8f5ef] text-[#19242e]">
        <Navbar />

        {/* ── HERO ── */}
        <section id="hero" className="relative flex items-center overflow-hidden bg-[#f8f5ef] pb-16 pt-28 sm:pb-20 sm:pt-32">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8f5ef_0%,#f3eee6_55%,#fff_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(240,91,19,0.10),transparent_34%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_78%,rgba(25,36,46,0.07),transparent_34%)]" />

          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(390px,0.85fr)] lg:items-center xl:gap-14">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mx-auto flex max-w-[900px] flex-col items-start text-left lg:mx-0 lg:pr-5"
              >
                <div className="mb-6">
                  <h1 className="font-display text-[2.65rem] font-bold leading-[0.98] tracking-[-0.04em] sm:text-[3.25rem] lg:text-[2.25rem] xl:text-[3rem]">
                    <span className="lg:hidden">
                      <span className="block text-[#19242e]">Carpintaria por medida</span>
                      <span className="block text-[#19242e]">para obras e</span>
                      <span className="block font-serif text-[0.95em] font-normal italic text-[#f08a45]">remodelações.</span>
                    </span>
                    <span className="hidden lg:block">
                      <span className="block whitespace-nowrap text-[#19242e]">Carpintaria por medida para</span>
                      <span className="block whitespace-nowrap font-serif text-[0.95em] font-normal italic text-[#f08a45]">obras e remodelações.</span>
                    </span>
                  </h1>
                  <p className="mb-6 mt-5 max-w-xl text-sm leading-7 text-[#40505b] sm:text-base">
                    <span>Fornecemos e montamos cozinhas, roupeiros, portas, painéis, escadas, pavimentos, rodapés e outros trabalhos de carpintaria.</span>
                  </p>

                  <div className="mb-6 rounded-[1.5rem] border border-[#d8d0c4] bg-[#19242e] p-2 shadow-[0_20px_55px_rgba(25,36,46,0.13)] sm:hidden">
                    <div className="relative h-[20rem] overflow-hidden rounded-[1.15rem] border border-white/10">
                      <img
                        src="/images/card-obras.png"
                        alt="Carpintaria para obra CarpiMater"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 mb-6">
                  {['Levantamento de medidas', 'Proposta por escrito', 'Fabrico e montagem'].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-[#40505b]">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 max-w-xl border-l-2 border-primary pl-4">
                  <p className="text-base font-semibold leading-6 text-[#19242e] sm:text-lg">
                    Serviço definido para cada obra.
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#40505b]">
                    Analisamos as medidas e os trabalhos pedidos antes de confirmar materiais, preço, condições e prazo previsto.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start lg:flex-nowrap mb-6">
                  <a
                    href={WA_LINK_PROPOSTA}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 whitespace-nowrap rounded-xl bg-primary px-7 text-[0.9rem] font-bold text-white shadow-[0_8px_24px_rgba(240,91,19,0.25)] transition hover:bg-primary/90"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    Pedir orçamento
                  </a>
                  <a
                    href={TEL_LINK}
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 whitespace-nowrap rounded-xl border border-[#c9c0b4] bg-white/70 px-7 text-[0.9rem] font-semibold text-[#19242e] transition-colors hover:border-[#19242e] hover:bg-white"
                  >
                    Ligar
                  </a>
                </div>

                <p className="mt-2 max-w-[760px] text-xs text-[#40505b]/60 sm:text-sm">
                  Região Centro · Outras zonas sujeitas a confirmação de disponibilidade
                </p>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: 20, y: 18 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="relative mx-auto hidden w-full max-w-[760px] lg:block lg:justify-self-end lg:pt-2"
              >
                <div className="rounded-[1.75rem] border border-[#d8d0c4] bg-[#19242e] p-2 shadow-[0_28px_70px_rgba(25,36,46,0.14)]">
                  <div className="relative h-[24rem] overflow-hidden rounded-[1.4rem] border border-white/10">
                    <img
                      src="/images/card-obras.png"
                      alt="Carpintaria para obra CarpiMater"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>

          <div className="hidden">
            <div className="w-px h-10 bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section id="servicos" className="border-y border-[#e4ded5] bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-6xl">
              <p className="section-kicker mb-3">Carpintaria em obra</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl">
                Serviços disponíveis
              </h2>
              
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <div key={s.label} className="group flex min-h-[82px] items-center gap-3 rounded-2xl border border-[#ded8cf] bg-[#fbfaf7] px-3.5 py-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_12px_28px_rgba(25,36,46,0.07)] sm:px-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#19242e] text-white transition-colors group-hover:bg-primary"><s.icon className="h-4 w-4" /></span>
                  <span className="text-sm font-semibold leading-5 text-[#19242e]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="bg-[#f8f5ef] px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto grid grid-cols-2 gap-5 rounded-[1.5rem] border border-[#2b3b47] bg-[#19242e] p-6 shadow-[0_18px_45px_rgba(25,36,46,0.13)] sm:grid-cols-3 sm:p-7 lg:grid-cols-5">
              {[
                { val: 'Por medida', sub: 'Conforme a obra' },
                { val: 'Proposta', sub: 'Trabalhos discriminados' },
                { val: 'Materiais', sub: 'Definidos por escrito' },
                { val: 'Montagem', sub: 'Executada em obra' },
                { val: 'Cobertura', sub: 'Região Centro' },
              ].map((item, i, arr) => (
                <div key={item.val} className={`text-center lg:border-r lg:border-white/10 lg:last:border-r-0${i === arr.length - 1 && arr.length % 2 !== 0 ? ' col-span-2 sm:col-span-1' : ''}`}>
                  <p className="text-white font-bold text-sm">{item.val}</p>
                  <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <HowItWorks />

        {/* ── FAQ ── */}
        <section id="faq" className="bg-[#f8f5ef] py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10 max-w-2xl text-left"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
                FAQ
              </p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-4xl">
                Perguntas Frequentes
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Accordion type="single" collapsible className="grid gap-3">
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="rounded-2xl border border-[#ded8cf] bg-[#fbfaf7] px-5 shadow-sm transition data-[state=open]:border-primary data-[state=open]:shadow-[0_12px_30px_rgba(25,36,46,0.07)] sm:px-6"
                  >
                    <AccordionTrigger className="py-5 text-left text-sm font-bold text-[#19242e] hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-6 text-[#40505b]">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/[0.06] p-8 text-center">
              <p className="font-semibold text-foreground mb-4">Tem outra questão? Contacte-nos.</p>
              <a
                href={WA_LINK_PROPOSTA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-bold text-white transition-colors hover:bg-primary/90"
              >
                Pedir orçamento
              </a>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative overflow-hidden bg-[#f8f5ef] px-4 py-16 sm:px-6 lg:py-20">

          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#2b3b47] bg-[#19242e] px-6 py-14 text-center shadow-[0_24px_65px_rgba(25,36,46,0.15)] sm:px-10 lg:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(240,91,19,0.13),transparent_58%)]" />
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">Contacto</p>
            <h2 className="font-display font-bold mb-4 leading-snug text-white text-[clamp(1.5rem,3vw,2.2rem)]">
              Precisa de carpintaria para uma obra?
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-8">
              Envie as plantas, medidas ou fotografias e uma descrição dos trabalhos pretendidos.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {['Plantas ou medidas', 'Proposta por escrito', 'Montagem em obra'].map((s) => (
                <span key={s} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-white">
                  <Shield className="w-3.5 h-3.5 text-primary" /> {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a
                href={WA_LINK_PROPOSTA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-white shadow-[0_8px_26px_rgba(240,91,19,0.28)] transition-colors hover:bg-primary/90"
              >
                Pedir orçamento
              </a>
              <a
                href={TEL_LINK}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/[0.03] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                Ligar
              </a>
            </div>

            <p className="text-white/35 text-sm">
              Particulares · Empreiteiros · Promotores
            </p>
          </div>
        </section>

        <Footer />

        {/* ── FLOATING WHATSAPP ── */}
        <a
          href={WA_LINK_PROPOSTA}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>

      </div>
    </SimulatorProvider>
  )
}
