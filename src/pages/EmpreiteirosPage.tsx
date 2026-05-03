import { useState } from 'react'
import { MapPin, ChevronDown, CheckCircle2, Shield, Clock, Star, Wrench, Package, DoorOpen, UtensilsCrossed, Layers, Maximize2, BookOpen, Tv, Droplets, Briefcase, BedDouble, Archive, LayoutGrid, Ruler, LayoutDashboard, Shirt } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SimulatorProvider } from '@/context/SimulatorContext'

const WA_NUMBER = '351919528638'
const WA_MSG_PROPOSTA = encodeURIComponent('Olá CarpiMater! Sou empreiteiro/investidor e quero uma proposta de carpintaria para obra.')
const WA_MSG_PROJETO = encodeURIComponent('Olá! Quero iniciar o meu projecto de carpintaria com a CarpiMater.')
const WA_LINK_PROPOSTA = `/whatsapp-redirect.html?url=${encodeURIComponent(`https://wa.me/${WA_NUMBER}?text=${WA_MSG_PROPOSTA}`)}`
const WA_LINK_PROJETO = `/whatsapp-redirect.html?url=${encodeURIComponent(`https://wa.me/${WA_NUMBER}?text=${WA_MSG_PROJETO}`)}`
const TEL_LINK = `tel:+${WA_NUMBER}`

