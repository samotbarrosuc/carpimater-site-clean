import { motion } from 'framer-motion'
import { MapPin, CheckCircle2, Shield, Clock, Gem, Star, Wrench, Package, DoorOpen, UtensilsCrossed, Layers, Maximize2, BookOpen, Tv, Droplets, Briefcase, BedDouble, Archive, LayoutGrid, Ruler, LayoutDashboard, Shirt, MessageCircle } from 'lucide-react'
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
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* ── HERO ── */}
        <section id="hero" className="relative flex items-center overflow-hidden bg-secondary pb-16 pt-28 sm:pb-20 sm:pt-32">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#1f2427_0%,#2a3034_35%,#15191c_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(236,156,72,0.22),transparent_38%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_76%,rgba(96,126,142,0.24),transparent_36%)]" />

          <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="max-w-[1520px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.96fr)_minmax(540px,1.04fr)] gap-10 xl:gap-14 items-start lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="max-w-[900px] mx-auto lg:mx-0 lg:pr-5 text-center lg:text-left flex flex-col items-center lg:items-start"
              >
                <div className="mb-6">
                  <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] xl:text-[3.5rem] font-display font-bold leading-[1.08] tracking-[-0.015em]">
                    <span className="block text-white">Carpintaria por medida</span>
                    <span className="block text-white">para obras e</span>
                    <span className="block font-serif text-[0.95em] font-normal italic text-[#f08a45]">remodelações.</span>
                  </h1>
                  <p className="text-white/65 text-sm sm:text-base max-w-xl leading-relaxed mt-4 mb-6">
                    <span>Fornecemos e montamos cozinhas, roupeiros, portas, painéis, escadas, pavimentos, rodapés e outros trabalhos de carpintaria.</span>
                  </p>

                  <div className="mb-6 rounded-2xl border border-white/12 bg-white/[0.06] p-2 shadow-[0_20px_55px_rgba(0,0,0,0.18)] sm:hidden">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[22rem]">
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
                    <div key={item} className="flex items-center gap-2.5 text-white/80">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6 max-w-xl border-l-2 border-primary pl-4">
                  <p className="text-base sm:text-lg font-semibold text-white leading-6">
                    Serviço definido para cada obra.
                  </p>
                  <p className="text-sm text-white/70 mt-2">
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
                    className="inline-flex min-h-[52px] items-center justify-center gap-3 whitespace-nowrap rounded-xl border border-white/20 bg-white/[0.04] px-7 text-[0.9rem] font-semibold text-white transition-colors hover:bg-white/[0.09]"
                  >
                    Ligar
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-white/40 max-w-[760px] mt-2">
                  Região Centro · Outras zonas sujeitas a confirmação de disponibilidade
                </p>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: 20, y: 18 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="hidden lg:block relative w-full max-w-[760px] mx-auto lg:mx-0 lg:justify-self-end lg:pt-2"
              >
                <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 h-[22rem]">
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

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-px h-10 bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section id="servicos" className="bg-[#f8f5ef] py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-10 max-w-5xl">
              <p className="section-kicker mb-3">Carpintaria em obra</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.025em] text-slate-950 sm:text-4xl">
                Serviços disponíveis
              </h2>
              
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <div key={s.label} className="clean-card flex min-h-16 items-center gap-3 rounded-xl px-3.5 py-3.5 sm:px-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f7f3ea]"><s.icon className="h-4 w-4 text-primary" /></span>
                  <span className="text-slate-950 text-sm font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="bg-[#111] border-y border-white/10 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 max-w-4xl mx-auto">
              {[
                { val: 'Por medida', sub: 'Conforme a obra' },
                { val: 'Proposta', sub: 'Trabalhos discriminados' },
                { val: 'Materiais', sub: 'Definidos por escrito' },
                { val: 'Montagem', sub: 'Executada em obra' },
                { val: 'Cobertura', sub: 'Região Centro' },
              ].map((item, i, arr) => (
                <div key={item.val} className={`text-center${i === arr.length - 1 && arr.length % 2 !== 0 ? ' col-span-2 sm:col-span-1' : ''}`}>
                  <p className="text-white font-bold text-sm">{item.val}</p>
                  <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <HowItWorks />

        {/* ── MARKET PROOF ── */}
        <section className="py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
                Processo de trabalho
              </p>
              <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-white">
                Como prestamos o serviço
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: MapPin,
                  title: 'Levantamento',
                  desc: 'Recolhemos as medidas, plantas, fotografias e condições da obra.',
                },
                {
                  icon: Clock,
                  title: 'Proposta',
                  desc: 'Indicamos os trabalhos, materiais, preço e prazo previsto.',
                },
                {
                  icon: Gem,
                  title: 'Fabrico',
                  desc: 'O fabrico começa depois da aprovação das medidas e da proposta.',
                },
                {
                  icon: Wrench,
                  title: 'Montagem',
                  desc: 'Fazemos a montagem em obra nos locais e condições confirmados.',
                },
              ].map((card, i) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.title}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-5 flex flex-col gap-3.5 hover:border-primary/25 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-primary/14">
                      <Icon size={17} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1 text-sm leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-white/45">{card.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-16 lg:py-24 bg-muted/30">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
                FAQ
              </p>
              <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-foreground">
                Perguntas Frequentes
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Accordion type="single" collapsible className="flex flex-col gap-2">
                {FAQS.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="rounded-xl border px-5 bg-white shadow-sm data-[state=open]:border-primary"
                  >
                    <AccordionTrigger className="font-medium text-sm text-left py-4 hover:no-underline text-foreground">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed pb-4 text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <div className="mt-10 rounded-2xl bg-primary/8 border border-primary/20 p-8 text-center">
              <p className="font-semibold text-foreground mb-4">Tem outra questão? Contacte-nos.</p>
              <a
                href={WA_LINK_PROPOSTA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-full hover:bg-primary/90 transition-colors"
              >
                Pedir orçamento
              </a>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-secondary">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(240,91,19,0.10),transparent_55%)]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">Contacto</p>
            <h2 className="font-display font-bold mb-4 leading-snug text-white text-[clamp(1.5rem,3vw,2.2rem)]">
              Precisa de carpintaria para uma obra?
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-8">
              Envie as plantas, medidas ou fotografias e uma descrição dos trabalhos pretendidos.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {['Plantas ou medidas', 'Proposta por escrito', 'Montagem em obra'].map((s) => (
                <span key={s} className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm px-4 py-2 rounded-full">
                  <Shield className="w-3.5 h-3.5 text-primary" /> {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <a
                href={WA_LINK_PROPOSTA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors text-base shadow-[0_8px_30px_rgba(240,91,19,0.5)]"
              >
                Pedir orçamento
              </a>
              <a
                href={TEL_LINK}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-base"
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
