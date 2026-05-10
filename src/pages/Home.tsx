import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import AboutUs from '@/components/AboutUs'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { WHATSAPP_NUMBER, EMAIL } from '@/content/site'
import { Star, ShieldCheck, Clock3, Layers, Wrench, ChevronRight, Mail, MessageCircle, Phone } from 'lucide-react'

const WA_HOME = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá CarpiMater! Gostaria de saber mais sobre os vossos serviços.')}`

const WHY_CARDS = [
  {
    icon: Layers,
    title: 'Ao preço das grandes superfícies.',
    desc: 'Sem intermediários desnecessários, os nossos preços são mais competitivos que a média do mercado. O transporte dos materiais é feito por nós e é gratuito. Orçamento claro, sem surpresas no final.',
  },
  {
    icon: ShieldCheck,
    title: 'Materiais com garantia.',
    desc: 'Trabalhamos apenas com fornecedores estabelecidos no mercado há décadas. Cada material é escolhido por nós com critério — não existe linha económica na CarpiMater.',
  },
  {
    icon: Wrench,
    title: 'Feito à medida.',
    desc: 'Cada projeto é concebido ao gosto e necessidades do cliente, com fornecimento, instalação e acabamentos num único contacto. Sem coordenações complicadas, sem soluções de prateleira.',
  },
  {
    icon: Clock3,
    title: 'Palavra cumprida.',
    desc: 'Entregamos em 3 meses após adjudicação — fabrico e entrega incluídos. Não é uma estimativa — é o prazo a que nos comprometemos e que cumprimos obra após obra.',
  },
]

const STEPS = [
  { num: '01', title: 'Simule ou contacte', desc: 'Use o simulador de orçamento ou envie mensagem por WhatsApp. Tentamos sempre dar resposta no próprio dia.' },
  { num: '02', title: 'Confirmamos os detalhes', desc: 'Acertamos medidas, materiais e datas. O valor do orçamento é o que paga — sem acréscimos no final.' },
  { num: '03', title: 'Instalação profissional', desc: 'Execução limpa e rápida. Entregamos o espaço pronto a usar com toda a coordenação a nosso cargo.' },
]

const ZONES = [
  'Coimbra', 'Aveiro', 'Leiria', 'Condeixa-a-Nova', 'Figueira da Foz',
  'Cantanhede', 'Montemor-o-Velho', 'Miranda do Corvo', 'Penacova', 'Mealhada',
  'Anadia', 'Batalha', 'Nazaré', 'Tomar', 'Pombal',
  'Alcobaça', 'Caldas da Rainha', 'Marinha Grande', 'Óbidos', 'Peniche',
  'Águeda', 'Albergaria-a-Velha', 'Arouca', 'Ílhavo', 'Ovar',
  'Vila Nova de Gaia', 'Matosinhos', 'Maia', 'Gondomar', 'Vila do Conde',
  'Braga', 'Guimarães', 'Barcelos', 'Fafe', 'Vila Verde',
  'Viseu', 'Lamego', 'Tondela', 'Nelas', 'Mangualde',
]

