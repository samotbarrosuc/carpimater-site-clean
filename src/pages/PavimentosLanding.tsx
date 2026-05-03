import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Droplets, Thermometer, TreePine, Sparkles, Star, CheckCircle2, Ruler, MessageCircle, Calculator } from 'lucide-react'
import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

const WA_DUVIDA = `https://wa.me/351910093635?text=${encodeURIComponent('Olá CarpiMater! Não tenho a certeza entre vinílico e flutuante. Podem ajudar-me a escolher?')}`

const COMPARISON = [
  { label: 'Garantia', vinilico: '25 anos', flutuante: '20 anos', winner: 'vinilico' },
  { label: 'Impermeabilidade', vinilico: '100% impermeável', flutuante: 'Resistente a salpicos', winner: 'vinilico' },
  { label: 'Melhor para', vinilico: 'Casa toda, WC, cozinha', flutuante: 'Sala, quartos, escritório', winner: null },
  { label: 'Isolamento acústico', vinilico: 'Bom', flutuante: 'Excelente', winner: 'flutuante' },
  { label: 'Aspeto', vinilico: 'Realista, texturado', flutuante: 'Madeira clássica premium', winner: null },
  { label: 'Manutenção', vinilico: 'Muito fácil', flutuante: 'Fácil', winner: 'vinilico' },
]

