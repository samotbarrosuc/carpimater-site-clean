import { SimulatorProvider } from '@/context/SimulatorContext'
import Navbar from '@/components/Navbar'
import AboutUs from '@/components/AboutUs'
import Footer from '@/components/Footer'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { MapPin } from 'lucide-react'

const WA_NUMBER = '351910093635'
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Olá CarpiMater! Gostava de saber mais sobre os vossos serviços.')}`

export default function SobreNosPage() {
  return (
    <SimulatorProvider>
      <main>
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative min-h-[72vh] flex items-center overflow-hidden bg-[#1a1208]">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1208]/95 via-[#1a1208]/85 to-[#2d1f0a]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(201,136,13,0.18),transparent_60%)]" />

          <div className="container mx-auto px-4 relative py-28 sm:py-36">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/80 font-medium mb-8">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Coimbra, Aveiro &amp; Leiria</span>
              </div>

              <h1 className="text-[2rem] sm:text-[2.8rem] font-display font-bold text-white leading-[1.08] mb-6">
                Mais de 40 anos a<br />
                <span className="text-primary">construir espaços</span><br />
                em Portugal.
              </h1>

              <p className="text-white/65 text-base max-w-lg leading-relaxed mb-10">
                Começámos na Bairrada. Crescemos com o trabalho. Hoje servimos três distritos com a mesma dedicação e os mesmos princípios de sempre.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-10 gap-y-5">
                {[
                  { val: '40+', label: 'Anos de actividade' },
                  { val: '400+', label: 'Obras concluídas' },
                  { val: '3', label: 'Distritos servidos' },
                  { val: '5,0', label: 'no Google' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl sm:text-3xl font-display font-bold text-primary">{s.val}</p>
                    <p className="text-white/55 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EDITORIAL IMAGE ── */}
        <div className="relative h-[260px] sm:h-[380px] overflow-hidden">
          <img
            src="/images/cozinha-renovacao.jpg"
            alt="Obra realizada pela CarpiMater"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>

        {/* ── STORY ── */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">A nossa história</p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mb-8 leading-snug">
                De uma oficina na Bairrada<br className="hidden sm:block" /> a três distritos.
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
                <p>
                  A CarpiMater nasceu de uma tradição artesanal na região da Bairrada. O que começou como um serviço local de pavimentos e carpintaria foi crescendo de forma sustentada — não por acidente, mas porque o trabalho bem feito fala por si mesmo.
                </p>
                <p>
                  Com o tempo, expandimos a nossa cobertura para Coimbra, Aveiro e Leiria. Cada novo distrito foi uma consequência natural de clientes que recomendaram o nosso trabalho a vizinhos, amigos e empreiteiros. Não houve campanhas de marketing que abrissem essas portas — foi a qualidade entregue que o fez.
                </p>
                <p>
                  Hoje somos um parceiro completo para quem quer pavimentos, cozinhas por medida ou carpintaria de obra. Fornecimento, instalação e acompanhamento — tudo gerido por nós, de início ao fim.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 PILARES (reutiliza AboutUs) ── */}
        <AboutUs />

        {/* ── CTA ── */}
        <section className="py-16 sm:py-24 bg-background border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4">Fale connosco</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Pronto para transformar o seu espaço?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Orçamento gratuito e resposta em 24 horas. Sem compromisso.
            </p>
            <a
              href={`/whatsapp-redirect.html?url=${encodeURIComponent(WA_LINK)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors shadow-[0_8px_30px_rgba(201,136,13,0.3)]"
            >
              Pedir Orçamento Gratuito
            </a>
          </div>
        </section>

        <Footer />
        <FloatingWhatsApp />
      </main>
    </SimulatorProvider>
  )
}
