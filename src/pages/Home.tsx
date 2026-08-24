import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import TrustBadges from '@/components/TrustBadges'
import MaterialTicker from '@/components/MaterialTicker'
import Gallery from '@/components/Gallery'
import { CompareSlider, pairs as beforeAfterPairs } from '@/components/cozinha/sections/BeforeAfter'
import { FAQS } from '@/content/faq'
import { WHATSAPP_NUMBER, EMAIL } from '@/content/site'
import { CONTACT_MOBILE_ERROR, sanitizePortugueseMobile, validateContactDetails } from '@/lib/contact-validation'
import { ShoppingBag, Store, ChevronDown, ChevronRight, Hammer, Layers3, Mail, MessageCircle, PanelsTopLeft, Phone } from 'lucide-react'

const WA_HOME = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá CarpiMater! Gostaria de saber mais sobre os vossos serviços.')}`

const STEPS = [
  { num: '01', title: 'Pedido', desc: 'Indique o trabalho, as medidas e a localização.' },
  { num: '02', title: 'Proposta', desc: 'Confirmamos os materiais, o preço e o prazo previsto.' },
  { num: '03', title: 'Execução', desc: 'Preparamos o material e fazemos a montagem em obra.' },
]

const FEATURED_MATERIALS = [
  {
    name: 'Flutuante híbrido',
    label: 'Resistência à água 100 h+',
    description: 'Núcleo HDF com carbono e base acústica integrada.',
    image: '/images/produtos-flutuante/pingo.webp',
    href: '/loja?categoria=flutuante#catalogo-loja',
    isNew: true,
  },
  {
    name: 'Vinílico SPC',
    label: 'Pavimento impermeável',
    description: 'Resistente, confortável e fácil de limpar.',
    image: '/images/produtos-vinil/carvalho_mel_IMG_2897_optimized_2000-scaled-e1729769492932.jpeg',
    href: '/loja?categoria=vinilico#catalogo-loja',
    isNew: false,
  },
  {
    name: 'Rodapé PVC',
    label: 'Acabamento e proteção',
    description: 'Resistente à humidade e simples de manter.',
    image: '/images/produtos-rodape/rodape pvc branco liso.jpg',
    href: '/loja?categoria=rodape#catalogo-loja',
    isNew: false,
  },
]

