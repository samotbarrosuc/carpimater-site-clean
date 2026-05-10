import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Droplets, Thermometer, TreePine, Sparkles, Star, CheckCircle2, Ruler, MessageCircle, Calculator } from 'lucide-react'
import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

const WA_DUVIDA = `https://wa.me/351910093635?text=${encodeURIComponent('Olá CarpiMater! Não tenho a certeza entre vinílico e flutuante. Podem ajudar-me a escolher?')}`

const COMPARISON = [
  { label: 'Garantia', vinilico: '25 anos', flutuante: '20 anos' },
  { label: 'Impermeabilidade', vinilico: '100% impermeável', flutuante: 'Resistente a salpicos' },
  { label: 'Melhor para', vinilico: 'Casa toda, WC, cozinha', flutuante: 'Sala, quartos, escritório' },
]

const HOW_IT_WORKS = [
  {
    icon: Ruler,
    step: '01',
    title: 'Escolha o tipo certo',
    desc: 'Identifique se precisa de resistência à água, isolamento acústico ou aspeto madeira realista.',
  },
  {
    icon: Calculator,
    step: '02',
    title: 'Simule o orçamento',
    desc: 'Veja rapidamente o valor por m² com fornecimento, aplicação e rodapés incluídos.',
  },
  {
    icon: MessageCircle,
    step: '03',
    title: 'Avance com confiança',
    desc: 'Envie o pedido por WhatsApp e receba a nossa resposta técnica em 24h.',
  },
]

const REASONS = [
  {
    icon: Shield,
    title: 'Garantia fiável',
    text: 'Até 25 anos no vinílico SPC e 20 anos no flutuante, com instalação profissional.',
  },
  {
    icon: Sparkles,
    title: 'Acabamento premium',
    text: 'Rodapés e juntas alinhados, para um resultado visual limpo e duradouro.',
  },
  {
    icon: CheckCircle2,
    title: 'Processo simplificado',
    text: 'Orçamento rápido, projeto claro e execução coordenada até à entrega.',
  },
]

export default function PavimentosLanding() {
  useEffect(() => {
    document.title = 'Pavimentos — Vinílico SPC ou Flutuante Tradicional? CarpiMater'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Especialistas em pavimento vinílico SPC e pavimento flutuante em Coimbra, Aveiro e Leiria. Compare os dois tipos e escolha o certo para si — catálogos completos com preços e simulador de orçamento. CarpiMater.'
      )
    }
  }, [])

  return (
    <SimulatorProvider>
      <main className="min-h-screen bg-secondary text-white">
        <Navbar />

        <section className="relative overflow-hidden pt-28 sm:pt-32 pb-14">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/60 font-semibold mb-4">
              Pavimentos · Vinílico SPC ou Flutuante Tradicional
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-[-0.03em] text-white max-w-4xl mx-auto">
              Pavimentos que combinam conforto, estilo e instalação profissional.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Compare as opções, veja as vantagens e escolha a solução certa para a sua casa em Coimbra, Aveiro ou Leiria.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/vinilico"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
              >
                Ver Pavimento Vinílico
              </a>
              <a
                href="/flutuante"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Ver Pavimento Flutuante
              </a>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
        </section>

        <section className="py-16 bg-background text-slate-950">
          <div className="container mx-auto px-4">
            <div className="rounded-[2rem] bg-white p-10 shadow-[0_45px_120px_rgba(15,23,42,0.08)]">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">O que oferecemos</p>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">Uma experiência de pavimento com design e garantia</h2>
                  <p className="text-muted-foreground leading-7">
                    Da escolha do material à instalação, oferecemos apoio técnico, orçamentos transparentes e qualidade visível no acabamento final.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {REASONS.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-border bg-background p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-7">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#f7f1e8] text-slate-950">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-[2rem] bg-white p-8 shadow-sm"
              >
                <div className="mb-5 text-xs uppercase tracking-[0.22em] text-primary font-semibold">Pavimentos à prova</div>
                <h2 className="text-3xl font-display font-bold mb-4">Escolha a opção certa para cada divisão</h2>
                <p className="text-muted-foreground leading-7 mb-8">
                  As características de cada pavimento ajudam a definir o melhor uso: resistência à água, conforto térmico e isolamento acústico.
                </p>
                <div className="space-y-3">
                  {COMPARISON.map((item) => (
                    <div key={item.label} className="rounded-3xl border border-border bg-background p-5">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2">{item.label}</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Vinílico</p>
                          <p className="text-sm text-muted-foreground leading-6">{item.vinilico}</p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Flutuante</p>
                          <p className="text-sm text-muted-foreground leading-6">{item.flutuante}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-[2rem] border border-border bg-white p-8 shadow-sm"
              >
                <div className="mb-5 text-xs uppercase tracking-[0.22em] text-primary font-semibold">Como funciona</div>
                <h2 className="text-3xl font-display font-bold mb-4">Três passos para avançar sem dúvidas</h2>
                <div className="space-y-4">
                  {HOW_IT_WORKS.map((item) => (
                    <div key={item.step} className="rounded-3xl border border-border bg-background p-5">
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary font-semibold">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-7">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="pavimentos-orcamento" style={{ scrollMarginTop: '8rem' }} className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto mb-8">
              <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold mb-3">Pronto para começar?</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">Calcule, compare e peça o seu orçamento</h2>
              <p className="text-muted-foreground mt-4 leading-7">
                Comece por escolher o tipo de pavimento, veja o catálogo e fale connosco para agendar a instalação.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <a
                href="/vinilico"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Ver Vinílico SPC
              </a>
              <a
                href="/flutuante"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-6 py-4 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                Ver Flutuante Tradicional
              </a>
            </div>
          </div>
        </section>

        <section className="py-10 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-3">Tem dúvidas?</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">Fale connosco pelo WhatsApp</h2>
            <a
              href={`/whatsapp-redirect.html?url=${encodeURIComponent(WA_DUVIDA)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Enviar mensagem agora
            </a>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