export default function Home() {
  const [contactForm, setContactForm] = useState({ nome: '', contacto: '', mensagem: '' })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage('Mensagem enviada com sucesso! Responderemos em breve.')
        setContactForm({ nome: '', contacto: '', mensagem: '' })
      } else {
        setSubmitMessage(`Erro ao enviar mensagem: ${data.error}`)
      }
    } catch (error) {
      setSubmitMessage('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToContactSection = (target: HTMLElement) => {
    const offset = window.innerWidth < 768 ? 60 : 70
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useEffect(() => {
    document.title = 'CarpiMater — Pavimentos, Cozinhas e Carpintaria em Coimbra, Aveiro e Leiria'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'Especialistas em pavimento vinílico, pavimento flutuante e cozinhas por medida. Fornecimento e instalação profissional em Coimbra, Aveiro e Leiria. Orçamento rápido e sem compromisso.')
    }

    const scrollToHashSection = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'home-contacto' || hash === 'home-contactos' || hash === 'footer-contactos') {
        const target = document.getElementById(hash)
        if (target) {
          setTimeout(() => {
            scrollToContactSection(target)
          }, 120)
        }
      }
    }

    scrollToHashSection()
    window.addEventListener('hashchange', scrollToHashSection)
    return () => window.removeEventListener('hashchange', scrollToHashSection)
  }, [])

  return (
    <SimulatorProvider>
      <main>
        <Navbar />

        {/* ── HERO ── */}
        <section id="home-hero" className="pt-28 pb-12 sm:pt-32 sm:pb-20 bg-secondary text-secondary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,136,13,0.22),transparent_42%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(255,255,255,0.07),transparent_38%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">
                  CarpiMater · Coimbra, Aveiro &amp; Leiria
                </p>
                <h1 className="text-[2rem] sm:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-display font-bold text-white leading-[1.08] mb-4">
                  Carpintarias
                  <span className="block text-primary">que transformam espaços.</span>
                </h1>
                <p className="text-white/65 text-sm sm:text-base max-w-2xl mx-auto mb-4 leading-relaxed">
                  <span className="sm:hidden">Especialistas em cozinhas, pavimentos, roupeiros e móveis.</span>
                  <span className="hidden sm:inline">Especialistas em cozinhas, pavimentos, roupeiros e móveis. Fabrico e instalação profissional de carpintarias de obra, em toda a região centro de Portugal.</span>
                </p>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center mb-6 text-xs">
                  {['Resposta em 24h', 'Orçamento sem compromisso', 'Transporte gratuito', 'Materiais certificados', 'Instalação profissional'].map((b, i) => (
                    <span key={b} className={`inline-flex items-center gap-1.5 rounded-full border border-white/18 bg-white/8 px-3 py-1.5 text-white/72 font-medium justify-center${i === 4 ? ' col-span-2 sm:col-span-auto' : ''}`}>
                      <span className="text-primary">✓</span>{b}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 sm:mb-10">
                  <a
                    href="/#home-contactos"
                    onClick={(e) => {
                      e.preventDefault()
                      const target = document.getElementById('home-contactos')
                      if (target) scrollToContactSection(target)
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_8px_30px_rgba(201,136,13,0.35)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Pedir Orçamento Gratuito
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto w-full">
                  {[
                    { label: 'Cozinhas', sub: 'Cozinhas por medida', href: '/cozinha', icon: Wrench, img: '/images/card-cozinhas.png' },
                    { label: 'Pavimentos', sub: 'Vinílico SPC & Flutuante', href: '/pavimentos', icon: Layers, img: '/images/pavimento-vinilico-sala-coimbra.png' },
                    { label: 'Construção & Obra', sub: 'Roupeiros, escadas, portas, etc.', href: '/construção', icon: ShieldCheck, img: '/images/card-obras.png' },
                  ].map(({ label, sub, href, icon: Icon, img }) => (
                    <a
                      key={href}
                      href={href}
                      className="group relative flex flex-col justify-end rounded-2xl overflow-hidden min-h-[280px] border border-white/10 hover:border-primary/60 transition-all duration-500 shadow-xl hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                    >
                      <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-700 group-hover:scale-112 group-hover:blur-[2px]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      <div className="relative z-10 p-6 transition-transform duration-400 group-hover:-translate-y-1">
                        <div className="mb-2">
                          <span className="text-white/50 text-xs font-medium uppercase tracking-widest group-hover:text-white/80 transition-colors duration-300">{sub}</span>
                        </div>
                        <p className="font-display font-bold text-white leading-tight mb-5 text-xl transition-all duration-300 group-hover:text-[1.45rem]">{label}</p>
                        <span className="inline-flex items-center gap-1.5 bg-white/0 group-hover:bg-white/15 border border-transparent group-hover:border-white/25 rounded-full px-0 group-hover:px-4 py-0 group-hover:py-2 text-white/60 group-hover:text-white text-xs font-bold transition-all duration-400">
                          Ver mais <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── EDITORIAL LIFESTYLE ── */}
        <section className="relative h-[340px] sm:h-[420px] lg:h-[580px] overflow-hidden">
          <img
            src="/images/cozinha-renovacao.jpg"
            alt="Transformação de espaço realizada pela CarpiMater"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-lg lg:max-w-2xl">
                <div className="w-10 lg:w-16 h-px bg-primary mb-6 lg:mb-8" />
                <p className="text-white font-display font-bold text-2xl sm:text-[1.85rem] lg:text-[3.25rem] leading-tight mb-3 lg:mb-5">
                  Carpintaria por medida<br />para a sua casa.
                </p>
                <p className="text-white/60 text-sm lg:text-base leading-relaxed max-w-xs lg:max-w-md">
                  Cada obra é tratada com exigência e detalhe, em constante trabalho de equipa com os nossos parceiros de Paços de Ferreira. 
                </p>
                <div className="mt-7 lg:mt-10 flex items-center gap-6 sm:gap-8 lg:gap-14">
                  <div>
                    <p className="text-xl sm:text-2xl lg:text-5xl font-display font-bold text-primary">400+</p>
                    <p className="text-[10px] lg:text-xs text-white/45 mt-0.5 lg:mt-2 uppercase tracking-[0.12em]">obras realizadas</p>
                  </div>
                  <div className="w-px h-7 lg:h-12 bg-white/18" />
                  <div>
                    <p className="text-xl sm:text-2xl lg:text-5xl font-display font-bold text-primary">40</p>
                    <p className="text-[10px] lg:text-xs text-white/45 mt-0.5 lg:mt-2 uppercase tracking-[0.12em]">anos de exp.</p>
                  </div>
                  <div className="w-px h-7 lg:h-12 bg-white/18" />
                  <div>
                    <p className="text-xl sm:text-2xl lg:text-5xl font-display font-bold text-primary">5,0</p>
                    <p className="text-[10px] lg:text-xs text-white/45 mt-0.5 lg:mt-2 uppercase tracking-[0.12em]">no Google</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GOOGLE BADGE ── */}
        <div className="flex justify-center py-8 bg-background">
          <a href="https://www.google.com/search?q=CarpiMater+Coimbra" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm shadow-sm hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            <span className="font-semibold text-foreground">5,0</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-muted-foreground">no Google</span>
          </a>
        </div>

        {/* ── POR QUE CARPIMATER ── */}
        <section className="py-20 bg-muted/40 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Por que nos escolher</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
                  A decisão mais simples é a certa.
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Da primeira visita ao acabamento final, gerimos cada detalhe para que não tenha de se preocupar com nada.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {WHY_CARDS.map(({ icon: Icon, title, desc }) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/12 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3 SERVICE CARDS ── */}
        <section id="home-servicos" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">O que fazemos</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
                Três serviços, uma equipa de confiança
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Mobiliário e toda a carpintaria para sua casa — fornecimento, instalação e acabamentos geridos por nós de início ao fim.
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Cozinhas */}
              <a href="/cozinha" className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img
                    src="/images/cozinha-open-space.png"
                    alt="Cozinha por medida projectada e montada pela CarpiMater"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                </div>
                <div className="p-7 flex flex-col flex-1 items-center text-center">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">Cozinhas por Medida</h3>
                  
                  
                  <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Ver projetos e pedir proposta <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </a>

              {/* Pavimentos — merged Vinílico + Flutuante */}
              <a href="/pavimentos" className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img
                    src="/images/pavimento-vinilico-sala-coimbra.png"
                    alt="Pavimento vinílico e flutuante instalado pela CarpiMater em Coimbra"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                </div>
                <div className="p-7 flex flex-col flex-1 items-center text-center">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">Pavimentos</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    <span className="rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">Vinílico SPC</span>
                    <span className="rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">Flutuante</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Catálogo e Simulador Online <ChevronRight className="w-4 h-4" />
                  </span>
                  <div className="flex justify-center mt-6">
                    <span className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Simulador Online</span>
                  </div>
                </div>
              </a>

              {/* Empreiteiros */}
              <a href="/construção" className="group flex flex-col rounded-2xl border border-primary/30 bg-card overflow-hidden hover:border-primary hover:shadow-[0_12px_40px_rgba(201,136,13,0.15)] transition-all duration-300 relative">
                <div className="absolute top-3 right-3 z-10 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                  Para Obras
                </div>
                <div className="relative h-56 overflow-hidden shrink-0">
                  <img
                    src="/images/cozinha-branca-lacada.jpg"
                    alt="Carpintaria para empreiteiros e investidores imobiliários — CarpiMater"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                </div>
                <div className="p-7 flex flex-col flex-1 items-center text-center">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">Construção &amp; Empreiteiros</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    Carpintaria completa para obra: roupeiros, cozinhas, portas, closets e painéis. Resposta rápida para empreiteiros e promotores.
                  </p>
                  <div className="flex gap-2 mb-5 justify-center">
                    <span className="rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">Preços de fábrica</span>
                    <span className="rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">Prazos garantidos</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    Ver soluções para obra <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(201,136,13,0.12),transparent_55%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Processo</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  Da ideia à obra em 3 passos
                </h2>
                <p className="text-white/65 max-w-xl mx-auto">
                  Simples, rápido e sem surpresas. É assim que a CarpiMater trabalha.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {STEPS.map(({ num, title, desc }) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/12 bg-white/5 p-7"
                  >
                    <span className="text-4xl font-display font-bold text-primary/50 mb-3 block">{num}</span>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <a
                  href={`/whatsapp-redirect.html?url=${encodeURIComponent(WA_HOME)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full text-sm font-bold hover:bg-[#1ebe5d] transition-colors"
                >
                  Falar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── ZONA DE COBERTURA (SEO) ── */}
        <section className="py-16 bg-muted/40 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Onde actuamos</p>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                    Coimbra, Aveiro, Leiria e toda a região centro
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    A CarpiMater opera em toda a zona centro de Portugal. Fazemos instalação de pavimentos vinílicos e flutuantes, cozinhas por medida e carpintaria de obra em Coimbra, Aveiro, Leiria, Porto, Braga e Viseu, e concelhos adjacentes.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Para projectos fora desta zona, contacte-nos — avaliamos caso a caso com deslocação acordada.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ZONES.map((zone) => (
                    <span
                      key={zone}
                      className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground/80 hover:border-primary/50 hover:text-foreground transition-colors cursor-default"
                    >
                      {zone}
                    </span>
                  ))}
                  <span className="rounded-full border border-primary/30 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary cursor-default">
                    + mais concelhos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACTOS ── */}
        <section
          id="home-contactos"
          className="py-20 bg-background border-t border-border"
          style={{ scrollMarginTop: '4rem' }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Contacto</p>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-4">
                    Fale connosco
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    Respondemos em menos de 24 horas, por WhatsApp ou e-mail. Sem compromisso.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href={`/whatsapp-redirect.html?url=${encodeURIComponent(WA_HOME)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-[#25D366]/50 hover:bg-[#25D366]/5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">WhatsApp</p>
                        <p className="text-muted-foreground text-xs">Resposta mais rápida</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </a>
                    <a
                      href={`mailto:${EMAIL}`}
                      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{EMAIL}</p>
                        <p className="text-muted-foreground text-xs">Para orçamentos e questões gerais</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </a>
                    <a
                      href={`tel:+351910093635`}
                      className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">910 093 635</p>
                        <p className="text-muted-foreground text-xs">Ligue directamente</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                <div id="home-contacto" style={{ scrollMarginTop: '4rem' }} className="bg-card border border-border rounded-2xl p-6 sm:p-8">
                  <h3 className="font-display font-bold text-foreground text-lg mb-1">Enviar mensagem</h3>
                  <p className="text-muted-foreground text-sm mb-6">Preencha o formulário e enviaremos um email com a sua mensagem.</p>
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
                    <input
                      value={contactForm.nome}
                      onChange={(e) => setContactForm(f => ({ ...f, nome: e.target.value }))}
                      placeholder="O seu nome *"
                      required
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground w-full"
                    />
                    <input
                      value={contactForm.contacto}
                      onChange={(e) => setContactForm(f => ({ ...f, contacto: e.target.value }))}
                      placeholder="Telefone ou e-mail *"
                      required
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground w-full"
                    />
                    <textarea
                      value={contactForm.mensagem}
                      onChange={(e) => setContactForm(f => ({ ...f, mensagem: e.target.value }))}
                      placeholder="Descreva brevemente o que precisa..."
                      rows={4}
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground w-full resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                    </button>
                    {submitMessage && (
                      <p className={`text-xs text-center ${submitMessage.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
                        {submitMessage}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground text-center">
                      Sem compromisso. Responderemos em menos de 24 horas.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutUs />
        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