const SERVICES = [
  { icon: LayoutGrid, label: 'Roupeiros Embutidos' },
  { icon: UtensilsCrossed, label: 'Cozinhas Completas' },
  { icon: Shirt, label: 'Closets & Walk-in' },
  { icon: Layers, label: 'Painéis de Parede' },
  { icon: DoorOpen, label: 'Portas Interiores' },
  { icon: Ruler, label: 'Escadas em Madeira' },
  { icon: Maximize2, label: 'Aproveitamento de Espaços' },
  { icon: Package, label: 'Sapateiras & Entradas' },
  { icon: BookOpen, label: 'Estantes & Bibliotecas' },
  { icon: Tv, label: 'Móveis de TV Embutidos' },
  { icon: Droplets, label: 'Móveis de Casa de Banho' },
  { icon: LayoutDashboard, label: 'Tetos Falsos & Sancas' },
  { icon: Briefcase, label: 'Escritórios Embutidos' },
  { icon: BedDouble, label: 'Cabeceiras de Quarto' },
  { icon: Archive, label: 'Armários de Despensa' },
  { icon: Wrench, label: 'Rodapés & Revestimentos' },
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
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#1a1208]">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1208]/95 via-[#1a1208]/80 to-[#2d1f0a]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(201,136,13,0.22),transparent_60%)]" />

          <div className="container mx-auto px-4 relative pt-28 pb-20 sm:py-32 lg:py-40">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 font-medium mb-8">
                <Clock className="w-4 h-4 text-primary" />
                <span className="sm:hidden">Paços de Ferreira · +40 anos</span><span className="hidden sm:inline">Mais de 40 anos de carpintaria</span>
              </div>

              <h1 className="text-[1.9rem] sm:text-[2.5rem] lg:text-[3rem] font-display font-bold text-white leading-[1.07] mb-5">
                A Carpintaria Que{' '}
                <span className="block text-primary">Não Atrasa a Sua Obra</span>
              </h1>

              <p className="text-white/65 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
                <span className="sm:hidden">Carpintaria sob medida para obras. Tratamos de tudo, da proposta à instalação.</span>
                <span className="hidden sm:inline">Roupeiros, cozinhas, portas interiores, closets e painéis para empreiteiros e investidores. Materiais de qualidade, preços competitivos, entrega cumprida.</span>
              </p>

              <div className="flex flex-col gap-2.5 mb-7">
                {['Orçamento Gratuito em 24h', 'Projecto Detalhado e Aprovado', 'Instalado na Sua Obra a Tempo'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-white/75">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={WA_LINK_PROPOSTA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-4 rounded-full hover:bg-primary/90 transition-colors text-base shadow-[0_8px_30px_rgba(201,136,13,0.4)]"
              >
                Pedir Orçamento Gratuito
              </a>

              <p className="text-white/45 text-sm mt-7">
                Orçamento sem compromisso · Sem custos ocultos · Entrega cumprida
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-px h-10 bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="bg-[#111] border-y border-white/10 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 max-w-4xl mx-auto">
              {[
                { val: 'Paços de Ferreira', sub: 'Capital Portuguesa do Móvel' },
                { val: '40+ Anos', sub: 'De Tradição em Carpintaria' },
                { val: 'Qualidade', sub: 'Materiais Premium por Defeito' },
                { val: 'Preço Justo', sub: 'Sem Intermediários' },
                { val: 'Sem Atrasos', sub: 'Entrega Cumprida em Obra' },
              ].map((item, i, arr) => (
                <div key={item.val} className={`text-center${i === arr.length - 1 && arr.length % 2 !== 0 ? ' col-span-2 sm:col-span-1' : ''}`}>
                  <p className="text-white font-bold text-sm">{item.val}</p>
                  <p className="text-white/50 text-xs mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICES GRID ── */}
        <section id="servicos" className="py-12 sm:py-20 bg-[#1a1208]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Tudo o que a sua obra precisa
              </h2>
              <p className="text-white/55 mt-3 max-w-xl mx-auto">
                De roupeiros a escadas, de cozinhas a tetos falsos — um único parceiro para toda a carpintaria.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {SERVICES.map((s) => (
                <div key={s.label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-4">
                  <s.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARKET PROOF ── */}
        <section className="py-12 sm:py-20 bg-[#111]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Porquê nos escolhem</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                O que nos torna diferentes
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto">
              {[
                {
                  icon: Package,
                  title: 'Fabrico próprio em Portugal',
                  desc: 'Produção CNC em oficina própria em Paços de Ferreira. Sem intermediários, sem dependência de fornecedores externos.',
                },
                {
                  icon: Clock,
                  title: 'Prazos que não atrasam a obra',
                  desc: 'A produção é nossa — o prazo está nas nossas mãos. Planeamos cada fase com datas concretas e cumprimo-las.',
                },
                {
                  icon: Shield,
                  title: 'Qualidade de material por defeito',
                  desc: 'Não existe linha económica. Usamos MDF de qualidade, ferragens europeias e acabamentos que resistem ao tempo.',
                },
                {
                  icon: Wrench,
                  title: 'Orçamento fixo sem surpresas',
                  desc: 'Preço fechado antes do fabrico. Sem alterações a meio da obra, sem custos ocultos, sem negociações de última hora.',
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-white mb-2.5 leading-snug">{c.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-12 sm:py-20 bg-[#150e04]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Processo</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Como Funciona</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 max-w-6xl mx-auto mb-12">
              {[
                { n: '01', title: 'Briefing Empresarial', when: 'Dia 1', desc: 'Analisamos o projecto e entregamos orçamento fixo em 48h, sem custos ocultos.' },
                { n: '02', title: 'Projecto Detalhado', when: 'Semana 1–2', desc: 'Desenhamos cada solução com renders 3D para aprovação antes do fabrico.' },
                { n: '03', title: 'Fabrico Eficiente', when: 'Semanas 2–10', desc: 'Produção CNC em oficina própria em Paços de Ferreira, com controlo total.' },
                { n: '04', title: 'Instalação e Entrega', when: 'Até 3 Meses', desc: 'Montagem profissional em obra, pronto para venda ou entrega ao cliente final.' },
              ].map((step) => (
                <div key={step.n} className="relative rounded-2xl border border-white/10 bg-white/5 p-7 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-4xl font-display font-bold text-primary/30">{step.n}</span>
                    <span className="text-xs bg-primary/20 text-primary font-semibold px-3 py-1 rounded-full">{step.when}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href={WA_LINK_PROJETO}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors shadow-[0_8px_30px_rgba(201,136,13,0.4)]"
              >
                Iniciar o Meu Projecto
              </a>
            </div>
          </div>
        </section>

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

        {/* ── FAQ ── */}
        <section id="faq-section" className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">FAQ</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold">Perguntas Frequentes</h2>
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

        {/* ── TESTIMONIALS ── */}
        <section className="py-12 sm:py-20 bg-[#1a1208]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Testemunhos</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">O que dizem os nossos clientes</h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
              {[
                { quote: 'A CarpiMater entregou a carpintaria da nossa promoção imobiliária dentro do prazo e com uma qualidade que superou as expectativas. Os acabamentos são excelentes.', name: 'Ricardo F.', role: 'Empreiteiro', location: 'Coimbra' },
                { quote: 'Como investidor, o que mais me importa é cumprimento de prazos e qualidade. A CarpiMater entregou ambos. O projecto ficou pronto em menos de 3 meses.', name: 'Ana M.', role: 'Investidora Imobiliária', location: 'Porto' },
                { quote: 'Os roupeiros e as portas encaixaram perfeitamente na construção. Trabalho com a CarpiMater em todas as obras da região centro.', name: 'Jorge S.', role: 'Gestor de Obra', location: 'Leiria' },
              ].map((t) => (
                <div key={t.name} className="rounded-2xl bg-white p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                  </div>
                  <p className="text-foreground leading-7 mb-6 italic">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role} · {t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="relative overflow-hidden py-24 bg-[#0e0a04]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,136,13,0.25),transparent_65%)]" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-primary/10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-primary/10 translate-y-1/2 -translate-x-1/2" />

          <div className="container mx-auto px-4 relative text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">Pronto para começar?</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4 max-w-2xl mx-auto leading-snug">
              Quer Qualidade de Carpintaria a Preço Justo?
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

        {/* ── MOBILE STICKY BAR ── */}
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden flex border-t border-white/10 bg-[#1a1208]/95 backdrop-blur-sm">
          <a
            href={TEL_LINK}
            className="flex-1 flex items-center justify-center py-4 text-white font-bold text-sm border-r border-white/10 hover:bg-white/5 transition-colors"
          >
            Ligar Agora
          </a>
          <a
            href={WA_LINK_PROPOSTA}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center py-4 text-primary font-bold text-sm hover:bg-primary/10 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </SimulatorProvider>
  )
}
