import { Check, ChevronRight, MessageCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getWhatsAppUrl } from '@/content/site'
import serviceData from '@/content/local-services.json'

type LocalService = (typeof serviceData)[number]

function LocalServicePage({ service }: { service: LocalService }) {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#19242e]">
      <Navbar />

      <section className="relative overflow-hidden bg-[#19242e] px-4 pb-16 pt-32 text-white sm:pb-24 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(240,91,19,0.18),transparent_36%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">{service.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">{service.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={getWhatsAppUrl(service.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f05b13] px-6 text-sm font-bold text-white transition hover:bg-[#d94d0d]">
                <MessageCircle className="h-4 w-4" /> Pedir proposta
              </a>
              <a href="/contactos" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 text-sm font-bold text-white transition hover:bg-white/10">
                Enviar pedido
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/5 p-2 shadow-[0_28px_70px_rgba(0,0,0,0.22)]">
            <img src={service.image} alt={service.imageAlt} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full rounded-[1.35rem] object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-[#ded8cf] bg-white px-4 py-10">
        <ul className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
          {service.highlights.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-xl border border-[#e4ded5] bg-[#fbfaf7] p-4 text-sm font-semibold">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Check className="h-4 w-4" /></span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2">
          {service.sections.map((section) => (
            <article key={section.title} className="rounded-2xl border border-[#ded8cf] bg-white p-6 shadow-[0_10px_30px_rgba(25,36,46,0.04)] sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-[-0.025em]">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#40505b]">{section.text}</p>
              <ul className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-[#40505b]"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#ded8cf] bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="section-kicker">Processo</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Como funciona</h2>
          <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-[#ded8cf] bg-[#f8f5ef] p-5">
                <span className="text-xs font-extrabold tracking-[0.14em] text-primary">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#40505b]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="section-kicker">Informação útil</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Perguntas frequentes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="rounded-2xl border border-[#ded8cf] bg-white p-6">
                <h3 className="font-display text-lg font-bold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-[#40505b]">{faq.answer}</p>
              </article>
            ))}
          </div>
          <nav aria-label="Serviços relacionados" className="mt-12 rounded-2xl border border-[#ded8cf] bg-[#19242e] p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-bold">Serviços relacionados</h2>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {service.relatedLinks.map((link) => (
                <a key={link.href} href={link.href} className="inline-flex items-center gap-1.5 text-sm font-bold text-white/80 transition hover:text-[#f08a45]">
                  {link.label}<ChevronRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <Footer />
    </main>
  )
}

const bySlug = (slug: string) => serviceData.find((service) => service.slug === slug) as LocalService

export function MontagemCozinhasPage() {
  return <LocalServicePage service={bySlug('montagem-cozinhas-coimbra')} />
}

export function RoupeirosPage() {
  return <LocalServicePage service={bySlug('roupeiros-por-medida-coimbra')} />
}

export function InstalacaoRodapesPage() {
  return <LocalServicePage service={bySlug('instalacao-rodapes-coimbra')} />
}