const HOW_IT_WORKS = [
  {
    icon: Ruler,
    step: '01',
    title: 'Escolha e meça',
    desc: 'Escolha o tipo de pavimento e insira a área em m² no nosso simulador.',
  },
  {
    icon: Calculator,
    step: '02',
    title: 'Orçamento em segundos',
    desc: 'Receba uma estimativa imediata de custo, com fornecimento e instalação incluídos.',
  },
  {
    icon: MessageCircle,
    step: '03',
    title: 'Avance por WhatsApp',
    desc: 'Envie o orçamento gerado e nós confirmamos os detalhes finais rapidamente.',
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
      <main>
        <Navbar />

        {/* ── HERO HEADER ── */}
        <section className="pt-[73px] bg-secondary">

          {/* Top label + headline */}
          <div className="text-center pt-8 pb-5 px-4">
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/45 font-semibold mb-2">
              CarpiMater · Pavimentos
            </p>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
              Qual pavimento é o certo para si?
            </h1>
            <p className="text-white/55 text-sm max-w-md mx-auto">
              Escolha abaixo, veja o catálogo e calcule o orçamento em segundos.
            </p>
          </div>

          {/* ── SOCIAL PROOF BAR ── */}
          <div className="bg-white/[0.06] border-y border-white/10 py-3 px-4">
            <div className="max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
                  ))}
                </div>
                <span className="text-white text-xs font-semibold">5,0 no Google</span>
              </div>
              <div className="w-px h-4 bg-white/20 hidden sm:block" />
              <span className="text-white/65 text-xs font-medium">+150 obras concluídas</span>
              <div className="w-px h-4 bg-white/20 hidden sm:block" />
              <span className="text-white/65 text-xs font-medium">Resposta em 24h</span>
              <div className="w-px h-4 bg-white/20 hidden sm:block" />
              <span className="text-white/65 text-xs font-medium">Coimbra · Leiria · Aveiro</span>
            </div>
          </div>

          {/* ── TWO OPTION CARDS ── */}
          <div className="flex flex-col md:flex-row h-auto md:h-[580px]">

            {/* ── Vinílico SPC ── */}
            <motion.div
              className="relative flex-1 group overflow-hidden flex flex-col justify-end min-h-[480px] md:min-h-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ backgroundImage: 'url("/images/pavimento-vinilico-sala-coimbra.png")' }}
              />
              {/* Lighter overlay so floor is visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-white/15 z-10" />

              <div className="relative z-10 p-7 sm:p-9">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 text-white px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-bold">
                    <Star className="w-3 h-3 fill-white" />
                    Mais popular
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                  Vinílico SPC
                </h2>
                {/* Decision guide */}
                <p className="text-primary/90 text-sm font-semibold mb-3">
                  Ideal para: WC · cozinha · entrada · casa toda
                </p>

                <ul className="space-y-2 mb-5">
                  {[
                    { icon: Droplets, text: '100% impermeável — sem riscos com água' },
                    { icon: Shield, text: 'Núcleo SPC rígido, antirrisco e antiderrapante' },
                    { icon: Sparkles, text: 'Aspeto realista com textura em relevo · Garantia 25 anos' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-white/85 text-sm leading-snug">{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="/vinilico#simulador"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_6px_20px_rgba(201,136,13,0.4)]"
                  >
                    <Calculator className="w-4 h-4" />
                    Calcular Orçamento
                  </a>
                  <a
                    href="/vinilico"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    Ver catálogo
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ── Flutuante Tradicional ── */}
            <motion.div
              className="relative flex-1 group overflow-hidden flex flex-col justify-end min-h-[480px] md:min-h-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ backgroundImage: 'url("/images/pavimento-flutuante-claro.png")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />

              <div className="relative z-10 p-7 sm:p-9">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full border border-white/35 bg-white/12 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/80 font-bold">
                    Clássico & elegante
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                  Flutuante Tradicional
                </h2>
                <p className="text-white/75 text-sm font-semibold mb-3">
                  Ideal para: salas · quartos · escritórios
                </p>

                <ul className="space-y-2 mb-5">
                  {[
                    { icon: TreePine, text: 'Aspeto de madeira natural — acabamento premium' },
                    { icon: Thermometer, text: 'Isolamento térmico e acústico superior' },
                    { icon: Sparkles, text: 'Clássico e elegante · Garantia 20 anos' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3">
                      <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-white/85 text-sm leading-snug">{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="/flutuante#simulador"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors shadow-[0_6px_20px_rgba(201,136,13,0.4)]"
                  >
                    <Calculator className="w-4 h-4" />
                    Calcular Orçamento
                  </a>
                  <a
                    href="/flutuante"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
                  >
                    Ver catálogo
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dúvidas? bar */}
          <div className="bg-black/30 border-t border-white/10 py-3.5 text-center px-4">
            <p className="text-white/55 text-sm">
              Não tem a certeza qual escolher?{' '}
              <a
                href={`/whatsapp-redirect.html?url=${encodeURIComponent(WA_DUVIDA)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:text-primary/80 underline underline-offset-4 transition-colors"
              >
                Fale connosco por WhatsApp — ajudamo-lo a decidir →
              </a>
            </p>
          </div>
        </section>

        {/* ── COMO FUNCIONA ── */}
        <section className="py-14 bg-background border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Processo simples</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                  Do orçamento à instalação em 3 passos
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {HOW_IT_WORKS.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary/12 text-primary flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-primary/70 tracking-[0.18em] uppercase mb-1">{step.step}</span>
                      <p className="text-base font-bold text-foreground mb-1.5">{step.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </motion.div>
                  )
                })}
              </div>

              {/* CTA to simulator */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                <a
                  href="/vinilico#simulador"
                  className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors shadow-[0_8px_24px_rgba(201,136,13,0.35)]"
                >
                  <Calculator className="w-4 h-4" />
                  Simular orçamento — Vinílico
                </a>
                <a
                  href="/flutuante#simulador"
                  className="inline-flex items-center gap-2 border border-border text-foreground px-7 py-3 rounded-full font-semibold text-sm hover:bg-muted transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  Simular orçamento — Flutuante
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPARAÇÃO RÁPIDA ── */}
        <section className="py-14 bg-muted/30 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2">Comparação</p>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                  Vinílico SPC vs. Flutuante — diferenças principais
                </h2>
              </div>

              <div className="rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
                <div className="grid grid-cols-3 bg-secondary text-secondary-foreground">
                  <div className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/50" />
                  <div className="px-5 py-3.5 text-center border-l border-white/10">
                    <span className="text-sm font-bold text-white">Vinílico SPC</span>
                  </div>
                  <div className="px-5 py-3.5 text-center border-l border-white/10">
                    <span className="text-sm font-bold text-white">Flutuante</span>
                  </div>
                </div>

                {COMPARISON.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-3 ${i % 2 === 0 ? 'bg-background' : 'bg-muted/40'} border-t border-border`}
                  >
                    <div className="px-5 py-3.5 text-sm font-semibold text-foreground/70">{row.label}</div>
                    <div className={`px-5 py-3.5 text-sm text-center border-l border-border flex items-center justify-center gap-1.5 ${row.winner === 'vinilico' ? 'text-primary font-semibold' : 'text-foreground'}`}>
                      {row.winner === 'vinilico' && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                      {row.vinilico}
                    </div>
                    <div className={`px-5 py-3.5 text-sm text-center border-l border-border flex items-center justify-center gap-1.5 ${row.winner === 'flutuante' ? 'text-primary font-semibold' : 'text-foreground/70'}`}>
                      {row.winner === 'flutuante' && <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />}
                      {row.flutuante}
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-3 border-t border-border bg-muted/20">
                  <div className="px-5 py-4 text-xs text-muted-foreground font-medium">Ver e calcular</div>
                  <div className="px-4 py-4 text-center border-l border-border">
                    <a
                      href="/vinilico#simulador"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline underline-offset-4"
                    >
                      Simular Vinílico <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="px-4 py-4 text-center border-l border-border">
                    <a
                      href="/flutuante#simulador"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline underline-offset-4"
                    >
                      Simular Flutuante <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-5">
                Ainda com dúvidas?{' '}
                <a
                  href={WA_DUVIDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline underline-offset-4"
                >
                  Fale connosco — ajudamo-lo a escolher sem compromisso.
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL — SIMULADOR ── */}
        <section className="py-14 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-5">
                <Calculator className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.16em]">Simulador de orçamento</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Saiba o custo em segundos,<br className="hidden sm:block" /> sem sair do sofá.
              </h2>
              <p className="text-white/60 text-base mb-8 max-w-lg mx-auto">
                Insira a área em m², escolha o modelo e receba uma estimativa imediata — com fornecimento e instalação incluídos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/vinilico#simulador"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-full font-bold text-base hover:bg-primary/90 transition-colors shadow-[0_8px_30px_rgba(201,136,13,0.4)]"
                >
                  <Calculator className="w-5 h-5" />
                  Calcular — Vinílico SPC
                </a>
                <a
                  href="/flutuante#simulador"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-white/10 transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                  Calcular — Flutuante
                </a>
              </div>
              <p className="text-white/35 text-xs mt-5">Sem compromisso · Resposta em 24h · Instalação profissional</p>
            </div>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
