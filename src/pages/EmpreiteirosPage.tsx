import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronDown, CheckCircle2, Shield, Clock, Gem, Star, Wrench, Package, DoorOpen, UtensilsCrossed, Layers, Maximize2, BookOpen, Tv, Droplets, Briefcase, BedDouble, Archive, LayoutGrid, Ruler, LayoutDashboard, Shirt, MessageCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HowItWorks from '@/components/cozinha/sections/HowItWorks'
import FabricoPrazoAdjudicacao from '@/components/cozinha/sections/FabricoPrazoAdjudicacao'
import { SimulatorProvider } from '@/context/SimulatorContext'

const WA_NUMBER = '351910093635'
const WA_MSG_PROPOSTA = encodeURIComponent('Olá CarpiMater! Sou empreiteiro/investidor e quero uma proposta de carpintaria para obra.')
const WA_MSG_PROJETO = encodeURIComponent('Olá! Quero iniciar o meu projecto de carpintaria com a CarpiMater.')
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
    q: 'Como garantem os prazos?',
    a: 'Planificamos cada fase — projecto, fabrico e instalação — com datas concretas. A nossa produção CNC própria em Paços de Ferreira elimina dependência de fornecedores externos e mantém o controlo do prazo nas nossas mãos.',
  },
  {
    q: 'A qualidade é comparável ao IKEA ou Leroy Merlin?',
    a: 'É muito superior. Usamos materiais de qualidade por defeito, com acabamentos e resistência que as grandes superfícies não oferecem a este preço. Fabricamos à medida — não há peças standard que "encaixam mais ou menos".',
  },
  {
    q: 'Que materiais utilizam?',
    a: 'Painéis de MDF e aglomerado de qualidade certificada, acabamentos lacados ou em folha de madeira real, ferragens de marcas europeias. Nada de baixo custo que comprometa o resultado final.',
  },
  {
    q: 'Quais os benefícios para investidores imobiliários?',
    a: 'Carpintaria de qualidade valoriza o imóvel e acelera a venda ou o arrendamento. Oferecemos projecto detalhado com renders 3D, preço fixo por obra e entrega coordenada com o calendário da construção.',
  },
  {
    q: 'Trabalham com empreiteiros de todas as dimensões?',
    a: 'Sim. Trabalhamos desde obras unifamiliares a promoções imobiliárias com múltiplas fracções. A nossa capacidade de produção CNC permite escalar sem perda de qualidade.',
  },
  {
    q: 'Qual é a área geográfica de cobertura?',
    a: 'Fabricamos em Paços de Ferreira e instalamos em todo o país. Temos cobertura especial no centro de Portugal: Coimbra, Aveiro, Leiria, Viseu e região.',
  },
  {
    q: 'O orçamento tem custo?',
    a: 'Não. O orçamento é sempre gratuito e sem compromisso. Fazemos uma análise detalhada do projecto e entregamos proposta com preço fixo em 48 horas.',
  },
]