export default function Home() {
  const [contactForm, setContactForm] = useState({ nome: '', contacto: '', mensagem: '' })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitMessage(null)
    setShowWhatsAppFallback(false)

    const validationError = validateContactDetails(contactForm.nome, contactForm.contacto)
    if (validationError) {
      setSubmitMessage(validationError)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...contactForm, nome: contactForm.nome.trim() }),
      })

      await response.json()

      if (response.ok) {
        setSubmitMessage('Mensagem enviada com sucesso! Responderemos em breve.')
        setContactForm({ nome: '', contacto: '', mensagem: '' })
      } else {
        setSubmitMessage('Não foi possível enviar a mensagem. Contacte-nos através do WhatsApp.')
        setShowWhatsAppFallback(true)
      }
    } catch (error) {
      setSubmitMessage('Não foi possível enviar a mensagem. Contacte-nos através do WhatsApp.')
      setShowWhatsAppFallback(true)
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
        <div className="pt-[76px]">
          <MaterialTicker />
        </div>

        {/* ── HERO ── */}
        <section id="home-hero" className="relative overflow-hidden bg-[#f8f5ef] pt-12 text-slate-950 sm:pt-20">
          <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
              <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-5 max-w-xl font-display text-[3.25rem] font-bold leading-[0.94] tracking-[-0.045em] text-[#19242e] sm:text-6xl lg:text-7xl">
                  Fornecimento e montagem de carpintarias
                </h1>
                <p className="mb-7 max-w-lg text-base leading-7 text-[#40505b] sm:text-lg">
                  Venda online de materiais e serviços de carpintaria, fornecimento e montagem em obra.
                </p>

                <div className="mb-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/loja"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f05b13] px-6 text-sm font-bold text-white shadow-[0_10px_26px_rgba(240,91,19,0.18)] transition hover:bg-[#d94d0d]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Ver loja
                  </a>
                  <a
                    href="/#home-contactos"
                    onClick={(e) => {
                      e.preventDefault()
                      const target = document.getElementById('home-contactos')
                      if (target) scrollToContactSection(target)
                    }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#c9c0b4] bg-white/60 px-6 text-sm font-bold text-[#19242e] transition hover:border-[#19242e] hover:bg-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Pedir orçamento
                  </a>
                </div>
                <nav aria-label="Áreas principais" className="grid max-w-xl grid-cols-3 overflow-hidden rounded-[1.35rem] border border-[#2b3b47] bg-[#19242e] shadow-[0_14px_34px_rgba(25,36,46,0.14)]">
                  <a href="/cozinha" className="group relative isolate flex min-h-[88px] flex-col justify-between overflow-hidden border-r border-white/10 p-3 text-white transition hover:bg-white/[0.07] sm:p-4">
                    <span className="flex items-center gap-2 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-white/55"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f05b13] text-white"><PanelsTopLeft className="h-3.5 w-3.5" /></span>Por medida</span>
                    <strong className="max-w-[9rem] font-display text-sm leading-4 text-white sm:text-base sm:leading-5">Cozinhas e roupeiros</strong>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#f05b13] transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                  <a href="/loja?categoria=vinilico" className="group relative isolate flex min-h-[88px] flex-col justify-between overflow-hidden border-r border-white/10 p-3 text-white transition hover:bg-white/[0.07] sm:p-4">
                    <span className="flex items-center gap-2 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-white/55"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f05b13] text-white"><Layers3 className="h-3.5 w-3.5" /></span>Loja online</span>
                    <strong className="font-display text-sm leading-4 text-white sm:text-base sm:leading-5">Pavimentos</strong>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#f05b13] transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                  <a href="/construcao" className="group relative isolate flex min-h-[88px] flex-col justify-between overflow-hidden p-3 text-white transition hover:bg-white/[0.07] sm:p-4">
                    <span className="flex items-center gap-2 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-white/55"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f05b13] text-white"><Hammer className="h-3.5 w-3.5" /></span>Em obra</span>
                    <strong className="max-w-[9rem] font-display text-sm leading-4 text-white sm:text-base sm:leading-5">Carpintaria e montagem</strong>
                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#f05b13] transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                </nav>
              </motion.div>
              </div>
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#d8d0c4] bg-[#19242e] p-2 shadow-[0_24px_70px_rgba(25,36,46,0.16)]">
                <CompareSlider before={beforeAfterPairs[0].before} after={beforeAfterPairs[0].after} aspectRatio="4/3" />
              </div>
            </div>
          </div>
        </section>

        <TrustBadges />

        <section className="bg-[#f8f5ef] px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="section-kicker">Serviços e loja</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-5xl">Escolha o que <em className="font-serif font-normal italic text-[#f05b13]">precisa.</em></h2>
              <p className="mt-4 max-w-xl leading-7 text-[#40505b]">Pode pedir um trabalho de carpintaria, comprar materiais ou solicitar a respetiva aplicação.</p>
            </div>
            <div className="mt-9 grid gap-4 lg:grid-cols-3">
              <a href="/#home-contactos" className="group clean-card flex min-h-[250px] flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_16px_38px_rgba(25,36,46,0.08)] sm:p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f05b13] text-xs font-bold text-white">01</span>
                <h3 className="mt-8 font-display text-xl font-bold text-[#19242e]">Carpintaria por medida</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#40505b]">Cozinhas, roupeiros, portas, escadas e outros trabalhos adaptados ao espaço.</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#f05b13]">Pedir orçamento <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </a>
              <a href="/loja" className="group clean-card flex min-h-[250px] flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_16px_38px_rgba(25,36,46,0.08)] sm:p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#19242e] text-xs font-bold text-white">02</span>
                <h3 className="mt-8 font-display text-xl font-bold text-[#19242e]">Escolher os materiais</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#40505b]">Pavimentos vinílicos, flutuantes híbridos e rodapés, vendidos por caixas e barras.</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#f05b13]">Visitar loja <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </a>
              <a href="/loja" className="group clean-card flex min-h-[250px] flex-col rounded-2xl p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_16px_38px_rgba(25,36,46,0.08)] sm:p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8ded1] text-xs font-bold text-[#19242e]">03</span>
                <h3 className="mt-8 font-display text-xl font-bold text-[#19242e]">Solicitar aplicação</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-[#40505b]">Escolha o material, adicione-o ao carrinho e peça um orçamento previsto para aplicação antes de confirmar a encomenda.</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#f05b13]">Pedir aplicação <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
              </a>
            </div>
          </div>
        </section>

        {/* ── 3 SERVICE CARDS ── */}
        <section id="home-servicos" className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-9 max-w-6xl">
              <p className="section-kicker mb-3">Serviços</p>
              <h2 className="font-display text-3xl font-bold tracking-[-0.025em] text-foreground sm:text-4xl">
                O que fazemos
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Fazemos carpintaria por medida e fornecemos e instalamos pavimentos e rodapés.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">

              {/* Cozinhas */}
              <a href="/cozinha" className="group clean-card flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_16px_38px_rgba(25,36,46,0.08)]">
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                  <img
                    src="/images/cozinha-open-space.png"
                    alt="Cozinha por medida projectada e montada pela CarpiMater"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="section-kicker">Carpintaria por medida</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">Cozinhas por medida</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">Levantamento de medidas, proposta, fabrico e montagem.</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                    Ver cozinhas <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </a>

              {/* Pavimentos — merged Vinílico + Flutuante */}
              <a href="/loja" className="group clean-card flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_16px_38px_rgba(25,36,46,0.08)]">
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                  <img
                    src="/images/pavimento-vinilico-sala-coimbra.png"
                    alt="Pavimentos vinílicos e flutuantes híbridos instalados pela CarpiMater em Coimbra"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="section-kicker">Vinílico e flutuante híbrido</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">Pavimentos</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">Compra online, entrega e serviço de aplicação opcional.</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">Ver pavimentos <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </a>

              {/* Empreiteiros */}
              <a href="/construcao" className="group clean-card flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-0.5 hover:border-[#cfc5b8] hover:shadow-[0_16px_38px_rgba(25,36,46,0.08)]">
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                  <img
                    src="/images/card-obras.png"
                    alt="Carpintaria para obras e interiores — CarpiMater"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="section-kicker">Construção e remodelação</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-foreground">Carpintaria e obra</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">Roupeiros, portas, cozinhas e outros trabalhos para particulares e empresas.</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">Ver soluções <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#eee7dc] px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <p className="section-kicker">Loja de materiais</p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-5xl">Pavimentos e <em className="font-serif font-normal italic text-[#f05b13]">rodapés.</em></h2>
                <p className="mt-4 leading-7 text-[#40505b]">Consulte os modelos, os preços e as características de cada material.</p>
                <p className="mt-1 leading-7 text-[#40505b] sm:mt-3">Pode comprar apenas o material ou solicitar aplicação.</p>
              </div>
              <a href="/loja" className="inline-flex items-center gap-2 font-bold text-[#19242e] transition hover:text-[#f05b13] sm:rounded-xl sm:bg-[#f05b13] sm:px-5 sm:py-3 sm:text-white sm:shadow-[0_8px_20px_rgba(240,91,19,0.22)] sm:hover:bg-[#d94d0d] sm:hover:text-white">Ver loja <ChevronRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {FEATURED_MATERIALS.map((material) => (
                <a href={material.href} key={material.name} className="group overflow-hidden rounded-2xl border border-[#d8d0c4] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(25,36,46,0.08)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                    <img src={material.image} alt={material.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                    {material.isNew && <span className="absolute left-3 top-3 rounded-full border border-[#e7b83e] bg-[#ffdd57] px-2.5 py-1 text-[0.58rem] font-extrabold uppercase tracking-[0.13em] text-[#b42318] shadow-md">Novidade</span>}
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#f05b13]">{material.label}</p>
                    <h3 className="mt-1.5 font-display text-base font-bold leading-tight text-[#19242e]">{material.name}</h3>
                    <p className="mt-2 hidden text-xs leading-5 text-[#40505b] sm:block">{material.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#19242e] transition group-hover:text-[#f05b13]">Ver materiais <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                  </div>
                </a>
              ))}
              <a href="/loja" aria-label="Ver mais materiais na loja" className="group relative isolate flex min-h-full flex-col overflow-hidden rounded-2xl border border-[#e4c8a3] bg-[linear-gradient(145deg,#fffdf9_0%,#faecd8_100%)] p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#f05b13]/45 hover:shadow-[0_14px_32px_rgba(115,71,35,0.12)] sm:hidden">
                <span aria-hidden="true" className="absolute -right-8 -top-8 -z-10 h-28 w-28 rounded-full bg-[#f3c98b]/25 transition-transform duration-500 group-hover:scale-125" />
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ead8c1] bg-white text-[#f05b13] shadow-[0_5px_16px_rgba(115,71,35,0.09)]"><Store className="h-5 w-5" /></span>
                  <span className="rounded-full border border-[#e7ccb0] bg-white/75 px-2.5 py-1 text-[0.52rem] font-bold uppercase tracking-[0.12em] text-[#9a5a2b]">Loja online</span>
                </div>
                <div className="mt-auto pt-8">
                  <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#b46b34]">Mais acabamentos</p>
                  <h3 className="mt-1.5 font-display text-lg font-bold leading-tight text-[#3d2b1f]">Ver + na loja</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#f05b13] px-3 py-2 text-xs font-bold text-white shadow-[0_5px_12px_rgba(240,91,19,0.2)] transition-colors group-hover:bg-[#d94e0d]">Ver catálogo <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section id="home-processo" className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(240,91,19,0.12),transparent_55%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">Processo</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  Como trabalhamos
                </h2>
                <p className="text-white/65 max-w-xl mx-auto">
                  Confirmamos o trabalho, os materiais, o preço e o prazo antes de avançar.
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

            </div>
          </div>
        </section>

        {/* ── ZONA DE COBERTURA ── */}
        <section className="border-y border-border bg-muted/40 py-14 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl border-l-2 border-primary pl-5 sm:pl-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Área de serviço</p>
                <h2 className="font-display text-2xl font-bold tracking-[-0.025em] text-foreground sm:text-3xl">
                  Entrega e montagem na Região Centro
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  Trabalhamos sobretudo em Coimbra, Aveiro, Leiria, Marinha Grande e zonas próximas. Para outras zonas, contacte-nos para confirmarmos a disponibilidade.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <a href="/loja" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#19242e] px-5 text-sm font-bold text-white transition hover:bg-[#263744]">
                  Ver materiais <ChevronRight className="h-4 w-4" />
                </a>
                <a href="/#home-contactos" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#c9c0b4] bg-white px-5 text-sm font-bold text-[#19242e] transition hover:border-[#19242e]">
                  Pedir orçamento <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Gallery />

        {/* ── CONTACTOS ── */}
        <section
          id="home-contactos"
          className="border-t border-border bg-[#f8f5ef] py-16 sm:py-20"
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
                    Pode contactar-nos por WhatsApp, telefone, e-mail ou através do formulário.
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
                        <p className="text-muted-foreground text-xs">Mensagem direta</p>
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
                        <p className="text-muted-foreground text-xs">Pedidos e informações</p>
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
                        <p className="text-muted-foreground text-xs">Contacto telefónico</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                <div id="home-contacto" style={{ scrollMarginTop: '4rem' }} className="clean-card rounded-2xl p-6 sm:p-8">
                  <h3 className="font-display font-bold text-foreground text-lg mb-1">Enviar mensagem</h3>
                  <p className="text-muted-foreground text-sm mb-6">Preencha o formulário para nos enviar o seu pedido.</p>
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-3">
                    <input
                      name="nome"
                      autoComplete="name"
                      value={contactForm.nome}
                      onChange={(e) => setContactForm(f => ({ ...f, nome: e.target.value }))}
                      placeholder="O seu nome *"
                      required
                      minLength={2}
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground w-full"
                    />
                    <input
                      name="telemovel"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={contactForm.contacto}
                      onChange={(e) => setContactForm(f => ({ ...f, contacto: sanitizePortugueseMobile(e.target.value) }))}
                      onInvalid={(event) => event.currentTarget.setCustomValidity(CONTACT_MOBILE_ERROR)}
                      onInput={(event) => event.currentTarget.setCustomValidity('')}
                      placeholder="Telemóvel *"
                      required
                      minLength={9}
                      maxLength={9}
                      pattern="9[0-9]{8}"
                      title={CONTACT_MOBILE_ERROR}
                      className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder:text-muted-foreground w-full"
                    />
                    <p className="-mt-1 px-1 text-xs text-muted-foreground"></p>
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
                      className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                    </button>
                    {submitMessage && (
                      <p className={`text-xs text-center ${submitMessage.includes('sucesso') ? 'text-green-600' : 'text-red-600'}`}>
                        {submitMessage}
                      </p>
                    )}
                    {showWhatsAppFallback && (
                      <a href={WA_HOME} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#25D366]/35 bg-[#25D366]/10 px-4 text-sm font-bold text-[#147a38] transition hover:bg-[#25D366]/15">
                        <MessageCircle className="h-4 w-4" />Contactar via WhatsApp
                      </a>
                    )}
                    <p className="text-xs text-muted-foreground text-center">
                      Entraremos em contacto assim que possível.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="home-faq" className="bg-white px-4 py-16 sm:py-24">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div><p className="section-kicker">Informação útil</p><h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-[#19242e] sm:text-5xl">Perguntas <em className="font-serif font-normal italic text-[#f05b13]">frequentes.</em></h2><p className="mt-4 leading-7 text-[#40505b]">Se não encontrar a informação de que precisa, contacte-nos.</p></div>
            <div className="divide-y divide-[#d8ccbc] border-y border-[#d8ccbc]">{FAQS.slice(0, 4).map((faq, index) => <div key={faq.question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-[#19242e]"><span>{faq.question}</span><ChevronDown className={`h-5 w-5 shrink-0 text-[#f05b13] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="pb-5 text-sm leading-6 text-[#40505b]">{faq.answer}</p>}</div>)}</div>
          </div>
        </section>
        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