const PROJECTS = [
  { category: 'Cozinhas', units: '12 unidades', title: 'Promoção residencial em Coimbra', location: 'Coimbra', date: 'Março 2025', img: '/images/cozinha-branca-lacada.jpg' },
  { category: 'Cozinhas', units: '8 unidades', title: 'Condomínio em Aveiro', location: 'Aveiro', date: 'Janeiro 2025', img: '/images/cozinha-carvalho.jpg' },
  { category: 'Carpintaria', units: '45 peças', title: 'Moradia unifamiliar Leiria', location: 'Leiria', date: 'Novembro 2024', img: '/images/cozinha-open-space.png' },
  { category: 'Carpintaria', units: '6 unidades', title: 'Apartamentos T3 em Viseu', location: 'Viseu', date: 'Outubro 2024', img: '/images/cozinha-branca-2.jpg' },
  { category: 'Interiores', units: '200 m²', title: 'Escritórios corporativos Porto', location: 'Porto', date: 'Agosto 2024', img: '/images/cozinha-faia.jpg' },
  { category: 'Obra Completa', units: 'Obra total', title: 'Construção nova em Cantanhede', location: 'Cantanhede', date: 'Julho 2024', img: '/images/card-obras.png' },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-foreground hover:bg-muted/40 transition-colors gap-4"
      >
        <span>{q}</span>
        <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-muted-foreground leading-7 text-sm border-t border-border pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

export default function EmpreiteirosPage() {
  return (
    <SimulatorProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        {/* ── HERO ── */}
        <section id="hero" className="relative min-h-[88vh] sm:min-h-screen bg-secondary flex items-center overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-20 lg:pt-32 lg:pb-20">
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
                    <span className="block text-primary">Toda a carpintaria</span>
                    <span className="block text-primary">para a sua obra,</span>
                    <span className="block text-white text-[0.95em] italic">sem atrasos!</span>
                  </h1>
                  <p className="text-white/65 text-sm sm:text-base max-w-xl leading-relaxed mt-4 mb-6">
                    <span className="sm:hidden">Carpintaria sob medida para obras.<br />Tratamos de tudo: das medidas à instalação.</span>
                    <span className="hidden sm:inline">Roupeiros, cozinhas, portas interiores, closets e painéis, etc.<br />Materiais de qualidade, preços mais baixos que as outras carpintarias, prazos cumpridos.</span>
                  </p>

                  <div className="sm:hidden rounded-[30px] border border-white/14 bg-white/[0.09] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] mb-6">
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
                  {['Orçamento gratuito e rápido', 'Pouca burocracia', 'Compromisso com os prazos'].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-white/80">
                      <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-[2rem] border border-primary/20 bg-primary/10 p-5 mb-6 max-w-xl">
                  <p className="text-base sm:text-lg font-semibold text-white leading-6">
                    Qualidade de topo, aos preços mais baixos do mercado.
                  </p>
                  <p className="text-sm text-white/70 mt-2">
                    Produção própria em Paços de Ferreira, sem intermediários, com instalação coordenada e cumprimento dos prazos (média de 10 semanas).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start lg:flex-nowrap mb-6">
                  <a
                    href={WA_LINK_PROPOSTA}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-3.5 rounded-full text-[0.95rem] font-bold whitespace-nowrap transition-all bg-primary text-white hover:bg-primary/90 shadow-[0_8px_30px_rgba(201,136,13,0.45)]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    Pedir Orçamento Gratuito
                  </a>
                  <a
                    href={TEL_LINK}
                    className="inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-3.5 rounded-full text-[0.95rem] font-semibold whitespace-nowrap border border-white/25 text-white bg-white/[0.04] hover:bg-white/[0.09] transition-colors"
                  >
                    Ligar Agora
                  </a>
                </div>

                <p className="text-xs sm:text-sm text-white/40 max-w-[760px] mt-2">
                  Orçamento sem compromisso · Sem custos ocultos · Entregue dentro do prazo
                </p>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: 20, y: 18 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="hidden lg:block relative w-full max-w-[760px] mx-auto lg:mx-0 lg:justify-self-end lg:pt-2"
              >
                <div className="rounded-[30px] border border-white/14 bg-white/[0.09] backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
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
        <section id="servicos" className="py-12 sm:py-20 bg-[#f7f1e8]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14 rounded-[2rem] bg-white px-8 py-10 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">
                Tudo o que a sua obra precisa
              </h2>
              
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {SERVICES.map((s) => (
                <div key={s.label} className="flex items-center gap-3 bg-[#efe2d1] border border-[#d8b3a0] rounded-3xl px-4 py-4 shadow-sm">
                  <s.icon className="w-4 h-4 text-[#8b7355] shrink-0" />
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
                { val: 'Fabrico Nacional', sub: 'Paços de Ferreira' },
                { val: 'Tradição', sub: '40+ Anos' },
                { val: 'Qualidade', sub: 'Materiais Premium' },
                { val: 'Preço mais baixo', sub: 'Sem Intermediários' },
                { val: 'Prazos Cumpridos', sub: 'Sem Atrasos' },
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
        <FabricoPrazoAdjudicacao />

        {/* ── PROJECTS GALLERY ── */}
        <section id="projectos" className="py-12 sm:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Portfolio</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold">Projectos Realizados</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
              {PROJECTS.map((p) => (
                <div key={p.title} className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/40 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">{p.category}</span>
                    <span className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">{p.units}</span>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={WA_LINK_PROPOSTA}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-primary text-white font-bold px-5 py-3 rounded-full text-sm hover:bg-primary/90 transition-colors"
                      >
                        Projecto Similar
                      </a>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-foreground mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">{p.location}</p>
                    <p className="text-xs text-primary font-semibold mt-2">{p.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARKET PROOF ── */}
        <section className="py-16 lg:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
                Porquê a CarpiMater
              </p>
              <h2 className="font-display font-bold text-2xl lg:text-[1.75rem] text-white">
                O que nos distingue
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: MapPin,
                  title: 'Fabrico Próprio',
                  desc: 'Produzimos em Paços de Ferreira, sem intermediários. Os valores saem mais baixos e é difícil bater este nível de qualidade.',
                },
                {
                  icon: Clock,
                  title: 'Prazos Cumpridos',
                  desc: 'Planificamos cada fase antes de começar. O prazo acordado é o prazo de entrega.',
                },
                {
                  icon: Gem,
                  title: 'Materiais de Qualidade',
                  desc: 'Utilizamos apenas ferragens de marca e madeiras de qualidade superior.',
                },
                {
                  icon: Wrench,
                  title: 'Montagem Incluída',
                  desc: 'As nossas equipas instalam tudo. Do centro ao norte do país, sem custos adicionais.',
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
        <section id="faq" className="py-12 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">FAQ</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">Perguntas Frequentes</h2>
              </div>
              <div className="space-y-3">
                {FAQS.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
              <div className="mt-10 rounded-2xl bg-primary/8 border border-primary/20 p-8 text-center">
                <p className="font-semibold text-foreground mb-4">Tem outra questão? Fale directamente connosco.</p>
                <a
                  href={WA_LINK_PROPOSTA}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Pedir Orçamento Gratuito
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-20 lg:py-28 relative overflow-hidden bg-secondary">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,136,13,0.10),transparent_55%)]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">Pronto para começar?</p>
            <h2 className="font-display font-bold mb-4 leading-snug text-white text-[clamp(1.5rem,3vw,2.2rem)]">
              Quer carpintaria de qualidade com valores mais baixos?
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-8">
              Fale connosco agora e receba um orçamento gratuito e detalhado em 24 horas. Sem compromisso.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {['Resposta em 24h', 'Orçamento gratuito', 'Sem compromisso'].map((s) => (
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
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors text-base shadow-[0_8px_30px_rgba(201,136,13,0.5)]"
              >
                Pedir Orçamento Gratuito
              </a>
              <a
                href={TEL_LINK}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-base"
              >
                Ligar Agora
              </a>
            </div>

            <p className="text-white/35 text-sm">
              Carpintaria de Paços de Ferreira · Mais de 40 anos de tradição · Vários clientes satisfeitos
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
